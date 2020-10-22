import React, { Component ,useEffect, useState,useContext} from 'react';
import {NavLink,useLocation} from 'react-router-dom'
import NavBar from '../../../#UIElements/NavBar/navbar'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {stateContext} from '../../contextApi/contextApi'
import Style from './NavLink.module.css'
import { ArrowUpCircle } from 'react-bootstrap-icons';
import SideBar from '../../../#UIElements/sidebar/sidebar';
import Fallback from '../../../#UIElements/fallBack/Fallback'
import SearchBar from '../../../#UIElements/searchBar/searchBar'
import {BagPlusFill,HouseDoorFill} from 'react-bootstrap-icons'
import {useHistory} from 'react-router-dom'
const NavLinks =()=>  {

const mycontex=useContext(stateContext)
    const [top,setTop]=useState(false)
    const [baropen,setBaropen]=useState(false)
    const history=useHistory()
// console.log(mycontex)
const handleSetActive=(e)=>{
    // console.log(e)
}

const logoutHandler=()=>{
    localStorage.clear()
    mycontex.LogoutHandler()
    console.log('logout...')
}

useEffect(()=>{

scroll.scrollToTop()


},[mycontex.isLogin])


useEffect(()=>{
    window.addEventListener('scroll',()=>{
        if(window.scrollY>50){
            setTop(true)

        }else{
            setTop(false)
        }
    })
    
},[])

const user=JSON.parse(localStorage.getItem("userdata"))


const clickHandler=()=>{
    mycontex.searchFlagHandler(false)
        history.push('/')
        setBaropen(false)

}

let route

if(mycontex.isLogin){
  route=(  <ul className={Style.linksItem}>


<div className={Style.MobileViewIcon}>

<li className ={Style.ListItem}> <NavLink activeClassName={Style.active} exact to='/profile' >Hi,{mycontex.username?mycontex.username:''}</NavLink></li>
</div>

    <li className ={Style.ListItem}>
         <NavLink activeClassName={Style.active} exact to='/' > <HouseDoorFill size="30" color="white"/></NavLink>
     </li>

    <li className ={Style.ListItem}> <NavLink  to='/mycart'  ><BagPlusFill size="30" color="orange"/></NavLink></li>

    </ul> 
  )


}else{

    route=(
    <ul className={Style.linksItem}>
      
    <li className ={Style.ListItem}  >
        <Link onClick={clickHandler} activeClass={Style.active} hashSpy={true} onSetActive={handleSetActive} to="Home" spy={true}  smooth={true} offset={-100}  duration={500}><HouseDoorFill size="30" color="white"/></Link>
     </li>

    <div className={Style.MobileViewIcon}>
    <li className ={Style.ListItem} ><Link onClick={clickHandler}   activeClass={Style.active} hashSpy={true} onSetActive={handleSetActive} to="Login" spy={true}  smooth={true} offset={-100}  duration={500}>Login</Link></li>
    </div>

    <div className={Style.MobileViewIcon}>
    <li className ={Style.ListItem} ><Link onClick={clickHandler}   activeClass={Style.active} hashSpy={true} onSetActive={handleSetActive} to="About" spy={true}  smooth={true} offset={-100}  duration={500}>About</Link></li>
    </div>
</ul>
    )
}
const SideBarOpenHandler=()=>{
    console.log(baropen)
    setBaropen(!baropen)
}



const sideBarRoute=(
    <ul className={Style.linksItem}  >
      
    <li className ={Style.ListItem}  >
        <Link onClick={clickHandler} activeClass={Style.active} hashSpy={true} onSetActive={handleSetActive} to="Home" spy={true}  smooth={true} offset={-100}  duration={500}>Home</Link>  
    </li>

    <li className ={Style.ListItem} ><Link onClick={clickHandler}   activeClass={Style.active} hashSpy={true} onSetActive={handleSetActive} to="Login" spy={true}  smooth={true} offset={-100}  duration={500}>Login</Link></li>
   
    <li className ={Style.ListItem} ><Link onClick={clickHandler}   activeClass={Style.active} hashSpy={true} onSetActive={handleSetActive} to="About" spy={true}  smooth={true} offset={-100}  duration={500}>About</Link></li>
</ul>
)







        return (
            <div className={Style.navLinkHead}>
                  {baropen&&
                <Fallback type="plain" click={SideBarOpenHandler}/>
                
                  }
                  
            <NavBar>


                {/* <div className={Style.SearchHead}> */}

     

                <div className={Style.SideBar}>

                <div className={Style.bar} onClick={SideBarOpenHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>  

                    {baropen&&
                    <SideBar SideBarOpenHandler={SideBarOpenHandler} click={SideBarOpenHandler}>

                        <div className={Style.innerSidebar}>
                        {/* {route} */}
                 {mycontex.isLogin?
                <ul className={Style.linksItem}>
                <li className ={Style.ListItem}> <NavLink activeClassName={Style.active} exact to='/profile' onClick={SideBarOpenHandler} >Hi,{mycontex.username?mycontex.username:''}</NavLink></li>
                    <li className ={Style.ListItem}>
                        <NavLink activeClassName={Style.active} exact to='/' onClick={SideBarOpenHandler} >Home</NavLink>
                    </li>

                    <li className ={Style.ListItem}> 
                    <NavLink  activeClassName={Style.active} to='/myorders' onClick={SideBarOpenHandler} >My Orders</NavLink>
                    
                    </li>


                    <li className ={Style.ListItem} onClick={logoutHandler}> 
                    <NavLink  to='/#Home'   onClick={SideBarOpenHandler}>Logout</NavLink>
                    </li>


                </ul>
                :sideBarRoute}

                        </div>
                       
                    </SideBar>
                    }  

                </div>
                     


                <div className={Style.search}>
                  <SearchBar/>
                </div>

                    



                  <div className={Style.route}>
                  {route}
                  </div>
    
                </NavBar>



                 <button className={top?Style.top:Style.topDisable} onClick={()=>scroll.scrollToTop()}><ArrowUpCircle  size={30}  color={"blue"}/></button>



            </div>
        );
    }


export default NavLinks;