import React, { Component, useEffect, useState,useContext } from 'react';
import {useSelector} from 'react-redux'
import Style from './finalorder.module.css';
import {useHistory} from 'react-router-dom'
import Axios from 'axios';
import {stateContext} from '../../contextApi/contextApi'
// import OrderModal from '../../../#UIElements/modal/modal'
import ErrorModal from '../../../#UIElements/errorModal/errorModal'

import Modal from '../../../#UIElements/modal/modal';
const FinalOrder =()=>  {
    const mycontext=useContext(stateContext)
const history=useHistory()
const orderDataState=useSelector(state=>state.orderData)
const [orderData,setorderData]=useState(null)
const [address,setAddress]=useState(null)
const [loading,setloding]=useState(false)
const [success,setSuccess]=useState(false)
const [error,setError]=useState('')
const [openModal,setopenModal]=useState(false)


console.log(orderDataState)
useEffect(()=>{
    if(orderDataState.order.length==0){
        history.push('/')
    }

    setorderData(orderDataState.order)
    setAddress(orderDataState.address)

},[])


const placeOrderHandler=async()=>{
    setloding(true)
try {

    const resonse=await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/order/Createorder`,{productdetails:orderData,address},{headers:{'Authorization':mycontext.token}})
    console.log(resonse.data)
      setSuccess(true)
      setError("")

        setTimeout(()=>{
            setloding(false)
            history.push('/')
        },500)
} catch (error) {
    console.log(error.response.data)
    setloding(false)
    setSuccess(false)
    setError(error.response.data.message)

}
   


}
const openmodalHanlder=()=>{
    setopenModal(!openModal)
    setError("")
}


        return (

            <div className={Style.orderhead}>
             {(error) &&
                <ErrorModal click={openmodalHanlder}>
                    {error}
                </ErrorModal>}

            {loading&&
                <Modal loading={loading}>
                    <p>Confirming Order..</p>
                    {success &&
                    <div className={Style.orderSuccess}>
                    <p>Order placed success</p>
                    <span>Redirecting</span>
                    </div>
                 
                       } 
                </Modal>

            }
                <div className={Style.itemsHead}>
                    <p className={Style.productText}>Product Description</p>
                    {orderData!==null&&
                             <div>
                            

                            <div className={Style.imageInner}>
                            <img src={orderData.secure_url} width="280px" height="300px"/>
                            <span>{orderData.discount}%</span>
                            </div>

                            
                            <div className={Style.Description}>
                                  <p>Brandname:{orderData.brandname}</p>

                                  <p>description:{orderData.description}</p>

                                  <p>seriesname:{orderData.seriesname}</p>

                                  <p>price:{orderData.price} <span className={Style.slasherprice}>{orderData.slasher_price}</span> </p>

                                  <p>quantity:{orderData.quantity?orderData.quantity:orderDataState.quantity}</p>
                                  <p>extracharges: gst = {orderData.gst} , deliverycharges = <span>{orderData.deliverycharges}</span> </p>
                            </div>


                            </div>
                        }

                </div>



                     

                <div className={Style.addressHead}>
                <p className={Style.deliverytext}>Delivery Address</p>

                    {address!==null&& 
                    <div>

                        <div className={Style.inneraddress}>
                            <p>Name:{address.username}</p>
                            <p>Email:{address.email}</p>
                            <p>Phonenumber:{address.phonenumber}</p>
                            <p>Delivery_Address:{address.address}</p>
                            <p>Zipcode:{address.zipcode}</p>
                        </div>

                        <button onClick={placeOrderHandler}>place order</button>
                      </div>
                    }

                </div>
                
            </div>
        );
    }


export default FinalOrder;