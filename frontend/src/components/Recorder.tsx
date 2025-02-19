import axios from "axios"
import { useEffect, useMemo, useRef, useState } from "react"
import Button from "./basics/Button"
import { useRecoilValueLoadable } from "recoil"
import { userAtom } from "../store/atom/atom"


function useRecorder() {

  const [audio, setAudio] = useState<null | MediaStream>(null)
  const chunksRef = useRef<Blob[]>([])
  const [formData, setFormData] = useState<FormData | null>(null)
  
  const user = useRecoilValueLoadable(userAtom)

  async function setup() {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true 
      })

      const audioTracks = mediaStream.getAudioTracks()

      if (audioTracks.length > 0) {
        const audioStream = new MediaStream(audioTracks) // Media stream with only audio
        setAudio(audioStream)
        console.log("started recording", audioStream)
      } else {
        console.error("No audio tracks found")
      }

    } catch (err) {
      throw "Error capturing screen/audio: " + err
    }
  }

  let recorder: null | MediaRecorder = useMemo(() => {
      if (audio) {
        
        let mediaRecorder = new MediaRecorder(audio)

        mediaRecorder.ondataavailable = (d: BlobEvent) => {
          chunksRef.current.push(d.data)
        }

        console.log("audio ready", mediaRecorder) 

        return mediaRecorder
      }
      console.log("audio not ready")

      return null
    }, [audio])

    useEffect(() => {



      if (recorder) {
        recorder.start(100)
      }
    }, [recorder])

    function stopRecording() {
      if (recorder) {
        recorder.stop()
        console.log("recording stopped")
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm"
        })

        const file = new File([blob], "recording.wav", { type: "audio/webm" });

        const fd = new FormData()
        console.log(user.contents.id)
        fd.append("userId", user.contents.id);
        fd.append("audio", file);

        setFormData(fd)
      }
    }

    async function startRecording() {
      await setup()
    }

    return { formData, startRecording, stopRecording }

}


function Recorder() {

  const [recording, setRecording] = useState(false)
  const { formData, startRecording, stopRecording } = useRecorder()
  const [response, setResponse] = useState("")

  const startRec = async () => {
    setRecording(true)
    try{
      await startRecording()
    }
    catch(e){
      console.log(e)
      setRecording(false)
    }
  }

  const stopRec = async () => {
    setRecording(false)
    stopRecording()
  }

  async function sendFile() {

    try{
      
          const res = await axios.post("http://localhost:5000/convert", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          setResponse(res.data.message)
      

    }
    catch(e){
      console.log(e)
      window.alert("Error sending file")
    }
  }

  useEffect(() => {

      if (formData) {
        console.log("File ready to send:", formData)
      }

    }, [formData])


  return (
      <>
        {response.length ? null : <div className="flex justify-center gap-5">

            <Button className="hover:cursor-pointer p-2 rounded bg-blue-400" onClick={async () => {
              recording ? stopRec() : startRec()
            }}>
              {formData ? "cancel" : recording ? 'Stop' : 'Start'}
            </Button>
            {
              formData 
              &&
              <Button className="hover:cursor-pointer p-2 rounded bg-blue-400" onClick={sendFile}>
                Send
              </Button>
            }
            
          </div>}
          
          <div>
              {
                response 
                && 
                <div className="p-2 rounded text-center py-5 text-xl font-semibold">
                  {response}
                </div>
              }
          </div>
      </>
  )
}

export default Recorder