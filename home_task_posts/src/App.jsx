import './App.css';

import { PageLayout } from './components/Layout/Layout';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';

function App() {
  const [ data, setData ] = useState([]);
  const [ comments, setComments ] = useState([])

  const getData = type => fetch(`https://jsonplaceholder.typicode.com/${type}`).then(res => res.json());
  
  useEffect(() => {

    fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then(res => res.json())
    .then(comment => setComments(comment))

    Promise
      .all([ 'posts', 'users' ].map(getData))
      .then(([ posts, users ]) => {
        const usersObj = Object.fromEntries(users.map(n => [ n.id, n ]));
        setData(posts.map(n => ({
          post: n,
          user: usersObj[n.userId],
        })));
      });
}, []);
  
  return (
   <Routes>
    <Route path='/*' element={<PageLayout/>}>
      <Route index element={<HomeComponent data={data}/>} />
      <Route path='post/:postId' element={<LinkPost comments={comments}/>}/>
    </Route>

    <Route path='/auth/'>
          <Route index element={<>No Information</>} />
          <Route path='login' element={<>Login is not supported yet</>} />
          <Route path='signup' element={<>Signup is not supported yet</>} />
          <Route path='resetpassword' element={<>You don't have a passwoord yet :D</>} />
        </Route>
   </Routes>
  );
}

export default App;

const HomeComponent = ({data}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '64em', margin: '0 auto', marginTop: '15px'}}>
      {data.map(({ post, user }) => (
        <div style = {{border: '1px solid #333', padding: '12px', borderRadius: '8px'}}>
            <Link to={`/post/${post.id}`}
              state={{
                id: post.id, 
                user: user.name, 
                postB: post.body, 
                postT: post.title
              }}>
            <h2>{post.title}</h2>
            <h3>{user.name}</h3>
            <p>{post.body}</p>
          </Link>
        </div>
      ))}
    </div> 
  )
}

const LinkPost = ({comments}) => {
  const location = useLocation()
  const postId = location.state.id

  return (
    <div>
      <div style = {{padding: '12px'}}>
        <h2>Post information</h2>
      </div>
      <div style = {{border: '1px solid #333', padding: '12px', borderRadius: '8px'}}>
        <h3>{location.state.user}</h3><hr/>
        <h4>{location.state.postT}</h4><hr/>
        <p>{location.state.postB}</p>
      </div>

      <div style={{padding: '12px'}}><h2>Comments: </h2></div>

      {comments.map(comment => {
        if (comment.postId === postId) {
          return (
            <div style = {{border: '1px solid #333', padding: '8px', borderRadius: '8px', marginTop: '8px'}}
            key ={comment.id}>
              
              <h3>{comment.name}:</h3>
              <hr/><p><br/>{comment.body}</p>
            </div>
          )
        }
      })}
    </div>
  )
}
