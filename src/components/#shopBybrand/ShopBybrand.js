import React, { useState,useEffect ,useContext} from 'react';
import {useDispatch} from 'react-redux'
import Style from './Bybrand.module.css'
import {useHttpHook} from '../../hooks/httpHook/httpHook'
import {stateContext} from '../contextApi/contextApi'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

// import {FetchData} from '../../Fetchdata/fetchData'
const ShopBybrand =(props)=>  {
const stateMycontext=useContext(stateContext)
const [fetchData,loading,error]=useHttpHook()
// const [Scroll,setScroll]=useState(0)
// const [scrollTo,setScrollTo]=useState(710)
const [btnModule,setBtnModule]=useState(0)

// console.log(props)

let btn=[]
useEffect(()=>{

    if(props.totalPage>0){
        for(let i=1;i<=props.totalPage;i++){
            btn.push(<button>{i}</button>)
        }
    }

},[])

    




    const BrandHandler=async(e)=>{
        if(stateMycontext.optionsCatagoryFlag==true){
            console.log("scroll to 1430")
            document.documentElement.scrollTop=1430
        }
        else{
            document.documentElement.scrollTop=720
        }  
        let cc=e.target.id.toLowerCase().trim().split(" ").join('')
        const result=await fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getJ&JBrand?pageno=1`,e.target.id)
        console.log(result)

    }
        return (
            <div className={Style.Brand}>
            <p>Shop by Brand</p>
              <div className={Style.Linkhead}>
                 <Link  activeClass={Style.active} hashSpy={true} to="shop_by_brand" spy={true}  smooth={true} offset={-100}  duration={500} >
                     
                  <span  id="jack&jone" onClick={BrandHandler}>Jack {"&"} jones </span>
                  <span id="Denims" onClick={BrandHandler}>Denims</span>
                  <span id="Adidas" onClick={BrandHandler}>Adidas</span>
                  <span id="hermes" onClick={BrandHandler}>Hermes</span>
                  <span id="Nike" onClick={BrandHandler}>Nike</span>
                  <span id="Allen Solly" onClick={BrandHandler}>Allen Solly</span>
                  <span id="Peter England" onClick={BrandHandler}>Peter England</span>
                  <span id="Park Avenue" onClick={BrandHandler}>Park Avenue</span>
                  <span id="Monte Carlo" onClick={BrandHandler}>Monte Carlo</span>
                     
                     
                 </Link>
                  {/* <span  id="jack&jone">Jack {"&"} jones </span>
                  <span id="Denims">Denims</span>
                  <span id="Adidas">Adidas</span>
                  <span id="hermes">Hermes</span>
                  <span id="Nike">Nike</span>
                  <span id="Allen Solly">Allen Solly</span>
                  <span id="Peter England">Peter England</span>
                  <span id="Park Avenue">Park Avenue</span>
                  <span id="Monte Carlo">Monte Carlo</span>
               */}
              </div>

          </div> 
        );
    }


export default ShopBybrand;