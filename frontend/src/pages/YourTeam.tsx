import React from 'react';

const YourTeam = () => {
    const teams = ['Team Alpha', 'Team Beta', 'Team Gamma']; // Example team names

    return (
        <div 
            className="h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center"
            style={{ backgroundImage: 'url(images/background.png)', backgroundSize: 'cover' }}
        >
            <div className="w-full max-w-7xl mx-auto p-8  bg-opacity-60 rounded-lg border-2 border-silver">
                <h1 className="text-5xl font-bold mb-6 text-center text-[#18cb96]">Your Teams</h1>
                <div className="flex flex-col space-y-4">
                    {teams.map((team, index) => (
                        <div 
                            key={index} 
                            className="p-4 bg-white bg-opacity-20 shadow-md rounded-md backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:bg-opacity-30"
                            style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(10px)',
                                transition: 'transform 0.3s, background 0.3s'
                            }}
                        >
                            <p className="text-lg font-medium text-white">{team}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YourTeam;
