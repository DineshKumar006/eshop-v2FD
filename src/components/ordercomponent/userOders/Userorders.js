import React, { Component, useState, useEffect,useContext } from 'react';
import Axios from 'axios';
import {stateContext} from '../../contextApi/contextApi'
import ErrorModal from '../../../#UIElements/errorModal/errorModal'
import Style from './userorders.module.css'
import Spinner from '../../../#UIElements/Spinner/spinner';
import Fallback from '../../../#UIElements/fallBack/Fallback';
const Userorders =()=>  {
const myContext=useContext(stateContext)
    const [orderData,setorderData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')
    const [openModal,setopenModal]=useState(false)
    const [pageCount,setPageCount]=useState(2)
    const [moreLoding,setMoreLoding]=useState(false)


    useEffect(()=>{
        setLoading(true)
        const fetchData=async()=>{
            try {
                const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/order/userorders?pageno=1`,{headers:{'Authorization':myContext.token}})
                setorderData(response.data.result.userOrders)
               setLoading(false)
               setError("")

        } catch (error) {
            console.log(error.response)
            setLoading(false)
            setError(error.response.data.message)
        }

    }
        fetchData()

        

    },[])

    console.log(orderData)

    const openmodalHanlder=()=>{
        setopenModal(!openModal)
        setError("")
}





const MoreHandler=async()=>{
    setMoreLoding(true)
        try {
            const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/order/userorders?pageno=${pageCount}`,{headers:{'Authorization':myContext.token}})
            setorderData(orderData.concat(response.data.result.userOrders))
            setMoreLoding(false)
            setPageCount(pageCount+1)
           setError("")
        } catch (error) {
            setMoreLoding(false)
            setError(error.response.data.message)
        }
}

        return (
            <div className={Style.head}>

                {loading&&  <Fallback/>}

                {(error) &&
                <ErrorModal click={openmodalHanlder}>
                    {error}
                </ErrorModal>}
                    <div className={Style.textHead}>

                        <div className={Style.innertext}>
                        <p>My Orders</p>
                        </div>

                    <div className={Style.textLogo}>
                  <p className={Style.Logo}>ES</p>
                 <span>Happy shopping with Eshpping</span>
                </div>                  

            </div>

                {(orderData.length && !loading)>0&&
                    <div className={Style.Imgheader}>

                      {orderData.map((ele)=>{
                            return <div key={ele._id} className={Style.innerImg}>

                                    <div>
                                    <img src={ele.productdetails.productLink} alt="not found"/>
                                    </div>

                                    <div className={Style.description}>
                                        <h3>Description</h3>

                                        <div className={Style.innerdescription}>
                                          <p>Productname:{ele.productdetails.productname}</p>
                                             <p>Specfication:{ele.productdetails.description}</p>
                                             <p>Paymentmode:{ele.productdetails.paymentmode}</p>
                                            <p>Quantity:{ele.productdetails.quantity}</p>
                                            <p>TotalPrice:{ele.productdetails.totalPrice}</p>
                                        </div>
                                       

                                    </div>

                                    <div className={Style.description}>
                                        <h3>Delivery Address</h3>
                                        <p>{ele.address.username}</p>
                                        <p>{ele.address.email}</p>
                                        <p>{ele.address.address}</p>
                                        <p>{ele.address.city}</p>
                                        <p>{ele.address.zip_code}</p>

                                    </div>


                                </div>
                      })}     

                        {moreLoding&&
                      <Spinner/>}

                      <div className={Style.morebtn}>
                      <button onClick={MoreHandler}>more</button> 
                      </div>

                    </div>


                
                
                }



                
            </div>
        );
    
}

export default Userorders;