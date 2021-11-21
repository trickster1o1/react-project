import './App.css';
import Login from './Login';
import Header from './Header';
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
          <FrontPage />
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
