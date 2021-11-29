import Header from './Header';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router';
import DeleteItem from './DeleteItem';
import { Link } from 'react-router-dom';
function AdminPannel() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    let history = new useHistory();
    let [data,setData] = useState([]);
    let [uid,setUid] = useState('');
    useEffect(async ()=>{
        if(user && user.id !== 1) {
            history.push('/');
        } else {
            let result = await fetch("http://127.0.0.1:8000/api/adminList");
            result = await result.json();
            setData(result);
            // console.log(data.products);
        }
    },[])

    function showAreYouSure(id) {
        let sure = document.getElementById('sure');
        let sureBody = document.getElementById('sureBody');
        let surU = document.getElementById('surU');
        let body = document.getElementById('body');
        sure.style.display = "block";
        surU.style.display = 'block';
        sureBody.style.display = "block";
        body.style.overflowY = "hidden";
        setUid(id);
       
    }
    function showAreYouSureP(id) {
        let sure = document.getElementById('sure');
        let surP = document.getElementById('surP');
        let sureBody = document.getElementById('sureBody');
        let body = document.getElementById('body');
        sure.style.display = "block";
        sureBody.style.display = "block";
        surP.style.display = "block";
        body.style.overflowY = "hidden";
        setUid(id);
       
    }
    function showAreYouSureC(id) {
        let sure = document.getElementById('sure');
        let surP = document.getElementById('surP');
        let sureBody = document.getElementById('sureBody');
        let body = document.getElementById('body');
        let surC = document.getElementById('surC');
        surC.style.display = 'block';
        sure.style.display = "block";
        sureBody.style.display = "block";
        body.style.overflowY = "hidden";
        setUid(id);
       
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
        setUid('');
    } 
    async function deleteUser() {
        let result = await fetch("http://127.0.0.1:8000/api/deleteUser/"+uid, {
            method:'DELETE'
        });
        result = await result.json();
        if(result.msg === 'success') {
            window.location.reload();
        } else {
            alert(result.msg);
        }
    } async function deleteCart() {
        let result = await fetch("http://127.0.0.1:8000/api/delCart/"+uid, {
            method:'DELETE'
        });
        result = await result.json();
        if(result.msg === 'success') {
            window.location.reload();
        } else {
            alert(result.msg);
            hideAreYouSure();
        }
    }
    return(
        <>
            <Header />
            <div id='sureBody' className="sureBoxBody"></div>
            <div class="modal" tabindex="-1" id="sure">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">You Sure?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideAreYouSure}></button>
                </div>
                <div class="modal-body">
                    <p>Do you really want to delete the user?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={hideAreYouSure}>No</button>
                    <button type="button" class="btn btn-primary" onClick={deleteUser} id="surU">Yes</button>
                    <button type="button" class="btn btn-primary" onClick={deleteCart} id="surC">Sure</button>
                    <DeleteItem itm={uid} />
                    
                </div>
                </div>
            </div>
            </div>
            {/* <div id='sure' className="sureBox">
                <div style={{'display':'block','width':'100%','backgroundColor':'#ccc','height':'30px','borderRadius':'12px 12px 0 0'}}><span className="sureX" onClick={hideAreYouSure}>X</span></div>
                <div style={{'padding':'3em 2em','fontSize':'15pt'}}>
                    Are u sure you want to delete this user ?
                    <div style={{'position':'absolute','right':'1.5em','bottom':'1em'}}>
                        <button className="btn btn-danger" onClick={deleteUser}>Delete</button>
                    </div>
                </div>
            </div> */}
            
            <div className="container">
            <h1 align='center' style={{'paddingBottom':'1em'}}>Users</h1>
            { data.msg === 'success' ?
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">User_id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Activation_Date</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.users.map((user)=>
                         user.id === 1 ? null :
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.created_at}</td>
                            <td><button className='btn btn-danger' onClick={()=>showAreYouSure(user.id)}>Delete</button></td>
                        </tr>
                        )
                    }
                </tbody>
                </table> 
                : "No users here"
                }
                <h1 align='center' style={{'paddingBottom':'1em'}}>Products <Link to="/addProduct" className="btn btn-primary">Add</Link> </h1>
                { data.msg === 'success' ?
                    <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.products.map((product)=>
                        <tr>
                            <td>
                                <img src={"http://127.0.0.1:8000/"+product.file_path} /><br />
                                <span style={{'fontSize':'10pt','color':'rgba(0,0,0,0.6)'}}>{product.name}</span>
                            </td>
                            <td>{product.description}</td>
                            <td>Rs.{product.price}</td>
                            <td>
                            <button className="btn btn-danger" onClick={()=>showAreYouSureP(product.id)} style={{'marginRight':'.5em'}}>Delete</button>
                                <Link to={"/updateProduct/"+product.id} className="btn btn-secondary" style={{'marginTop':'.2em','width':'5em'}}>Update</Link>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                    </table> 
                    : "No products here"
                }

                    <h1 align='center' style={{'paddingBottom':'1em'}}>Carts</h1>
                    { data.msg === 'success' ?
                        <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">User_Id</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.carts.map((cart)=>
                            <tr>
                                <td>
                                    <img src={"http://127.0.0.1:8000/"+cart.file_path} /><br />
                                    <span style={{'fontSize':'10pt','color':'rgba(0,0,0,0.6)'}}>{cart.name}</span>
                                </td>
                                <td>{cart.user_id}</td>
                                <td>{cart.description}</td>
                                <td>Rs.{cart.price}</td>
                                <td>
                                <button className="btn btn-danger" onClick={()=>showAreYouSureC(cart.id)} style={{'marginRight':'.5em'}}>Delete</button>
                                </td>
                            </tr>
                            )
                        }
                        </tbody>
                        </table> 
                        : "No products here"
                    }
        </div>
        </>
    );
}

export default AdminPannel;