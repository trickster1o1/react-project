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
        sure.style.display = "block";
        sureBody.style.display = "block";
        setUid(id);
       
    }
    function hideAreYouSure() {
        let sure = document.getElementById('sure');
        let sureBody = document.getElementById('sureBody');
        sure.style.display = "none";
        sureBody.style.display = "none";
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
    }
    return(
        <>
            <Header />
            <div id='sureBody' className="sureBoxBody">a</div>
            <div id='sure' className="sureBox">
                <div style={{'display':'block','width':'100%','backgroundColor':'#ccc','height':'30px','borderRadius':'12px 12px 0 0'}}><span className="sureX" onClick={hideAreYouSure}>X</span></div>
                <div style={{'padding':'3em 2em','fontSize':'15pt'}}>
                    Are u sure you want to delete this user ?
                    <div style={{'position':'absolute','right':'1.5em','bottom':'1em'}}>
                        <button className="btn btn-danger" onClick={deleteUser}>Delete</button>
                    </div>
                </div>
            </div>
            <div className="container">
            <h1 align='center' style={{'paddingBottom':'1em'}}>Users</h1>
            { data.msg === 'success' ?
                <table className="table">
                    <thead>
                    <tr>
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
                        <tr>
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
                <h1 align='center' style={{'paddingBottom':'1em'}}>Products</h1> 
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
                            <td>{product.price}</td>
                            <td>
                                <DeleteItem itm={product.id} /><br />
                                <Link to={"/updateProduct/"+product.id} className="btn btn-secondary" style={{'marginTop':'.2em','width':'5em'}}>Update</Link>
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