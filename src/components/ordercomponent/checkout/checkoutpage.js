import React, { useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useHistory,NavLink} from 'react-router-dom'
import Style from './checkoutpage.module.css'
const Checkoutpage =()=>  {
    const dispatch=useDispatch()
const stateData=useSelector((state)=>state.checkoutData)
const [checkoutData,setcheckoutData]=useState(null)
const [originalPrice,setOriginalPrice]=useState(0)
const [quantity,setquantity]=useState(1)
const history=useHistory()
useEffect(()=>{
    if(stateData.checkout.length==0){
        history.push('/')
    }
},[])

useEffect(()=>{
    if(stateData.checkout.length>0){
        setcheckoutData(
            ...stateData.checkout,
        )
        setOriginalPrice(stateData.checkout[0].price)
    }
},[])




const submitHandler=async(e)=>{

    if(stateData.checkout.length>0){
        e.preventDefault()
        console.log(e.target.elements.username.value)

        const address={
            username:e.target.elements.username.value,
            email:e.target.elements.email.value,
            phonenumber:e.target.elements.phonenumber.value,
            address:e.target.elements.address.value,
            zipcode:e.target.elements.zipcode.value,
            city:e.target.elements.city.value

        }
        localStorage.setItem("address",JSON.stringify(address))
        localStorage.setItem("orderDetails",JSON.stringify(checkoutData))
     dispatch({type:"ADD_ORDER_ITEMS" , payload:checkoutData,address, quantity:checkoutData.quantity?checkoutData.quantity:1})

    history.push('/confirm_order')
    }

    }

    console.log(stateData)


const inc=()=>{
    let data=checkoutData
    let reqprice=originalPrice * (quantity+1)
    let reqtotalPrice=reqprice+parseInt( data.gst)+parseInt(data.deliverycharges)
    setquantity(quantity+1)

    let reqdata={
        ...checkoutData,
        price:reqprice,
        totalPrice:reqtotalPrice.toString(),
        quantity:quantity+1

    }
    // console.log(reqdata)
    setcheckoutData(reqdata)

}

console.log(checkoutData)

const dec=()=>{
    if(quantity>1){
    let data=checkoutData
    let reqprice=originalPrice * (quantity-1)
    let reqtotalPrice=reqprice+parseInt( data.gst)+parseInt(data.deliverycharges)
    setquantity(quantity-1)

    let reqdata={
        ...checkoutData,
        price:reqprice,
        totalPrice:reqtotalPrice.toString(),
        quantity:quantity-1
    }
    // console.log(reqdata)
    setcheckoutData(reqdata)

    }
}

const changeHandler=()=>{

}


        return (
            <div className={Style.CheckoutHead}>

                  <div className={Style.Deshead}>
                      <p>details</p>

                      {checkoutData!==null&& 
                           <div className={Style.imageInnerHead}>

                              <div className={Style.imageInner}>

                              <img src={checkoutData.secure_url} width="280px" height="300px"/>
                                <span>{checkoutData.discount}%</span>

                               </div>

                                    <div className={Style.incDec}>
                                        <button onClick={dec}>-</button>
                                        <input type="text" value={quantity} onChange={changeHandler}/>
                                        <button onClick={inc}>+</button>
                                    </div>

                              <div className={Style.Description}>
                                  <p>Brandname:{checkoutData.brandname}</p>

                                  <p>description:{checkoutData.description}</p>

                                  <p>seriesname:{checkoutData.seriesname}</p>

                                  <p>price:{checkoutData.price} <span className={Style.slasherprice}>{checkoutData.slasher_price}</span> </p>

                                  <p>quantity:{quantity}</p>
                                  <p>extracharges: gst = {checkoutData.gst} , deliverycharges = <span>{checkoutData.deliverycharges}</span> </p>


                                </div>
                              </div>
                      }



                 </div>  

                 <div className={Style.formhead}>
                     <p>Address</p>
                     <form onSubmit={submitHandler} >
                         <input type="text" placeholder="enter name" name="username" required={true}/>
                         <input type="email" placeholder="enter email" name="email" required={true} />
                         <input type="number" placeholder="enter phone number" name="phonenumber" required={true}/>
                         

                         <input type="text" placeholder="enter city" name="city" required={true}/>

                         <input type="number" placeholder="enter enter zip code" name="zipcode" required={true} />
                         <textarea  placeholder="Enter address" name="address" required={true} ></textarea>
                        <button type="submit">chekout</button>
                     </form>
                 </div>


            </div>
        );
    }


export default Checkoutpage;