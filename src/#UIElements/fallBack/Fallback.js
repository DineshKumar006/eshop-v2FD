import React, { Component } from 'react';
import Style from './fallback.module.css'
import Loader from 'react-loader-spinner'

const Fallback =(props)=>  {

if(props.type==="fullpage"){
    return (
        <div>
              <div className={Style.FallbackHeadFull}>
                <div className={Style.FallbackFull}>
                            <Loader
                            type="Bars"
                            color="red"
                            height={70}
                            width={100}
                            timeout={5000} //3 secs
                    
                        />
                </div>
            </div>
        </div>
    )
}

if(props.type==="plain"){
    return (
        <div onClick={props.click}>
              <div className={Style.FallbackHeadplainFull}>
               
            </div>
        </div>
    )
}


        return (
            <div className={Style.FallbackHead}>
                <div className={Style.Fallback}>

                            <Loader
                            type="Circles"
                            color="red"
                            height={70}
                            width={70}
                            timeout={5000} //3 secs
                    
                        />
                </div>
            </div>
        );
    }


export default Fallback;