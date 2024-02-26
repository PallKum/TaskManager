import './Home.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {logoutUser} from '../Authentication/Action'
import { ImSwitch } from "react-icons/im";
import Task from '../Task/Task.js'

const Home = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const history = useNavigate();
    const user= JSON.parse(localStorage.getItem('user'))
    
    useEffect(() => {
        const authToken = localStorage.getItem('isAuthenticated');
        if (!authToken) {
            history('/');
        }
    }, [history]);

    const handleLogout =()=>{
        dispatch(logoutUser())
        navigate('/')
      }

    return (
        <div className="homePage">
            <div className="homeBackground">
                <h1 style={{fontFamily: 'Dancing Script',
                    fontSize: '32px',
                    color: '#75306C', 
                 }}>
                   Welcome, {user.firstName}<div style={{ position: "relative" }}>
                  <button 
                    style={{ position: "absolute",
                     top: 30, right: 10, 
                     background:"#75306C",
                     height:"30px",
                    color:"white"}} 
                    onClick={e=>handleLogout(e)}>
                       <ImSwitch></ImSwitch> Logout 
                 </button >
                    </div></h1> 
                  <div className='navBar'>
                    <h3 className='todo'>My Tasks </h3>
                </div>
                <div><Task user={user}></Task></div>
            </div>
        </div>
    );
}

export default Home;
