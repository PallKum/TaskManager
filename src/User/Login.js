import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import {loginUser} from '../Authentication/Action'
import  './Login.css'
import axios from 'axios';
const Login=()=>{
    const dispatch = useDispatch();
const navigate=useNavigate();

    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [User,setUser]=useState(null)


useEffect(()=>{
const fetchData =async()=>{
    try{
        const response= await axios.get('http://localhost:8080/taskApp/getALL')   
    }
    catch(error){
        console.log(error)
    }
}
fetchData();
},[])

const handleLogin = async()=>{
   setUser({email:email,password:password})
  
    try{
        const response = await axios.post('http://localhost:8080/taskApp/login', User,{
            headers: {
              'Content-Type': 'application/json'
            }});
        setPassword("");
        setEmail("")
        const name=response.data
        if(response.status===200){
            dispatch(loginUser(name));            
            navigate('/home')     
        }
      
    }
    catch(err){}
}
    
   return(
    <div className='login-page'>
        <div className='Background'>
            <div className='foreground'>
                <h2>LOGIN</h2>
                <form>
                <input 
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></input>
                <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></input>
                </form>
              <button onClick={(e)=>handleLogin(e)}>Login</button>
              <p style={{marginLeft:'15em'}}>Don't have an account?    
              <Link to="/signup" >Sign up</Link></p>
            </div>
            
        </div>
       
    </div>
   )

}

export default Login