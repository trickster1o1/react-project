import React ,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Header from './Header';
// import axios from 'axios';
function Login() {
    const history = useHistory()
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history.push("/home")
        }
    },[])
    const [unm,setUsername] = useState("")
    const [password,setPassword] = useState("")

    async function login() {
        let user = {unm, password}
        let result = await fetch("http://127.0.0.1:8000/api/login", {
            method:'POST',
            body:JSON.stringify(user),
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        result = await result.json()
        
        if(result.error) {
            alert(result.error)
        }else {
            localStorage.setItem("user-info",JSON.stringify(result))
            history.push('/')

        }

        // await axios.post('http://127.0.0.1:8000/api/login', user , {
        //     headers: {
        //         'Content-Type':'application/json',
        //         'Accept':'application/json'
        //     }
        // })
        // .then((res)=>console.log(res.data.created_at))
        // .catch((error)=>console.log(error));


    }

    function callLogin(e) {
        if(e.key === 'Enter') {
            login();
        }
    }
    return (
        <>
        <Header />
        <div className='container' style={{"paddingBottom":"42.5em"}}>
            <h1 align="center">Register</h1> <br />
            <div className='col-sm-6 offset-sm-3'>
                <input type='text' value = {unm} onChange = {(e)=>setUsername(e.target.value)} className='form-control' placeholder='Username' onKeyPress={(e)=>callLogin(e)} /> <br />
                <input type='password' onChange = {(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' onKeyPress={(e)=>callLogin(e)} />
                <input type='submit' value='login' onClick={login} className="btn btn-primary" style={{"float":"right","marginTop":"5px"}} />

            </div>
        </div>
        </>
    )
}

export default Login

