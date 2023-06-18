import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import CreatePost from './Pages/CreatePost'
import PostPage from './Pages/PostPage'
import EditPost from './Pages/EditPost'


const App = () => {

  useEffect(() => {
    fetch("https://blog-app-1zta.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[]);

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
         </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App