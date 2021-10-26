import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import { BrowserRouter, Route } from 'react-router-dom';
import { CardsPage } from './pages/CardsPage';
import { NavLink } from 'react-router-dom';
import { ProductItemPage } from './pages/ProductItemPage';
import { CategoryItemPage } from './pages/CategoryItemPage';
import { BasketPage } from './pages/BasketPage';
import { Redirect } from 'react-router';

const App = () => {
  function getBasketSize() {
    let value = 0;
    let key;
    for (let i = 0; i < sessionStorage.length; i++) {
      key = sessionStorage.key(i);
      //    console.log(sessionStorage.key(i));
      //  console.log(sessionStorage.length);
      if (key !== null) {

        value = value + Number(sessionStorage.getItem(key));
      }
    }
    return value;
  }
  const [productCounter, setProductCounter] = useState(getBasketSize());

  function changeCounter(changeValue: string) {
    switch (changeValue) {
      case '+1': {
        if (productCounter !== undefined) {
          setProductCounter(productCounter + 1);
        }
        break;
      }
      case '-1': {
        if (productCounter !== undefined) {
          setProductCounter(productCounter - 1);
        }
        break;
      }
      case '0': {
        if (productCounter !== undefined) {
          setProductCounter(0);
        }
        break;
      }
    }
  }

  return (
    <BrowserRouter>
      <div>
        <div className="App__navbar">
          <NavLink className="App__nav-link" to='/products'>Продукция</NavLink>
          <NavLink className="App__nav-link App__nav-link_basket" to='/basket'>
            Корзина {productCounter}
          </NavLink>
        </div>
        <Route path={'/basket'} exact>
          <BasketPage basketFunction={(item: string) => changeCounter(item)} />
        </Route>
        <Route path={'/products'} exact>
          <CardsPage />
        </Route>
        <Route path={'/products/:id'} exact>
          <ProductItemPage basketFunction={() => changeCounter('+1')} />
        </Route>
        <Route path={'/categories:id'} exact>
          <CategoryItemPage />
        </Route>
        <Redirect to='/products' />
      </div>
    </BrowserRouter>
  );
}

export default App;
