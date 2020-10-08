import React, { Component ,useContext, useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Card from '../../#UIElements/card/Card2'
import {stateContext} from '../contextApi/contextApi'
import Style from './branddData.module.css'
import FallBack from '../../#UIElements/fallBack/Fallback'
import Spinner from '../../#UIElements/Spinner/spinner';
import {useHttpHook} from '../../hooks/httpHook/httpHook'
import {CaretLeft,CaretRight} from 'react-bootstrap-icons'
import ErrorModal from '../../#UIElements/errorModal/errorModal'
import {BagPlusFill,HeartFill} from 'react-bootstrap-icons'
import Axios from 'axios'
const BrandData =(props)=>  {
    const dispatch=useDispatch()
    const [openModal,setopenModal]=useState(false)

    const mycontext=useContext(stateContext)
    const [btnPermod,setbtnPermod]=useState(3)
    const [btnCount,setbtnCount]=useState(1)
    const [inCart,setInCart]=useState(false)
    const [eleId,setEleid]=useState("")
    const [cartloading,setcartLoading]=useState(false)

    const [fetchData]=useHttpHook()
const cartstate=useSelector(state=>state.cartData)

    

let btn=[]
    if(props.totalPage>0){
        for(let i=1;i<=props.totalPage;i++){
            btn.push(<button id={i} value={i} className={Style.innerBtn}>{i}</button>)
        }
    }


    const nextBtn=()=>{
            if(btnCount < Math.ceil(props.totalPage/btnPermod))
            setbtnCount(btnCount+1)
    }

    const prevBtn=()=>{
        if(btnCount>1){
            setbtnCount(btnCount-1)
        }
    }

    const lastIndex=btnCount*btnPermod;
    const firstIndex=lastIndex-btnPermod
    const ReqBtn=btn.slice(firstIndex,lastIndex)




    const brandPageHandler=async(page)=>{
        console.log(parseInt(page.target.value))
try {
    const result=await fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getJ&JBrand?pageno=${page.target.value}`,props.brandname)
        console.log(result.data)

} catch (error) {
    console.log(error.response)
    
}
        
    }


    const buyHandler=async(data)=>{
        if(data){
            dispatch({type:"ADD_CHECKOUT_ITEMS", payload:[data]})
        }
        };
        


const openmodalHanlder=()=>{
            setopenModal(!openModal)
    };


const cartHandler=async(ele)=>{
    setcartLoading(true)
    console.log(ele)

        try {
         setEleid(ele._id)
        setInCart(!inCart)
        const response=await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/addCartItems`,ele,{headers:{'Authorization':mycontext.token}})
      
        // console.log(response)
        setcartLoading(false)
        dispatch({type:"ADD_ITEM_ID",eleid:ele._id})


    } catch (error) {
        setcartLoading(false)
        console.log(error.response) 
    }

    };

    const favHandlerDel=async(id)=>{
        // console.log(id)

        try {

            dispatch({type:'REMOVE_ITEM_FROM_CART',id})
            dispatch({type:"REMOVE_ITEM_ID",eleid:id})
            setEleid(id)
            const response=await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/deleteCartItem/${id}`,{headers:{'Authorization':mycontext.token}})
            // console.log(response.data)
         
        } catch (error) {
            console.log(error.response)
        }
    };










        return (
            <div id="shop_by_brand">
                <div className={Style.Spinner}>
                {mycontext.loading&&<Spinner/>}
                </div>

                {(mycontext.isLogin==false && openModal===true)
                &&
                
                <ErrorModal click={openmodalHanlder}>
                    <p>Plz,login to proceed</p>
                </ErrorModal>

         }



               

                {props.data.length>0&&


               
  <div className={Style.head}>

             <div className ={Style.brandHead}>

                  <div className={Style.text}>
                      <p className={Style.logo}>Es</p>
                      <p className={Style.innertext}>Showing result {props.brandname}</p>
                  </div>



                  <div className ={Style.brandBtn}>

                      <button onClick={prevBtn} className={Style.prevNextbtn}><CaretLeft size={20}  color={"red"}/></button>
                {ReqBtn.map((ele,idx)=>{
                    return <div key={idx} onClick={(ele)=>brandPageHandler(ele)}>{ele}</div>
                })}

                    <button onClick={nextBtn} className={Style.prevNextbtn} ><CaretRight   size={20}  color={"red"}/></button>


                  </div>

                  
             </div>


                {mycontext.loading&& 
                <div className={Style.FallBack}>
               <FallBack loading={mycontext.loading} type="fullpage"/> 

                </div>
                 }


            <div className={Style.contentHead}>
               
                {props.data.length>0&&props.data.map(ele=>{
                    return <div key={ele._id}  className={Style.contentinner}>
                {mycontext.isLogin?
                    <div>                 
                           {( cartstate.eleID.includes(ele._id) )&&
                                <button className={Style.cartFavIcon}>
                                    <HeartFill  size="30" color={"red"} onClick={()=>favHandlerDel(ele._id)}/>
                                </button>
                                }

                            {(cartloading&&ele._id===eleId)?
                                 <button className={Style.cartIcon}>
                                 <BagPlusFill size="30" color="gray" />
                                 </button>  
                                :  
                             (!cartstate.eleID.includes(ele._id) )&&
                                <button className={Style.cartIcon} onClick={()=>cartHandler(ele)} disabled={cartloading&&!cartstate.eleID.includes(ele._id)}>
                                <BagPlusFill size="30" color="orange"  />
                                </button>
                              }
                                
                     </div>
                         :<span className={Style.cartIcon} onClick={openmodalHanlder}>
                          <BagPlusFill size="30" color={"orange"}  />
                          </span>


                              }


                        <Card>
                        <p className={Style.discount}>{ele.discount}%</p>
                            <img src={ele.secure_url} alt="Not found" width="250px" height="280px"/>
                       </Card>


                       <div className={Style.Des}>
                                <p>{ele.seriesname}</p>
                    <p>price:{ele.price} <span className={Style.slasherprice}>{ele.slasher_price}</span> </p>


                            {mycontext.isLogin?
                             <NavLink to="/checkoutpage" onClick={()=>buyHandler(ele)}>
                                <button >Buy</button>
                                </NavLink> : <button onClick={openmodalHanlder}>Buy</button>}
                              
                                <div className={Style.innerDes}>
                                <p>{ele.description}</p>
                                    </div>
                                </div>


                        </div>
                })}
            </div>
                



            </div>
             
            }
            </div>
        );
    }


export default BrandData;


