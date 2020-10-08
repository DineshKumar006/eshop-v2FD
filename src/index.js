import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import MenStyleReducer from './reducer/menStyleReducer'
import BrandReducer from './reducer/AllbrandReducer'
import ScrollToTop from './components/navigation/scrollToTop/scrollToTop'
import MobileReducer from './reducer/mobileReducer'
import LaptopReducer from './reducer/LaptopReducer'
import CheckoutReducer from './reducer/checkoutReducer'
import FinalOrderReducer from './reducer/finalorderReducer'
import CartReducer from './reducer/cartReducer'
import SearchReducer from './reducer/seacrhReducer'
const rootReducer=combineReducers({
    menData:MenStyleReducer,
    brandData:BrandReducer,
    mobileData:MobileReducer,
    laptopData:LaptopReducer,
    checkoutData:CheckoutReducer,
    orderData:FinalOrderReducer,
    cartData:CartReducer,
    searchData:SearchReducer

})

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)) )
const app=(
 
  <Provider store={store}>

  <BrowserRouter>
  <ScrollToTop/>
  <React.StrictMode>
  <App />
</React.StrictMode>
</BrowserRouter>
</Provider>
)

ReactDOM.render( <div>{app}</div> ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
