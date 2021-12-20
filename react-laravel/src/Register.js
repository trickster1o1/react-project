import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import Header from './Header'
function Register() {
    
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history.push("/home")
        }
    },[])

    const [name,setName] = useState("")
    const [password, setPassword] =useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const history = useHistory()
    async function signUp() {
        let user = {name, password, username, email, phone}
        // alert(user.email);

        let result = await fetch("http://127.0.0.1:8000/api/signup",{
            method:'POST',
            body:JSON.stringify(user),
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })

        result = await result.json()
        if(result.msg !== 'Success') {
            alert(result.msg);
        } else {
            localStorage.setItem("user-info",JSON.stringify(result.user))
            history.push("/home")
        }
        
    } 
    function callSignup(e) {
        if(e.key === 'Enter') {
            signUp();
        }
    }
    return (
        <>
        <Header />
        <div className='container' style={{"paddingBottom":"34.75em"}}>
            <h1 align="center">Register</h1> <br />
            <div className='col-sm-6 offset-sm-3'>
                <input type='text' value = {name} onChange = {(e)=>setName(e.target.value)} className='form-control' placeholder='Name' onKeyPress={(e)=>callSignup(e)} /> <br />
                <input type='text' value = {email} onChange = {(e)=>setEmail(e.target.value)} className='form-control' placeholder='Email' onKeyPress={(e)=>callSignup(e)} /> <br />
                <input type='text' value = {username} onChange = {(e)=>setUsername(e.target.value)} className='form-control' placeholder='Username' onKeyPress={(e)=>callSignup(e)} /> <br />
                <input type='text' value = {phone} onChange = {(e)=>setPhone(e.target.value)} className='form-control' placeholder='Phone No' onKeyPress={(e)=>callSignup(e)} /> <br />
                <input type='password' onChange = {(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' onKeyPress={(e)=>callSignup(e)} />
                <input type='submit' onClick = {signUp} className="btn btn-primary" style={{"float":"right","marginTop":"5px"}} />

            </div>
        </div>
        </>
    )
}

export default Register