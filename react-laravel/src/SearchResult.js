import Header from './Header';
import {ListGroup} from 'react-bootstrap';
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';
import React, {useState,useEffect} from 'react';

function SearchResult(props) {
    const [data,setData] = useState([]);
    let product = props.match.params.prod;
    
    // window.location.reload();
    useEffect(async ()=>{
        
        let result = await fetch("http://127.0.0.1:8000/api/search/"+product)
        result = await result.json();
        setData(result);
        
    },[])
    
    return (
        <>
            <Header />
            <div className="container" style={{"padding":"2em 0 49.1em 0"}}>
                <ListGroup>
                {
                    data && data.msg ?
                    "No such item" :
                    data.map((item)=>
                        <ListGroup.Item> <Link to={"/showProduct/"+item.id}> {item.name}</Link><span style={{"float":"right","color":"red","fontWeight":"bold"}}>Rs.{item.price}</span></ListGroup.Item>
                    )
                }
                </ListGroup>
            </div>
        </>

    );
}

export default withRouter(SearchResult);