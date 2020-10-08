import React from "react";
import { css } from "@emotion/core";
import {ClipLoader,BarLoader,PropagateLoader	,MoonLoader,BounceLoader} from "react-spinners";
import Style from './spinner.module.css'
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
const Spinner = (props)=> {



  if(props.type=="auth"){
    return (
      <div className={Style.loading}>
        <BarLoader	
          css={override}
          width={1000}
          size={15}
          height={3}
          color={"red"}
          loading={props.loading}
        />
      </div>
    )
  }


    return (
      <div className="sweet-loading">
        <BarLoader	
          css={override}
          width={1000}
          height={3}
          color={"skyblue"}
          loading={props.loading}
        />
      </div>
    );
  }


export default  Spinner