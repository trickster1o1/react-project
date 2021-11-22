import Header from './Header';
import {useHistory} from 'react-router-dom';
import {useEffect,useState} from 'react';
function CartList() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const history = new useHistory();
    let [data,setData] = useState([]);
    useEffect( async ()=>{
        if(!user) {
            history.push('/login');
        } else {
            let result = await fetch("http://127.0.0.1:8000/api/cartList/"+user.id);
            result = await result.json();
            setData(result);
        }
    },[])
    async function deleteCart(id) {
        let result = await fetch("http://127.0.0.1:8000/api/deleteCart/"+id, {
            method:'DELETE'
        });
        result = await result.json();
        window.location.reload();
    }
    return(
        <>
            <Header />
            <div className="container" style={{'paddingBottom':'33.23em'}}>
                <h1 align="center" style={{'paddingBottom':'1em'}}>Your Cart</h1>
                { data.msg === 'success' ?
                    <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">SNo</th>
                        <th scope="col">Product</th>
                        <th scope="col">Title</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {                    
                        data.product.map((item)=>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td><img src={"http://127.0.0.1:8000/"+item.file_path} /></td>
                                <td>{item.title}</td>
                                <td><button className="btn btn-danger" onClick={()=>deleteCart(item.id)}>Delete</button></td>
                            </tr>
                        )                    
                    }
                    </tbody>
                    </table>
                    : "There is nothing in the cart"
                }

            </div>
        </>
    )
}

export default CartList;