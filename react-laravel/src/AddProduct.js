import React, {useState} from 'react'
import {useHistory} from  'react-router-dom'    
import Header from './Header';

function AddProduct() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    let history = useHistory();
    let [name,setName] = useState("");
    let [description,setDescription] = useState("");
    let [price,setPrice] = useState("");
    let [file,setFile] = useState("");
    let [username,setUsername] = useState(user.username);

    async function upload() {
        
        const formData = new FormData();
        formData.append('file_path',file);
        formData.append('name',name);
        formData.append('price',price);
        formData.append('description',description);
        formData.append('username',username);
        
        let result = await fetch("http://127.0.0.1:8000/api/addProduct", {
            method:'POST',
            body:formData
        });

        result = await result.json();

        if(result.msg === 'success'){
            alert("data has been saved");
            history.push('/');
        } else {
            alert('error');
        }

    }
    return (
        <>
        <Header />
        <div className='container' style={{"paddingBottom":"31.75em"}}>
            <h1 align="center">Add Product</h1> <br />
            <div className='col-sm-6 offset-sm-3'>
               <input type="text" name="name" onChange = {(e) =>setName(e.target.value)} className='form-control' placeholder="Title" /> <br />
               <input type="text" name="description" onChange= {(e)=>setDescription(e.target.value)} className='form-control' placeholder="Description" /> <br />
               <input type="text" name="price" onChange= {(e)=>setPrice(e.target.value)} className='form-control' placeholder="Price in Rupees" /> <br />
               <input type="file" name="file_path" onChange = {(e)=>setFile(e.target.files[0])} className='form-control' /> <br />
               <input type="submit" value="Upload" onClick={upload} name="file_path" className='btn btn-primary' style={{"float":"right"}} /> <br />
            </div>
        </div>
        </>
    )
}

export default AddProduct