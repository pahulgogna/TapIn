import axios from 'axios';
import { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../store/atom/atom';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');

    const navigate = useNavigate();

    const user = useRecoilValueLoadable(userAtom);

    if(user.state === 'loading') {
        return <div className="flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(images/background.png)' }}>Loading...</div>
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (teamName.trim()) {
            console.log('Team Created:', teamName);

            try {
                const response = await axios.post(`http://localhost:3002/group/createGroup/${user.contents.id}`, {
                    name: teamName,
                });
                console.log(response.data);
                navigate(`/team/${response.data._id}`);

            }
            catch (error) {
                console.error(error);
            }



            setTeamName('');
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url(images/background.png)' }}
        >
            <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded-md shadow-md w-full max-w-md text-white">
                <input
                    type="text"
                    placeholder="Enter Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full border p-2 rounded-md text-white"
                />
                <button type="submit" className=" cursor-pointer w-full bg-[#18cb96] text-white p-2 rounded-md">
                    Create Team
                </button>
            </form>
        </div>
    );
};

export default CreateTeam;
