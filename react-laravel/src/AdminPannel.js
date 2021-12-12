import Header from './Header';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Pagi from './Pagi';

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
        }
    },[])

    return(
        <>
            <Header />            
            <div className="container">
            <h1 align='center' style={{'paddingBottom':'1em'}}>Users</h1>
            { data.msg === 'success' && data.usr !== 'empty' ?
            <div>
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
                    
                <Pagi user={data.users} itm="user" />
                </tbody>
                </table>
                
                
                </div>
                : <div className="emptyMsg" >Nothing Here</div>
                }
                <h1 align='center' style={{'paddingBottom':'1em'}}>Products <Link to="/addProduct" className="btn btn-primary">Add</Link> </h1>
                { data.msg === 'success' && data.prod !== 'empty' ?
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
                    {/* { displayCont } */}
                    <Pagi user={data.products} itm="product" />
                    </tbody>
                    </table> 
                    : <div className="emptyMsg" >Nothing Here</div>
                }

                    <h1 align='center' style={{'paddingBottom':'1em'}}>Carts</h1>
                    { data.msg === 'success' && data.crt !== 'empty' ?
                        <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">User_Id</th>
                            <th scope="col">Description</th>
                            <th scope="col">Stored_at</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        <Pagi user = {data.carts} itm="cart" />
                        </tbody>
                        </table> 
                        : <div className="emptyMsg" >Nothing Here</div>
                    }
        </div>
        </>
    );
}

export default AdminPannel;