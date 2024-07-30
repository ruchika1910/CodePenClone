import React, { useState, useEffect } from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { Home, NewProject, Spinner } from './components';
import { auth, db } from './config/firebase.config';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import {SET_USER} from './context/actions/userActions'
import {SET_PROJECTS} from './context/actions/projectActions'

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if(userCred){
        // console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(() => {
          //dispatch the action to the redux store
          dispatch(SET_USER(userCred?.providerData[0]));
        navigate("/home/projects", {replace: true })

        })
      } else {
        navigate("/home/auth", {replace: true })
      }
      setInterval(() => {
        setIsLoading(false);
      }, 1000)
    })
  
    //clean up the listenerEvent to avoid constant-re-rendering of this code
     return ()=> unsubscribe();
  }, [])

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    )

    const unsubscribe = onSnapshot(projectQuery, (querySnaps =>{
      const projectsList = querySnaps.docs.map(doc => doc.data())
      dispatch(SET_PROJECTS(projectsList))
    }))

    return unsubscribe;
  }, [])
  
  return (
    <>
    {isLoading ? (
      <div className='w-screen h-screen flex items-center justify-center overflow-hidden' >
          <Spinner/>
    </div>
    ) : (
    <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
        <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />} />

            {/* re-route the user completely on the refresh if the route is not matching.
use Navigate from react-router-dom to re-direct the user. 
 */}
            <Route path="*" element={<Navigate to ={"/home"}/>} />
        </Routes>
    </div>)
    }
    </>
  );
}

export default App