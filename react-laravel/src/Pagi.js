import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteItem from "./DeleteItem";
import axios from "axios";

function Pagi(props) {

    

    function showAreYouSure(id) {
        let sure = document.getElementById('sure');
        let sureBody = document.getElementById('sureBody');
        let surU = document.getElementById('surU');
        let body = document.getElementById('body');
        let dcrt = document.getElementById('dcrt');
        let dprod = document.getElementById('dprod');
        let dusr = document.getElementById('dusr');
        dprod.style.display = "none";
        dusr.style.display = "block";
        dcrt.style.display = "none";
        sure.style.display = "block";
        surU.style.display = 'block';
        sureBody.style.display = "block";
        body.style.overflowY = "hidden";
        props.setUid(id);
       
    }
    function showAreYouSureP(id) {
        let sure = document.getElementById('sure');
        let surP = document.getElementById('surP');
        let sureBody = document.getElementById('sureBody');
        let body = document.getElementById('body');
        let dcrt = document.getElementById('dcrt');
        let dprod = document.getElementById('dprod');
        let dusr = document.getElementById('dusr');
        dprod.style.display = "block";
        dusr.style.display = "none";
        dcrt.style.display = "none";
        sure.style.display = "block";
        sureBody.style.display = "block";
        surP.style.display = "block";
        body.style.overflowY = "hidden";
        props.setUid(id);
       
    }
    function showAreYouSureC(id) {
        let sure = document.getElementById('sure');
        let sureBody = document.getElementById('sureBody');
        let body = document.getElementById('body');
        let surC = document.getElementById('surC');
        let dcrt = document.getElementById('dcrt');
        let dprod = document.getElementById('dprod');
        let dusr = document.getElementById('dusr');
        dprod.style.display = "none";
        dusr.style.display = "none";
        dcrt.style.display = "block";
        surC.style.display = 'block';
        sure.style.display = "block";
        sureBody.style.display = "block";
        body.style.overflowY = "hidden";
        props.setUid(id);
       
    }
    function hideAreYouSure() {
        let sure = document.getElementById('sure');
        let sureBody = document.getElementById('sureBody');
        let surP = document.getElementById('surP');
        let surU = document.getElementById('surU');
        let surC = document.getElementById('surC');
        let body = document.getElementById('body');
        surC.style.display='none';
        sure.style.display = "none";
        surP.style.display = "none";
        sureBody.style.display = "none";
        surU.style.display = "none";
        body.style.overflowY= "scroll";
        props.setUid('');
    } 
    async function deleteUser() {
        // alert(uid);
        let result = await fetch("http://127.0.0.1:8000/api/deleteUser/"+props.uid, {
            method:'DELETE'
        });
        result = await result.json();
        if(result.msg === 'success') {
            window.location.reload();
        } else {
            alert(result.msg);
        }
    } async function deleteCart() {
        await axios.delete("http://127.0.0.1:8000/api/delCart/"+props.uid)
        .then((res)=>{
            if(res.data.msg === 'success') {
                window.location.reload();
            } else {
                alert(res.data.msg);
                hideAreYouSure();
            }
        }).catch((error)=>console.log(error.message));
    }

    let [page,setPage] = useState(0);
    let thresHold = 4;
    let viewed;
    let totalPage;
    let lstData;
    if(props.user.length > 0) {
        
        viewed = page * thresHold;
        totalPage = Math.ceil(props.user.length/thresHold);

        if(props.itm === 'user'){
            lstData = props.user.slice(viewed , viewed + thresHold).map((usr) => {
                if(usr.id === 1) { 
                    return null
                } else {
                    return(
                        <tr>
                            <td>{usr.id}</td>
                            <td>{usr.name}</td>
                            <td>{usr.email}</td>
                            <td>{usr.username}</td>
                            <td>{usr.created_at}</td>
                            <td><button className='btn btn-danger' onClick={()=>showAreYouSure(usr.id)}>Delete</button></td>
                        </tr>
                    )
                }
            })
        } else if(props.itm === 'product') {
            lstData = props.user.slice(viewed , viewed + thresHold).map((usr) => {
                    return(
                        <tr>
                <td>
                    <img src={"http://127.0.0.1:8000/"+usr.file_path} alt="error404" /><br />
                    <span style={{'fontSize':'10pt','color':'rgba(0,0,0,0.6)'}}>{usr.name}</span>
                </td>
                <td>{usr.description}</td>
                <td>Rs.{usr.price}</td>
                <td>
                <button className="btn btn-danger" onClick={()=>showAreYouSureP(usr.id)}  style={{'marginRight':'.5em'}}>Delete</button>
                    <Link to={"/updateProduct/"+usr.id} className="btn btn-secondary" style={{'marginTop':'.2em','width':'5em'}}>Update</Link>
                </td>
            </tr>
                    )
                
            })
        } else if(props.itm === 'cart') {
            lstData = props.user.slice(viewed , viewed + thresHold).map((usr) => {
                
                    return(
                        <tr>
                            <td>
                                <img src={"http://127.0.0.1:8000/"+usr.file_path} alt="error404" /><br />
                                <span style={{'fontSize':'10pt','color':'rgba(0,0,0,0.6)'}}>{usr.name}</span>
                            </td>
                            <td>{usr.user_id}</td>
                            <td>{usr.description}</td>
                            <td>{usr.created_at}</td>
                            <td>Rs.{usr.price}</td>
                            <td>
                            <button className="btn btn-danger" onClick={()=>showAreYouSureC(usr.id)} style={{'marginRight':'.5em'}}>Delete</button>
                            </td>
                        </tr>
                    )
                
            })
        }
        
    } else {
        totalPage = 0;
    }

    let changePage = ({selected}) => {
        setPage(selected)
    }

    return (
        <>
            <div id='sureBody' className="sureBoxBody"></div>
            <div class="modal" tabindex="-1" id="sure">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">You Sure?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideAreYouSure}></button>
                </div>
                <div class="modal-body">
                    <p id='dusr'>Do you really want to delete the user?</p>
                    <p id='dprod'>Do you really want to delete the product?</p>
                    <p id='dcrt'>Do you really want to delete the cart?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={hideAreYouSure}>No</button>
                    <button type="button" class="btn btn-primary" onClick={deleteUser} id="surU">Yes</button>
                    <button type="button" class="btn btn-primary" onClick={deleteCart} id="surC">Sure</button>
                    <DeleteItem itm={props.uid} />
                    
                </div>
                </div>
            </div>
            </div>
            {lstData}
            { 
                 totalPage > 1 ?
                 <tr><td colSpan={props.itm === 'user' ? 5 : props.itm === 'cart' ? 6 : 4}>
                        <div style={{'display':'flex','justifyContent':'center','paddingBottom':'.5em'}}>
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel = {"Next"}
                        pageCount = {totalPage}
                        onPageChange = {changePage}
                        containerClassName = {"pagination page-item"}
                        previousLinkClassName = {"page-link"}
                        nextLinkClassName = {"page-link"}
                        disabledClassName = {"page-item dissabled"}
                        disabledLinkClassName = {"page-link"}
                        activeClassName = {"page-item active"}
                        pageClassName = {"page-item"}
                        pageLinkClassName = {"page-link"}
                        /></div>
                </td></tr>
                    : null
                }
        </>
    )
}

export default Pagi;