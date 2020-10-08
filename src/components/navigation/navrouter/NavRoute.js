import React, { useContext } from 'react';
import NavLink from  '../navlink/NavLink'
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from '../../Home/Home'
import HomeHead from '../../Home/homeHeader/homeheader'
import Checkoutpage from '../../ordercomponent/checkout/checkoutpage'
 import Auth from '../../Auth/Auth';
import About from '../../About/About'
import FinalOrder from '../../ordercomponent/finalorder/finalorder'
import Style from './navroute.module.css';
import Profile from '../../Auth/profile/profile'
import UserOrders from '../../ordercomponent/userOders/Userorders'
import Mycart from '../../cart/MyCart'
import SearchData from '../../searchcomponent/searchData'
// import ScrollToTop from '../scrollToTop/scrollToTop'

import {stateContext} from '../../contextApi/contextApi'
const Navigation =()=> {
const mycontext=useContext(stateContext)
    let route
if(mycontext.isLogin){
    route=(
        <div>
            <Switch>
            <Route  path='/' exact={true} component={Home} />
            <Route  path='/about' exact={true} component={About} />
            <Route  path='/checkoutpage' exact={true} component={Checkoutpage} />
            <Route path="/profile" exact={true} component={Profile}/>
            <Route path="/confirm_order" exact={true} component={FinalOrder}/>
            <Route path="/myorders" exact={true} component={UserOrders}/>
            <Route path="/mycart" exact={true} component={Mycart}/>
            <Route path="/searchData/:value" exact={true} component={SearchData}/>
           <Redirect to="/#home"  />
            </Switch>
        </div>
    )
}else{
    route=(
    <Switch>

    <Route path="/searchData/:value" exact={true} component={SearchData}/>
   <Redirect to="/#home"  />
    </Switch>)
}



        return (
            <div className={Style.RouteHead}>

                <NavLink/>
                {
                route            
                }

                {(!mycontext.isLogin ) &&
                <div>
                 <Home/>
                 <Auth/>
                </div>
                }
              <About/>


                {/* <Switch>
                <Route path="/searchData/:value" exact={true} component={SearchData}/>

             <Redirect to="/home"  />
                </Switch> */}
             
            </div>
        );
    }


export default Navigation;