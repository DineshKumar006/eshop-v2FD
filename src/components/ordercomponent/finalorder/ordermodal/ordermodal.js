import React, { Component } from 'react';
import Style from './orderModal.module.css'
const OrderModal =(props)=>  {

        return (
            <div className={Style.modalHead}>

                <div className={Style.innermodalHead}>
                {props.children}
                </div>  

            </div>
        );
    }


export default OrderModal;