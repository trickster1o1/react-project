import './App.css';
import Login from './Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './Register';
import FrontPage from './FrontPage';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import UpdateProduct from './UpdateProduct';
import Footer from './Footer';
import Protected from './Protected';
import SearchResult from './SearchResult';
import CartList from './CartList';
import PendingList from './PendingList';
import AdminPannel from './AdminPannel';
import ApiTest from './ApiTest';
import Test from './test';
import Profile from './Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        {/* <Header /> */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/addProduct">
          <Protected cmt ={AddProduct} />
          {/* <AddProduct /> */}
        </Route>
        <Route path="/home">
          <Protected cmt={FrontPage} />
        </Route>
        <Route path="/showProduct/:id">
          <ProductDetail />
        </Route>
        <Route path="/updateProduct/:id">
          <UpdateProduct />
        </Route>
        <Route path="/searchResult/:prod">
          <SearchResult />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/cart">
          <CartList />
        </Route>
        <Route path="/pendingProduct">
          <PendingList />
        </Route>
        <Route path="/adminpannel">
          <Protected cmt = {AdminPannel} />
        </Route>
        <Route path="/apiTest">
          <ApiTest />
        </Route>
        <Route path="/test">
          <Test />
        </Route>


        <Route path="/">
          <ProductList />
        </Route>
        
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
