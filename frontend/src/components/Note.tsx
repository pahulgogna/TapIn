import { ArrowDownToLine } from 'lucide-react'
import MarkdownRenderer from '../utils/MarkdownRender'
import axios from 'axios'
import { useState } from 'react'

function Note({ title, content }
    : { 
        title: string,
        content: string
    }) {

      const [loading, setLoading] = useState(false)

    async function downloadPDF() {

        setLoading(true)
        const url = 'http://localhost:3001/convert'
        
        const response = (await axios.post(url, {
          "markdown": content
        })).data

        window.open(response.pdfUrl, "_blank");

        setLoading(false)

    }

  return (
    <>

      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Your Notes</h1>

        <ArrowDownToLine onClick={downloadPDF} className={` cursor-pointer ${loading ? "animate-bounce" : null}`}/>

      </div>
      <div className='border mt-5 p-5 rounded-xl text-left tracking-wider'>
          <MarkdownRenderer markdownText={content}/>
      </div>
    </>
  )
}

export default Note