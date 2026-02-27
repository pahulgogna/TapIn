import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../components/basics/TextInput";
import Button from "../components/basics/Button";
import { Team as t} from "./YourTeam";

function Team() {
    const params = useParams();
    const id = params.id;
    const [team, setTeam] = useState<t>({ _id: '', name: '', email: [], admin: '' });
    const [email, setEmail] = useState('');

    async function getTeam() {
        try {
            const response = await axios.get(`http://localhost:3002/group/getTeam/${id}`);
            console.log(response.data);
            setTeam(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addUser() {
        try {
            await axios.post(`http://localhost:3002/group/addUser`, {
                id,
                email
            });
            alert("User added successfully!");
            getTeam(); // Refresh team data after adding a user
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    async function deleteUser() {
        try {
            await axios.delete(`http://localhost:3002/group/removeUser/${id}`);
            alert("User deleted successfully!");
            getTeam();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    useEffect(() => {
        getTeam();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" 
            style={{ backgroundImage: 'url(/images/background.png)' }}>

            <div className="bg-white w-9/11 p-6 rounded-lg shadow-lg">
                <h1 className="text-xl font-bold mb-4">{team.name}</h1>
                <pre className="mb-4"></pre>
                <TextInput setValue={setEmail} value={email} lable="email"/>
                <div className="flex gap-4">
                    <Button onClick={addUser} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add User
                    </Button>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {team.email.map((email, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                            <span>{email}</span>
                            <Button onClick={deleteUser} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600">
                                Delete
                            </Button>
                        </div>
                    ))}
            </div>
        </div>
    </div>
    );
}

export default Team;
