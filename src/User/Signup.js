import { useState } from 'react'
import './signup.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup=()=>{

    const [firstName,setFirstName]=useState("")
    const [LastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,SetMessage]=useState("")
    const [User,setUser]=useState(null)
    const handlesubmit=async (e)=>{
        e.preventDefault() 
        setUser({firstName:firstName,LastName:LastName,email:email,password:password})
      
           
                  try{
                     const response= 
                     await axios.post('http://localhost:8080/taskApp/UserAdd', User,{
            headers: {
              'Content-Type': 'application/json'
            }
        
        });if (response.status === 200) {
            SetMessage("User created successfully");
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        } else {
            console.log("Failed to create user");
        }
        
                  }
                  catch(err){
                     console.log("not able to create user"+err)
                  }

           
        

    }
return(
    <div className="signup-page">
    <div className="sign-Background">
   <div className="signup-foreground">
     <h2>SIGNUP</h2>
      <form onSubmit={(e)=>{handlesubmit(e)}}>
        <input placeholder='FirstName' 
               type='text' 
               value={firstName} 
               onChange={(e)=>setFirstName(e.target.value)}>
        </input>
        <input placeholder='LastName' 
               type='text'
               value={LastName} 
               onChange={(e)=>setLastName(e.target.value)}>
        </input>
        <input 
              placeholder='Email' 
              type='text' 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}>
        </input>
        <input placeholder='Password'
         type='text' value={password}
         onChange={(e)=>setPassword(e.target.value)}>
        </input>
        <button type='submit'>SUBMIT</button>
     </form>
         {(message!=="")?<div className='clickme'><div style={{marginRight:"250px"}}>{message}</div><Link to="/" >Login</Link></div>:null}

   </div>
</div>
</div>
)
}

export default Signup