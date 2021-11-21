import Header from './Header'
function FrontPage(){
    let user = JSON.parse(localStorage.getItem('user-info'))
    return(
        <>
        <Header />
        <div className="container">
            {user && user.username ? user.name : user && user.error ? user.error : 'hello'}
        </div>
        </>
    )
}

export default FrontPage