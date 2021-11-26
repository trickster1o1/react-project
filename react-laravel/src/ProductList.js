import Header from './Header';
import React, {useState,useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import DeleteItem from './DeleteItem';
import {Link, useHistory} from 'react-router-dom';
function ProductList() {
    const [data,setData] = useState([]);
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

        window.location.reload();
    }
    return(
        <>
        <Header />
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
                    
                        <Col xs>
                            <div align="center">
                                <img style={{"width":"100%","height":"auto"}} src={"http://127.0.0.1:8000/"+item.file_path} />
                                <div style={{"textAlign":"left","lineHeight":"17px","paddingTop":"7px"}}>
                                    <span style={{"fontWeight":"bold","fontSize":"14pt"}}><Link to={"/showProduct/"+item.id}>{item.name}</Link></span>
                                    <p style={{"fontSize":"10pt"}}>{item.description}</p>
                                    {
                                    user && user.id === 1
                                    ?   <> 
                                            <DeleteItem itm={item.id} /> <Link to={"/updateProduct/"+item.id} className="btn btn-primary">Update</Link>
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