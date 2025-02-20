  import Recorder from "../components/Recorder";

  function Dashboard() {
    return (
      <div 
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('images/background.png')" }}
      >
        <div 
          className="backdrop-blur-lg bg-white/30 p-10 rounded-2xl shadow-xl w-96 text-center
          transition-transform transform scale-100 hover:scale-105 hover:shadow-2xl
          duration-300 ease-in-out animate-fadeIn"
        >
          <h1 
            className="text-4xl font-bold text-[#18cb96] mb-5 transition-colors duration-300 hover:text-[#14a57a]"
          >
            Record Notes
          </h1>
          <p className="text-gray-200 font-medium mb-4">Turn your meetings into comprehensive notes</p>
          <div>
            <Recorder />
          </div>
        </div>
      </div>
    );

    
  }

  export default Dashboard;
