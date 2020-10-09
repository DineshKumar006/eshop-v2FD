import React, { Component, useEffect, useState, useContext } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Card from '../../#UIElements/card/Card2'
import Style from './mycart.module.css'
import Axios from 'axios';
import {stateContext} from '../contextApi/contextApi'
import Spinner from '../../#UIElements/Spinner/spinner'
import Modal from '../../#UIElements/modal/modal'
import {NavLink} from 'react-router-dom'
import ErrorModal from '../../#UIElements/errorModal/errorModal'

const MyCart =()=>  {
    const dispatch=useDispatch()
    const mycontext=useContext(stateContext)
    const cartstate=useSelector(state=>state.cartData)
    const [loading,setLoading]=useState(false)
    const [pageno,setPageno]=useState(2)
    const [openModal,setopenModal]=useState(false)
    const [error,setError]=useState('')
    const [errorFlag,setErrorFlag]=useState(false)




useEffect(()=>{
    const fetchData=async()=>{
        setLoading(true)
        try {
            const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/getCartData?pageno=1`,{headers:{'Authorization':mycontext.token}})
            console.log(response.data.isUser.userCart)
            dispatch({type:'ADD_ITEM_IN_CART',payload:response.data.isUser.userCart, arrayFlag:true})
             setError('')
            setLoading(false)
        } catch (error) {
         console.log(error.response.data)
         setError(error.response.data.message)

         dispatch({type:'REMOVE_ALL_ITEM_FROM_CART'})

           setLoading(false)

        }
    }
    fetchData()
},[])


const openmodalHanlder=()=>{
    setopenModal(!openModal)
    setError('')
}

const moreDataHandler=async()=>{
    setLoading(true)
    try {
        const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/getCartData?pageno=${pageno}`,{headers:{'Authorization':mycontext.token}})
        dispatch({type:'ADD_MORE_ITEM_INCART',payload:response.data.isUser.userCart, arrayFlag:true})
        setError('')
        setPageno(pageno+1)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        setError(error.response.data.message)

        console.log(error.response)
    }
}

const buyHandler=async(data)=>{
    if(data){
        dispatch({type:"ADD_CHECKOUT_ITEMS", payload:[data]})
    }
};


const deleteHandler=async(itemid,id)=>{
    try {

        dispatch({type:'REMOVE_ITEM_FROM_CART',id})
        dispatch({type:"REMOVE_ITEM_ID",eleid:id})
        // setEleid(id)
        const response=await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/mycart/deleteCartItem/${itemid}`,{headers:{'Authorization':mycontext.token}})
        console.log(response)
     
    } catch (error) {
        console.log(error.response)
    }
}


console.log(cartstate)



        return (
            <div className={Style.cardHead}>
                  <p>MyCart</p>
      {((mycontext.isLogin==false && openModal===true) || error )
                                &&
                                
                                <ErrorModal click={openmodalHanlder}>
                                    {error?
                                    <p>{error}</p>
                                   
                                    :
                                    <p>Plz,login to proceed</p>
                            }
                                </ErrorModal>

                        }
               
                {
                cartstate.Data.length>0&&

                    <div className={Style.card}>

                     
                        
                    {
                    cartstate.Data.map(ele=>{
                        return <div key={ele._id} className={Style.innerimg}  >
                                        <Card>
                                        <p className={Style.discount}>{ele.discount}%</p>
                                        <p className={Style.deleteIcon} onClick={()=>deleteHandler(ele.itemid,ele._id)}>X</p>
                                        <img src={ele.secure_url} alt="not found" width="250px" height="280px"/>
                                        </Card>

                                   <div className={Style.Des}>
                                        <p>{ele.seriesname}</p>

                                        {mycontext.isLogin?

                                       <NavLink to="/checkoutpage" onClick={()=>buyHandler(ele)}>
                                        <button >Chekout</button>
                                        </NavLink> : 
                                        <button onClick={openmodalHanlder}>Chekout</button>
                                    
                                        }
                                        <div className={Style.innerDes}>
                                        <p>{ele.description}</p>
                                        
                                            </div>
                                        </div>
                                            
                                 </div>
                    })
                    
                    }
                    </div>
                
                
                }

            <div className={Style.Spinner}>
                {loading&&
                <Spinner type="auth"/>
              }
                </div>


                {(!error)&&
                <div className={Style.morebutton}>
                    <button onClick={moreDataHandler}>more</button>
                </div>
                }
              

            </div>
        );
    }


export default MyCart;