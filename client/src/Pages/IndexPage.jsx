import React, {useEffect, useState} from 'react'
import Post from '../Components/Post'

const IndexPage = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('https://blog-app-1zta.onrender.com/post').then(response => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  }, [])
  return (
    <div className="posts">
        {posts.length > 0 && posts.map(post => (
          <Post key={post.id} {...post}/>
        ))}
    </div>
  )
}

export default IndexPage