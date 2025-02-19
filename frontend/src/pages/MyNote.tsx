import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NoteSchema } from "../store/atom/atom";
import axios from "axios";
import Note from "../components/Note";

function MyNote() {
  const [note, setNote] = useState<null | NoteSchema>(null);
  const { id } = useParams();

  async function getNote(id: string) {
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_BEEP}/notes/${id}`, {
        withCredentials: true,
      });
      setNote(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      getNote(id);
    }
  }, [id]);

  if (!note) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="w-full max-w-5xl bg-black/15 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700 mt-30 text-white">
        <Note title={note.title} content={note.content} />
      </div>
    </div>
  );
}

export default MyNote;
