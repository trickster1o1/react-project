import React from 'react'
import { Redirect} from 'react-router-dom'

function Protected(props) {
    let Cmt = props.cmt;

    if(!localStorage.getItem('user-info')) {
        return <Redirect to="/register" />
    }
    
        return (
            <Cmt />
        );
}

export default Protected;