import Header from './Header';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
function PendingList() {
    let [data,setData] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-info'));
    useEffect(()=>{
        async function fetchData() {
            let result = await fetch("http://127.0.0.1:8000/api/pendingList/"+user.id);
            result = await result.json();
            setData(result);
        }
        fetchData();
    },[]);
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
                    </tr>
                    </thead>
                    <tbody>
                    {                    
                        data.product.map((item)=>
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td><img src={"http://127.0.0.1:8000/"+item.file_path} alt="error404" /></td>
                                <td>{item.title}</td>
                                {/* <td><button className="btn btn-danger" onClick={()=>deleteCart(item.id)}>Delete</button></td> */}
                            </tr>
                        )                    
                    }
                    <tr>

                        {/* <td colSpan="4"><div style={{"float":"right","paddingRight":"7.5em"}}><button className="btn btn-primary" onClick={buyProducts}>Buy</button> <button className="btn btn-danger" onClick={cancelCart}>Cancel</button></div></td> */}


                    </tr>
                    </tbody>
                    </table>
                    <div><Link to="/cart"><span style={{'fontWeight':'bold'}}>Back to cart</span></Link></div> 
                    </div>
                    : <div style={{"paddingBottom":"10.1em",'fontSize':'15pt','color':'red'}}><Link to="/cart">There are no items pending</Link></div>
                }

            </div>
        </>
    );
}

export default PendingList;