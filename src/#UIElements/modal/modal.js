import React, { Component } from 'react';
import Style from './Modal.module.css'
import {ClipLoader,BarLoader,PropagateLoader	,MoonLoader,BounceLoader} from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const  Modal =(props)=>  {

        return (
            <div className={Style.Modalhead} >
                <div className={Style.innerModal}>
                {props.children}

                    <ClipLoader	
                    width={400}
                    size={50}
                    height={3}
                    color={"white"}
                    loading={props.loading}
                    />

                <div className={Style.logotext}>
                <h4 className={Style.Logo}>Es</h4><span className={Style.Ltext}>Happy shopping with eshopping.</span>
                </div>
                </div>
            </div>
        );
    }


export default Modal;