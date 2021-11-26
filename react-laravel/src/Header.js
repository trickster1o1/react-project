import { Navbar, Nav, Container, NavDropdown, FormControl, Form, Button } from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
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
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">Art Gallery</Navbar.Brand>
                <Nav className="me-auto navbar-wrapper">
                    
                    {
                        localStorage.getItem('user-info') ? 
                        <>
                        
                            <Link to="/home">Profile</Link>
                            { user.id == 1
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
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="search" className="me-2" aria-label="Search" onChange={(e)=>setSrch(e.target.value)} />
                        <Button variant="outline-success" onClick={findItem}>Search</Button>
                    </Form>
                    {user ? 
                        <NavDropdown title={user && user.name} style={{"marginRight":".5em","marginLeft":".5em"}}>
                            {
                                user.id !== 1 ? <NavDropdown.Item onClick={cartView}>Cart</NavDropdown.Item>
                                : null
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