import React, { useState,useContext } from 'react';
import Card from '../../#UIElements/card/Card2'
import {useDispatch,useSelector} from 'react-redux'

import Style from './paginate.module.css'
import FallBack from '../../#UIElements/fallBack/Fallback'
import {stateContext} from '../contextApi/contextApi'
import {CaretLeft,CaretRight} from 'react-bootstrap-icons'
import {NavLink} from 'react-router-dom'
import ErrorModal from '../../#UIElements/errorModal/errorModal'
import {BagPlusFill,HeartFill} from 'react-bootstrap-icons'
import Axios from 'axios'

const Paginate =(props)=>  {
    const dispatch=useDispatch()
 const [numberOfPage,setNumberOfPage]=useState(3)
 const [btnPerpage,serbtnPerpage]=useState(3);
 const [btnCount,setBtnCount]=useState(1);
 const [openModal,setopenModal]=useState(false)

 const [inCart,setInCart]=useState(false)
 const [eleId,setEleid]=useState("")
 const [cartloading,setcartLoading]=useState(false)

 const cartstate=useSelector(state=>state.cartData)

const mycontext=useContext(stateContext)


let btn=[]
if(mycontext.totalPage>0){
for(let i=0;i<mycontext.totalPage;i++){
       btn.push(<button onClick={props.PageHandler} className={Style.innerBtn} value={parseInt(i+1)}>{i+1}</button>)
}
}
 
const lastIndex= btnCount *btnPerpage
const firstIndex=lastIndex-btnPerpage
const reqBtn=btn.slice(firstIndex,lastIndex);



const nextBtn=()=>{
    if(btnCount < Math.ceil(props.totalPage/btnPerpage))
    setBtnCount(btnCount+1)
}

const prevBtn=()=>{
if(btnCount>1){
    setBtnCount(btnCount-1)
}
}

const buyHandler=async(data)=>{
    if(data){
        dispatch({type:"ADD_CHECKOUT_ITEMS", payload:[data]})
    }
    }
    


const openmodalHanlder=()=>{
        setopenModal(!openModal)
}
 console.log(props.data)



 const cartHandler=async(ele)=>{
    setcartLoading(true)
        try {
         setEleid(ele._id)
        setInCart(!inCart)
        const response=await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/addCartItems`,ele,{headers:{'Authorization':mycontext.token}})
              setcartLoading(false)
        dispatch({type:"ADD_ITEM_ID",eleid:ele._id})


    } catch (error) {
        setcartLoading(false)
        console.log(error.response) 
    }

    };

    const favHandlerDel=async(id)=>{
        try {

            dispatch({type:'REMOVE_ITEM_FROM_CART',id})
            dispatch({type:"REMOVE_ITEM_ID",eleid:id})
            setEleid(id)
            const response=await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/deleteCartItem/${id}`,{headers:{'Authorization':mycontext.token}})
            console.log(response.data.status)
         
        } catch (error) {
            console.log(error.response)
        }
    }


        return (
            <div className={Style.head}>
                
                {(mycontext.isLogin==false && openModal===true)
                &&
                
                <ErrorModal click={openmodalHanlder}>
                    <p>Plz,login to proceed</p>
                </ErrorModal>

         }
                <div className={Style.btnHandlerHead}>


                <div className={Style.btnHandler}>

                <button onClick={prevBtn} className={Style.prevNextbtn}><CaretLeft size={20}  color={"red"}/></button>
                

                    {reqBtn.map((ele,idx)=>{
                    return <div key={idx}>{ele}</div>
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
               
                {props.data.map(ele=>{
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
                                <p>{ele.name}</p>

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
        );
    
}

export default Paginate;