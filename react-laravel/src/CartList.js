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
            console.log(result.pending);
            setData(result);
        }
    },[])
    

    async function cancelCart() {
        let result = await fetch("http://127.0.0.1:8000/api/cancelCart/"+user.id, {
            method:'DELETE'
        });
        result = await result.json();
        if(result.msg === 'success') {
            window.location.reload();
        } else {
            alert(result.msg);
        }
    }
    async function buyProducts() {
        let userId = user.id;
        let proData = {userId};
        let result = await fetch("http://127.0.0.1:8000/api/buyProducts", {
            method:'PUT',
            body:JSON.stringify(proData),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        });

        result = await result.json();
        if(result.msg === 'success') {
=======

   
    return(
        <>
            <Header />
            <div className="container" style={{'paddingBottom':'33.23em'}}>
                <h1 align="center" style={{'paddingBottom':'1em'}}>Your Cart</h1>
                { data.msg === 'success' ?
                    <div>
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
                    <tr>

                        <td colSpan="4"><div style={{"float":"right","paddingRight":"7.5em"}}><button className="btn btn-primary" onClick={buyProducts}>Buy</button> <button className="btn btn-danger" onClick={cancelCart}>Cancel</button></div></td>
=======


                    </tr>
                    </tbody>
                    </table>
                    <div><span style={{'fontWeight':'bold'}}>Pending items:</span> {data.pending}</div> 
                    </div>
                    : <div style={{"paddingBottom":"10.1em",'fontSize':'15pt','color':'red'}}>There are {data.pending} items pending</div>
                }

            </div>
        </>
    )
}

export default CartList;