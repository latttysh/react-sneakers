import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import { Route } from "react-router-dom"

function App() {
  const [items,setItems] = React.useState([]);
  const [favorites,setFavorites] = React.useState([]);
  const [cartItems,setCartItems] = React.useState([]);
  const [searchValue,setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);


  React.useEffect(()=>{
    axios.get('https://627161d825fed8fcb5e547f2.mockapi.io/items').then(res => {
      setItems(res.data)
    });
    axios.get('https://627161d825fed8fcb5e547f2.mockapi.io/cart').then(res => {
    setCartItems(res.data)
    });
    axios.get('https://627161d825fed8fcb5e547f2.mockapi.io/favorite').then(res => {
    setFavorites(res.data)
    });
  },[]);


  const onAddToFavorite = (obj) => {
    axios.post("https://627161d825fed8fcb5e547f2.mockapi.io/favorite", obj);
    setFavorites((prev) => [...prev, obj]);
  }

  const onAddToCart = (obj) => {
    axios.post("https://627161d825fed8fcb5e547f2.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  }

  const onRemoveItem = (id) =>{
    axios.delete(`https://627161d825fed8fcb5e547f2.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value); 
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onRemove={onRemoveItem} onClose = {()=> setCartOpened(false)}/> : null}
      <Header onClickCart = {()=> setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex align-center">
            <img src="/img/search.svg" alt="search" />
            <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск" />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {
            items
            .filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index) => (
            <Card 
            key = {index}
            title={item.title} 
            price={item.price} 
            imageURL={item.imageURL}
            onPlus = {(obj) => onAddToCart(obj)}
            onFavorite = {(obj) => onAddToFavorite(obj)}
            />
            )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
