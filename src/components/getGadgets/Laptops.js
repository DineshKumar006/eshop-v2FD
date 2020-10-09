import React, {  useEffect, useState,useContext } from 'react';
// import {useHttpHook} from '../../hooks/httpHook/httpHook'
import {useDispatch,useSelector} from 'react-redux';
import Axios from 'axios';
import Spinner from '../../#UIElements/Spinner/spinner'
import Card from '../../#UIElements/card/Card2'
import Style from './mobile.module.css';
import {stateContext} from '../contextApi/contextApi'
import ErrorModal from '../../#UIElements/errorModal/errorModal'
import {NavLink} from 'react-router-dom';
import {BagPlusFill,HeartFill} from 'react-bootstrap-icons'

const Laptops =()=>  {
const mycontext=useContext(stateContext)
    const [pageno,setPageno]=useState(2)
    const [loading,setLoading]=useState(false)
    const [openModal,setopenModal]=useState(false)
    const [inCart,setInCart]=useState(false)
    const [eleId,setEleid]=useState("")
    const [cartloading,setcartLoading]=useState(false)



const dispatch= useDispatch()

const state=useSelector(state=>state.laptopData)
const cartstate=useSelector(state=>state.cartData)
useEffect(()=>{
    
    if(state.laptops.length==0){
    const fetchData=  async()=>{
        try {
            setLoading(true)
            const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/gadgets/getGadgets/laptop?pageno=1`)
            dispatch({type:"ADD_LAPTOPS_ITEMS",payload:response.data.result})
            setLoading(false)
        } catch (error) {     
        }
    }
    fetchData()
}
},[])



const MoreDataHandler=async()=>{

    setLoading(true)
try {

    const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/gadgets/getGadgets/laptop?pageno=${pageno}`)
    dispatch({type:"ADD_LAPTOPS_ITEMS",payload:response.data.result})
    setLoading(false)
    setPageno(pageno+1)

} catch (error) {
    console.log(error.response.data)
}

 }


 const openmodalHanlder=()=>{
    setopenModal(!openModal)
}
const buyHandler=async(data)=>{
    if(data){
        dispatch({type:"ADD_CHECKOUT_ITEMS", payload:[data]})
    }
};
    
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

    const favHandlerDel=async(itemid,id)=>{
        try {
            console.log("dinesh kumar",id)

            dispatch({type:'REMOVE_ITEM_FROM_CART',id})
            dispatch({type:"REMOVE_ITEM_ID",eleid:id})

            // dispatch({type:'REMOVE_ITEM_FROM_CART',id})
            // dispatch({type:"REMOVE_ITEM_ID",eleid:id})

            setEleid(id)
            const response=await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/deleteCartItem/${id}`,{headers:{'Authorization':mycontext.token}})
            // console.log(response)
         
        } catch (error) {
            console.log(error.response)
        }
    }





 console.log(cartstate)
        return (
            <div style={{background:"white"}} className={Style.Header}>

                {(mycontext.isLogin==false && openModal===true)
                                &&
                                
                                <ErrorModal click={openmodalHanlder}>
                                    <p>Plz,login to proceed</p>
                                </ErrorModal>

                        }

                <p className={Style.head}>Laptop Gadgets</p>
                
                <div className={Style.card}>

                {state.laptops.length>0&& state.laptops.map((ele)=>{


                    return <div key={ele._id} className={Style.innerimg}>

                    {mycontext.isLogin?
                    <div>               
                        {
                           (cartstate.eleID.includes(ele._id) )&&
                                <button className={Style.cartFavIcon}>
                                    <HeartFill  size="30" color={"red"} onClick={()=>favHandlerDel(ele.itemid,ele._id)}/>
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
                        <img src={ele.secure_url} alt="not found" width="250px" height="280px"/>
                        </Card>

                            <div className={Style.Des}>
                                <p>{ele.seriesname}</p>
                                <p>price:{ele.price} <span className={Style.slasherprice}>{ele.slasher_price}</span> </p>

                                {mycontext.isLogin?

                             <NavLink to="/checkoutpage" onClick={()=>buyHandler(ele)}>
                                <button >Buy</button>
                                </NavLink> : 
                                <button onClick={openmodalHanlder}>Buy</button>
                                

                                }
                                <div className={Style.innerDes}>
                                <p>{ele.description}</p>

                                    </div>
                                </div>
                         </div>
                })}

                </div>

                

                <div className={Style.spinner}>
                {loading&&<Spinner/>}
                </div>


                <div className={Style.moreBtn}>
                <button onClick={MoreDataHandler}>More</button>
                </div>

            </div>
        );
    
}

export default Laptops;