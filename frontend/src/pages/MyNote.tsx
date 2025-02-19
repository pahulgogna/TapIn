import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NoteSchema } from '../store/atom/atom'
import axios from 'axios'
import Note from '../components/Note'

function MyNote() {

    const [note, setNote] = useState<null | NoteSchema>(null)

    async function getNote(id: string) {
        try{
            let data = await axios.get(`${import.meta.env.VITE_BEEP}/notes/${id}`, {
                withCredentials: true
            })
            setNote(data.data)
        }
        catch(e){
            console.log(e)
        }
    }
    const {id} = useParams()

    useEffect(() => {


        if(id){
            getNote(id)
        }


    }, [])

    if(!note){
        return <div>Loading...</div>
    }


    return (
        <div className='m-8'>
            <Note title={note.title} content={note.content}/>
        </div>
    )
}

export default MyNote