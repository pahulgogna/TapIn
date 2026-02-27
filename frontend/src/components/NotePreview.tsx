import { useMemo } from "react"
import MarkdownRenderer from "../utils/MarkdownRender"

function NotePreview({
    content,
    title,
    id
    }: {
    content: string,
    title: string,
    id: string
}) {

    const contentPreview = useMemo(() => {
        return content.split('\n').length > 2
        ? <MarkdownRenderer markdownText={content.split('\n').slice(0, 2).join('\n') + "..."}/>
        :   <MarkdownRenderer markdownText={content}/>
    }, [content])


  return (
    <div className='border cursor-pointer mt-5 p-5 rounded-xl text-left tracking-wider shadow-md' onClick={() => {
        window.location.href = `/notes/${id}`
    }}>
        <div className="text-2xl font-bold text-[#18cb96]">
            {title}
            
        </div>
        <div className="text-white text-xl">
        {contentPreview}
        </div>
        
    </div>
  )
}

export default NotePreview