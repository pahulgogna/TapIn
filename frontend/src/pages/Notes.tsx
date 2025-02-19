import { useRecoilValueLoadable } from "recoil"
import NotePreview from "../components/NotePreview"
import { notesAtom, NoteSchema } from "../store/atom/atom"

function Notes() {

    const notes = useRecoilValueLoadable(notesAtom)

    if(notes.state === "loading"){
        return <div>Loading...</div>
    }
    else{
        return (
            <div>
                {
                    notes.contents.map((note: NoteSchema) => {
                        return <NotePreview key={note.id} title={note.title} content={note.content} id={note.id}/>
                    })
                }
            </div>
        )
    }
}

export default Notes