import Header from './Header';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router';
function AdminPannel() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    let history = new useHistory();
    let [data,setData] = useState([]);
    useEffect(async ()=>{
        if(user && user.id !== 1) {
            history.push('/');
        } else {
            let result = await fetch("http://127.0.0.1:8000/api/adminList");
            result = await result.json();
            setData(result);
            console.log(data.products);
        }
    },[])
    return(
        <>
            <Header />
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
                            <td><button className='btn btn-danger'>Delete</button></td>
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
                            <td><button className='btn btn-danger'>Delete</button></td>
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