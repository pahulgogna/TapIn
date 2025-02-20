import { useEffect } from "react"

function Team() {

    async function getTeam() {
        try {
            const response = await fetch('http://localhost:3002/group/createGroup/')
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    } 

    useEffect(() => {



    }, [])

    return (
        <div className='mt-30'>
            
        </div>
    )
}

export default Team