import Card from "../components/basics/Card"
import Recorder from "../components/Recorder"

function Dashboard() {
  return (
    <div className="flex justify-center mt-10">
        <Card >
            <div >
                <h1 className="text-2xl font-bold">Record Notes</h1>
                <p className="text-gray-600">Turn your meetings in to comprihensive notes</p>
                <Recorder/> 
            </div>
        </Card>
    </div>
  )
}

export default Dashboard