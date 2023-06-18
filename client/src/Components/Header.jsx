import React, {useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(info => {
        setUserInfo(info)
      })
    })
  }, [])

  function logout(){
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <header>
      <Link to={'/'} className='logo'>My Blog</Link>
      <nav>
        {username 
        ?
        (
          <>
            <Link to="/create">Create a new Post</Link>
            <div className='greet'>Hello <p className="author-name">{username}</p> </div>
            <a onClick={logout}>Logout</a>
          </>
        )
        :
        (
          <>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
          </>
        )
      }
      </nav>
    </header>
  )
}

export default Header