import React, { useState } from 'react'
import Editor from '../Editor'
import {Navigate} from 'react-router-dom'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
}

const formats = [
    'header',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image'
]

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    async function createNewPost(e){
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])
        const response = await fetch('https://blog-app-1zta.onrender.com/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        })

        if (response.ok){
            setRedirect(true)
        }else{
            alert('Please input normal data!!')
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
    <form onSubmit={createNewPost}>
        <h1>Create a new post</h1>
        <input type="title" placeholder='your title' value={title} onChange={e => setTitle(e.target.value)}/>
        <input type="summary" placeholder='summary' value={summary} onChange={e => setSummary(e.target.value)}/>
        <input type="file" onChange={e => setFiles(e.target.files)}/>
        <Editor value={content} onChange={setContent} />
        <button style={{marginTop: '5px'}}>Create post</button>
    </form>
  )
}

export default CreatePost