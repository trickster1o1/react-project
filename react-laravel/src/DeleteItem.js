function DeleteItem(props) {
    let item = props.itm;

    async function displayId(){
        let product = {item};
        let result = await fetch("http://127.0.0.1:8000/api/delete/"+product.item,{
            method:'DELETE'
        });
        result = await result.json();
        
        if(result.msg === "success") {
            alert("Data has been deleted successfully");
        }

        window.location.reload();
        
        
    }
    return(

        <button className="btn btn-danger" onClick={displayId} id='surP'>
            Yes
        </button>

    );
}

export default DeleteItem;