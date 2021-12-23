import { Navbar, Nav, Container, NavDropdown, FormControl } from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom'
import {useState} from 'react'
function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'));
    let [srch,setSrch] = useState("");
    const history = useHistory()
    function logout(){
        localStorage.clear()
        history.push('/login')
    }
    function findItem() {
        history.push('/searchResult/'+srch); 
        window.location.reload();
    } 
    function cartView() {
        history.push('/cart');
    }
    function adminView() {
        history.push('/adminPannel');
    } function srchFn(e) {
        if(e.key === "Enter") {
            findItem();
        }
    }
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">Art Gallery</Navbar.Brand>
                <Nav className="me-auto navbar-wrapper" >
                    
                    {
                        localStorage.getItem('user-info') ? 
                        <>
                        
                            <Link to="/home" active>Profile</Link>
                            { user.id === 1
                                ? <Link to="/addProduct">Add Product</Link>
                                : null
                            }
                        </>
                        :
                        <>
                            
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    }
                </Nav>
                <Nav>
                    <div className="d-flex">
                        <FormControl type="search" placeholder="search" className="me-2" aria-label="Search" onChange={(e)=>setSrch(e.target.value)} onKeyPress={(e)=>srchFn(e)} />
                    </div>
                    {user ? 
                        <NavDropdown title={user && user.name} style={{"marginRight":".5em","marginLeft":".5em"}}>
                            {
                                user.id !== 1 ? <NavDropdown.Item onClick={cartView}>Cart</NavDropdown.Item>
                                : <NavDropdown.Item onClick={adminView}>Adminpannel</NavDropdown.Item>
                            }
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            
                        </NavDropdown>
                    : null }

                    
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}

export default Header