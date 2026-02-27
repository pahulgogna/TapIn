import { useRecoilValueLoadable } from "recoil";
import { userAtom } from "../store/atom/atom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type Team = {
    _id: string;
    name: string;
    email: string[];
    admin: string;
};

const YourTeam = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const user = useRecoilValueLoadable(userAtom);

    const navigate = useNavigate();

    useEffect(() => {

        if (user.state === 'loading') {
            return;
        }
        
        const fetchTeams = async () => {
            try {
                const response = await axios.post(`http://localhost:3002/group/getGroup/${user.contents.id}`);
                console.log(response.data);
                setTeams(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTeams();   

    }, [user.state, user.contents.id]);

    

    if (user.state === 'loading') {
        return <div className="flex items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url(images/background.png)' }}>Loading...</div>
    }


    


    return (
        <div 
            className="h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center"
            style={{ backgroundImage: 'url(images/background.png)', backgroundSize: 'cover' }}
        >
            <div className="w-full max-w-7xl mx-auto p-8  bg-opacity-60 rounded-lg border-2 border-silver">
                <h1 className="text-5xl font-bold mb-6 text-center text-[#18cb96]">Your Teams</h1>
                <div className="flex flex-col space-y-4">
                    {teams.map(( team ) => (
                        <div
                            key={team._id} 
                            className="p-4 cursor-pointer bg-white bg-opacity-20 shadow-md rounded-md backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:bg-opacity-30"
                            style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(10px)',
                                transition: 'transform 0.3s, background 0.3s'
                            }}
                            onClick={() => {
                                navigate(`/team/${team._id}`);
                                console.log('Team Clicked:', team._id);
                            }
                            }
                        >
                            <p className="text-lg font-medium text-white">
                                <div className="flex justify-between">
                                    <div>{team.name}</div>
                                    <div>{team.email.length} Members</div>

                                </div>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YourTeam;
