// import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { PageLayout } from './components/Layout/Layout';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  // const dispatch = useDispatch()
  // const { value } = useSelector((state) => state.counterReducer)
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(res => setPosts(res))
  }
  
  const user = {
    name: 'Ivan',
    age: '28',
    role: 'admin'
  }
  const isAdmin = (element) => (user.role == 'admin' ? element : <Navigate to={'/error/'}/>)

  return (
      <Routes>
        <Route path='/*' element={isAdmin(<PageLayout/>)}>
          <Route index element={<HomeComponent posts={posts}/>} />
          <Route path='info' element={<InfoPage/>} />
          <Route path='user' element={<>user</>} />
          <Route path='*'/>
        </Route>
      
        <Route path='/auth/'>
          <Route index element={<>Nothing here yet.</>} />
          <Route path='login' element={<>Login is not supported yet</>} />
          <Route path='signup' element={<>Signup is not supported yet</>} />
          <Route path='resetpassword' element={<>You don't have a passwoord yet :D</>} />
        </Route>

        <Route path='/error/'>
          <Route index element={<>Вы не админ.</>} />
        </Route>
      </Routes>
  );
}

export default App;

const HomeComponent = ({posts}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '64em', margin: '0 auto', marginTop: '15px'}}>
      {posts.map((post, index) => <PostComponent postData={post} />)}
    </div>
  )
}

const PostComponent = ({postData}) => {
  return (
    <div style = {{
      border: '1px solid #333',
      padding: '12px',
      borderRadius: '8px'
    }}>
      <p>{postData.userId}</p>
      <p>{postData.title}</p>
      <p>{postData.body}</p>
    </div>
  )
}

const InfoPage = () => {
  return(
    <>
      No information yet.
    </>
  )
}