import {useState} from 'react'
import '../login/login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import {Link} from 'react-router-dom'


const Register = () => {
    const navigate=useNavigate();
    const [errorMessage,setErrorMessage]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data=new FormData(e.currentTarget)
        const actualData={
            name:data.get("userName"),
            email:data.get("email"),
            password:data.get("password"),
            rePassword:data.get("rePassword")
        }
        if(actualData.password===actualData.rePassword){
            try{const {data}= await axios.post('/api/register',actualData)
            console.log(data)
            navigate('/login')
            toast.success(`account created for ${actualData.name} `)
        }catch(error){
            toast.error("mail already exist");
        }
            
        }else{
            toast.error("password not matched");
        }
       
        }
    
    console.log(errorMessage)
  return (
    <div className='account row'>
    <div className="form col-md-5 col-8">
    <h3 className='heading'>Create your account</h3>
        <form  method="post" onSubmit={handleSubmit}>

            <div className="inputField">
                <input className='Input' type="text" name="userName" id='userName' placeholder='USER NAME' />
            </div>
            <div className="inputField">
                <input type="email" name="email" id="email" placeholder='EMAIL' />
            </div>
            <div className="inputField">
                <input type="password" name="password" id="password" placeholder='PASSWORD' />
            </div>
            <div className="inputField">
                <input type="password" name="rePassword" id="rePassword"  placeholder='RE-PASSWORD'/>
            </div>
            <div className="inputField"><button type='submit' >CREATE</button></div>

            

        </form>
        <div className="forgot">
          
          <Link className="loginToAccount" to="/login">
            Already have an Account!
          </Link>
        </div>
        
    </div>


</div>
  )
}

export default Register