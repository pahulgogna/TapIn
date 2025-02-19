import MarkdownRenderer from '../utils/MarkdownRender'

function Note({ title, content }
    : { 
        title: string,
        content: string
    }) {
  return (
    <>
      <div className='flex justify-between '>
        <h1 className='text-3xl font-bold'>{title}</h1>
      </div>
      <div className='border mt-5 p-5 rounded-xl text-left tracking-wider'>
          <MarkdownRenderer markdownText={content}/>
      </div>
    </>
  )
}

export default Note