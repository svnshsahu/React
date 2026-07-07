import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import './App.css';
import authService from "./appwrite/auth"
import {login , logout} from './store/AuthSlice'
import Footer from './components/Footer/Footer'
import Header  from './components/Header/Header'
import { Outlet } from 'react-router-dom';
//{} nam mein jb export mein default na ho wo agar default hai toh sirf koi bhi nam bina {} ke
function App() {
  const [loading , setLoading] = React.useState(true); // ye islie ki agar true hai toh loading ka icon dikhaenge aur agar true nahi hai toh data dikhaenge ye tb use hioga jb database se kuch fetch karna ho 
  const dispatch = useDispatch()
  
  useEffect( () => {
    authService.getCurrentUser()
    .then((userData) =>{ 
       if(userData){
        dispatch(login( {userData} ) )
       }else{
        dispatch(logout(  ))
       }
    } )
    .finally(() => setLoading(false))
  } , [])
  
  
  // react strict mode mein hai islie 2 bar aa raha 
  // return (
  //   <>
  //     <h1>vite project</h1>
  //   </>
  // )

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-900'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
          {/* TODO :{/* <Outlet/>  */}
          {/* <h1>Hellooo</h1>  */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
