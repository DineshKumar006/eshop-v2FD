import React, { Component } from 'react';
import Style from './ErrorModal.module.css'
import {ClipLoader,BarLoader,PropagateLoader	,MoonLoader,BounceLoader} from "react-spinners";
// import { css } from "@emotion/core";

const  Modal =(props)=>  {

        return (
            <div className={Style.Modalhead} >
                <div className={Style.innerModal}>
                {props.children}

                <button className={Style.okBtn} onClick={props.click}>ok</button>
                <div className={Style.logotext}>
                <h4 className={Style.Logo}>Es</h4><span className={Style.Ltext}>Happy shopping with eshopping.</span>
                </div>
                </div>
            </div>
        );
    }


export default Modal;