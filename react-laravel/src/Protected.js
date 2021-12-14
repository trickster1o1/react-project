import React ,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function Protected(props) {
    let Cmt = props.cmt
    const history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')) {
            history.push('/register');
        }
    },[]);
    
        return (
            <Cmt />
        );
}

export default Protected;