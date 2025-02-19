import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { SHA256 } from "crypto-js";
import { registerUser, rawTranscript } from "@pahul100/summarizer-common";

dotenv.config();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

const prisma = new PrismaClient();
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

interface ReqUser extends express.Request {
    user?: {
        id: string
    }
}

app.use((req, res, next) => {

    console.log(`Request received: ${req.method} ${req.url}`);

    next();
})


app.post("/api/v1/user/register", async (req, res) => {
    const user = registerUser.safeParse(req.body);

    if(!user.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    try{
        let newUser = await prisma.user.create({
            data: {
                email: user.data.email,
                password: SHA256(`${user.data.password}${process.env.SALT}`).toString(),
                name: user.data.name
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        });

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

        res.cookie("token", token, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    
        res.json({
            newUser
        });
    }
    catch(err) {
        console.error(err);
        res.status(400).json({ message: "User already exists." });
    }

});

app.post("/api/v1/user/login", async (req, res) => {
    const parsed = registerUser.safeParse(req.body);
    
    if(!parsed.success) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

    const { email, password } = parsed.data;

    let userInDb = await prisma.user.findFirst({
        where: {
            email: email,
            password: SHA256(`${password}${process.env.SALT}`).toString()
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    if(!userInDb) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign({ id: userInDb.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(200).json(userInDb);
    return;
});

app.use((req : ReqUser, res, next) => {
    let token = req.cookies["token"];

    console.log(token["token"])

    if(!token) {
        res.status(401).send(`${process.env.FE_URL}/login`);
        return;
    }


    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        console.log(err + 
            "\n\n --------------------- \n\n" + 
            JSON.stringify(decoded)
        )
        if(err) {
            res.status(401).send(`${process.env.FE_URL}/login`);
            return;
        }
        else{
            req.user = decoded;
            next();
        }
    })
    // res.send("asdf")
    // return 
})

app.get("/api/v1/user/logout", (req, res) => {
    res.cookie("token", "", { maxAge: 0 });
    
    res.status(200).send(`${process.env.FE_URL}/login`);
});


app.get("/api/v1/user/me", async (req: ReqUser, res) => {
    let user = await prisma.user.findUnique({
        where: {
            id: req.user?.id
        },
        select:{
            email: true,
            name: true,
            id: true
        }
    });

    if(!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.json(user);
});

// app.post("/api/v1/team/create", async (req: ReqUser, res) => {
//     const { name } = req.body;

//     if(req.user === undefined) {
//         res.status(401).json({ message: "Unauthorized" });
//         return;
//     }

//     let team = await prisma.team.create({
//         data: {
//             name: name,
//             adminId: req.user.id
//         }
//     });

//     res.json(team);
// });

// app.post("/api/v1/team/add", async (req: ReqUser, res) => {
//     const { email, teamId } = req.body;

//     if(req.user === undefined) {
//         res.status(401).json({ message: "Unauthorized" });
//         return;
//     }

//     let user = await prisma.user.findFirst({
//         where: {
//             email: email
//         }
//     });

//     if(!user) {
//         res.status(404).json({ message: "User not found" });
//         return;
//     }

//     let team = await prisma.team.findFirst({
//         where: {
//             id: teamId
//         }
//     });

//     if(!team) {
//         res.status(404).json({ message: "Team not found" });
//         return;
//     }

//     let member = await prisma.teamMember.create({
//         data: {
//             teamId: teamId,
//             userId: user.id
//         }
//     });

//     res.json(member);
// });


app.get("/api/v1/notes/all", async (req: ReqUser, res) => {

    let notes = await prisma.note.findMany({
        where: {
            userId: req.user?.id
        }
    });

    res.json(notes);

});

app.get("/api/v1/notes/:id", async (req: ReqUser, res) => {
    let noteId = req.params.id;

    let canAccess = false;

    let note = await prisma.note.findFirst({
        where: {
            id: noteId
        },
        select: {
            content: true,
            id: true,
            userId: true,
            title: true
        }
    });

    if(!note) {
        res.status(404).json({ message: "Note not found" });
        return;
    }

    // note.team?.members.forEach((member) => {
    //     if(member.id === req.user?.id) {
    //         canAccess = true;
    //         return;
    //     }
    // })

    if(note.userId !== req.user?.id && !canAccess) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    res.json(note);
});

app.delete("/api/v1/notes/:id", async (req: ReqUser, res) => {
    let noteId = req.params.id;

    let note = await prisma.note.findFirst({
        where: {
            id: noteId
        }
    });

    if(!note) {
        res.status(404).json({ message: "Note not found" });
        return;
    }

    if(note.userId !== req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    await prisma.note.delete({
        where: {
            id: noteId
        }
    });

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});