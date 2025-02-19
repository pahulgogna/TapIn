import { useRecoilValueLoadable } from "recoil"
import { notesAtom, userAtom } from "../store/atom/atom"
import { Avatar } from "./basics/Avatar"
import { Link } from "react-router-dom"
// import Button from "./basics/Button"
// import axios from "axios"

function Appbar() {

    const user = useRecoilValueLoadable(userAtom)

    const notes = useRecoilValueLoadable(notesAtom)

    if(user.state === "loading" || notes.state === "loading"){
        return <div>Loading...</div>
    }
    else{

        console.log(notes.contents)

        return (
            <div className="py-4 px-2 flex justify-between bg-slate-200">

                <div className="flex flex-col justify-center">
                    hi
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex justify-end gap-5">
                        {/* <Button onClick={ async () => {
                            console.log("helloo")
                            let data = await axios.get(`${import.meta.env.VITE_BEEP}/user/logout`, {
                                withCredentials: true
                            })

                            console.log(data)
                            window.location.reload()
                        }
                        }>
                            Logout
                        </Button> */}

                        {notes.contents.length ?
                            <div className="flex gap-5 justify-center">
                                <Link to={"/notes"} className="flex flex-col justify-center text-lg">
                                    Notes: {notes.contents.length}
                                </Link>
                            </div>
                            : null
                        }
                        <div className="flex gap-5 justify-center">
                            <Avatar>
                                {user.contents?.name}
                            </Avatar>
                            {
                                user.contents.email
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Appbar