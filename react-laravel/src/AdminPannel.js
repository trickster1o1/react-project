import Header from './Header';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
function AdminPannel() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    let history = new useHistory();
    useEffect(()=>{
        if(user && user.id !== 1) {
            history.push('/');
        }
    },[])
    return(
        <>
            <Header />
            <div className="container">
                Working
            </div>
        </>
    );
}

export default AdminPannel;