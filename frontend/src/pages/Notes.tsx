import { useRecoilValueLoadable } from "recoil";
import NotePreview from "../components/NotePreview";
import { notesAtom, NoteSchema } from "../store/atom/atom";

function Notes() {
  const notes = useRecoilValueLoadable(notesAtom);

  if (notes.state === "loading") {
    return <div className="text-center text-white text-xl">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('images/background.png')" }}
    >
      <div className="w-full max-w-3xl bg-black/70 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-[#18cb96] text-center mb-6">Your Notes</h2>

        <div className="grid grid-cols-1 gap-4">
          {notes.contents.map((note: NoteSchema) => (
            <div
              key={note.id}
              className="bg-black/60 border border-gray-600 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <NotePreview title={note.title} content={note.content} id={note.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
