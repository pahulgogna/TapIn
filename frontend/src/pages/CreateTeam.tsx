import { useState } from 'react';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (teamName.trim()) {
            console.log('Team Created:', teamName);
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
                <button type="submit" className="w-full bg-[#18cb96] text-white p-2 rounded-md">
                    Create Team
                </button>
            </form>
        </div>
    );
};

export default CreateTeam;
