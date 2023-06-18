import React, {useEffect, useState} from 'react'
import Editor from '../Editor'
import { useParams, Navigate } from 'react-router-dom'

const EditPost = () => {
  const {id} = useParams()
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
      fetch('http://localhost:4000/post/' + id)
        .then(response => {
          response.json().then(postInfo => {
            setTitle(postInfo.title)
            setContent(postInfo.content)
            setSummary(postInfo.summary)
          })
        })
    }, [])

  async function editPost(e){
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('id', id)
    if (files?.[0]){
      data.set('file', files?.[0])
    }
    await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include'
    })
    setRedirect(true)
  }
    
  if(redirect){
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={editPost}>
        <h1>Edit this post</h1>
        <input type="title" placeholder='your title' value={title} onChange={e => setTitle(e.target.value)}/>
        <input type="summary" placeholder='summary' value={summary} onChange={e => setSummary(e.target.value)}/>
        <input type="file" onChange={e => setFiles(e.target.files)}/>
        <Editor value={content} onChange={setContent} />
        <button style={{marginTop: '5px'}}>Edit post</button>
    </form>
  )
}

export default EditPost