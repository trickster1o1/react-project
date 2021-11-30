import { withRouter } from "react-router";
import {useEffect, useState} from "react";
import { useHistory } from "react-router";
import Header from "./Header";
function UpdateProduct(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    let history = new useHistory();
    useEffect( async () => {
        let result = await fetch("http://127.0.0.1:8000/api/showProduct/"+props.match.params.id);
        result = await result.json();
        setData(result);
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
    },[]);

    async function update() {
        let product = {name, price, description};
        let result = await fetch("http://127.0.0.1:8000/api/updateProduct/"+props.match.params.id, {
            method:'PUT',
            body:JSON.stringify(product),
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });

        result = await result.json();

        if(result.msg == "success") {
            history.push('/');
        } else if(result.msg == "error404") {
            alert(result.msg);
        }  else {
            alert("Internal Server Error try again leter");
        }
    }
    return(
        <>
        <Header />
        <div className='container' style={{'paddingBottom':'35.65em'}}>
            <h1 align="center">Add Product</h1> <br />
            <div className='col-sm-6 offset-sm-3'>
               <input type="text"  defaultValue={data.name} onChange = {(e) => setName(e.target.value)}  className='form-control' placeholder="Title" /> <br />
               <input type="text"  defaultValue={data.description} onChange = {(e) => setDescription(e.target.value)} className='form-control' placeholder="Description" /> <br />
               <input type="text" defaultValue={data.price} onChange = {(e) => setPrice(e.target.value)} className='form-control' placeholder="Price in Rupees" /> <br />
               <input type="submit" value="Upload" className='btn btn-primary' style={{"float":"right"}} onClick = {update} /> <br />
            </div>
        </div>
        </>
    )
}
export default withRouter(UpdateProduct);