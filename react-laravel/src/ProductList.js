import Header from './Header';
import React, {useState,useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import DeleteItem from './DeleteItem';
import {Link, useHistory} from 'react-router-dom';
function ProductList() {
    const [data,setData] = useState([]);
    let [uid,setUid] = useState('');
    let user = JSON.parse(localStorage.getItem('user-info'));
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/list");
        result = await result.json();
        setData(result);
    },[]);
    // async function deleteItem(id) {
    //     let result = await fetch("http://127.0.0.1:8000/api/delete/"+id,{
    //         method:'DELETE'
    //     });

    //     result = await result.json();
        
    //     console.log(result.msg);

    // }
    async function addCart(id) {
        let userId = user.id;
        let cartData = {userId};
        let result = await fetch("http://127.0.0.1:8000/api/addToCart/"+id, {
            method:'POST',
            body:JSON.stringify(cartData),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        });
        result = await result.json();
        if(result.msg === "Already in cart") {
            alert(result.msg);
        } else {
            window.location.reload();
        }
    }
    function showAreYouSure(id) {
        let sure = document.getElementById('sure');
        let sureBody = document.getElementById('sureBody');
        let surP = document.getElementById('surP');
        let body = document.getElementById('body');
        sure.style.display = "block";
        surP.style.display = 'block';
        sureBody.style.display = "block";
        body.style.overflowY = "hidden";
        setUid(id);
       
    }
    function hideAreYouSure() {
        let sure = document.getElementById('sure');
        let sureBody = document.getElementById('sureBody');
        let body = document.getElementById('body');
        let surP = document.getElementById('surP')
        sure.style.display = "none";
        sureBody.style.display = "none";
        body.style.overflowY= "scroll";
        surP.style.display = 'none';
        setUid('');
    } 
    return(
        <>
        <Header />
        <div id='sureBody' className="sureBoxBody"></div>
            <div className="modal" tabindex="-1" id="sure">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">You Sure?</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideAreYouSure}></button>
                </div>
                <div className="modal-body">
                    <p>Do you really want to delete the user?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideAreYouSure}>No</button>
                    <DeleteItem itm={uid} />
                </div>
                </div>
            </div>
            </div>
        <div className="container" style={{"paddingTop":"2em","paddingBottom":"26.2em"}}>
                <Row md={4}>
               {
                   
                   data.map((item)=>
                    // <tr>
                    //     <td>{item.id}</td>
                    //     <td>{item.name}</td>
                    //     <td>{item.description}</td>
                    //     <td>{item.price}</td>
                    //     <td><img style={{"width":"10em","height":"auto"}} src={"http://127.0.0.1:8000/"+item.file_path} /></td>
                    // </tr>
                    
                        <Col xs style={{'paddingBottom':'1em'}}>
                            <div align="center">
                                <img style={{"width":"100%","height":"19.55em"}} src={"http://127.0.0.1:8000/"+item.file_path} />
                                <div style={{"textAlign":"left","lineHeight":"17px","paddingTop":"7px"}}>
                                    <span style={{"fontWeight":"bold","fontSize":"14pt"}}><Link to={"/showProduct/"+item.id}>{item.name}</Link></span>
                                    <p style={{"fontSize":"10pt"}}>{item.description}</p>
                                    {
                                    user && user.id === 1
                                    ?   <> 
                                            <button className="btn btn-danger" onClick={()=>showAreYouSure(item.id)}>Delete</button> <Link to={"/updateProduct/"+item.id} className="btn btn-primary">Update</Link>
                                        </>
                                    : user && user.id !== 1
                                    ?   <> 
                                            <button className="btn btn-primary" onClick={()=>addCart(item.id)}>Add Cart</button> <button  className="btn btn-danger">Buy</button>
                                        </>
                                    : null
                                    }
                                </div>
                            </div>
                        </Col>
                    
                   )
               }
                </Row>

        </div>
        </>

    );
}

export default ProductList;