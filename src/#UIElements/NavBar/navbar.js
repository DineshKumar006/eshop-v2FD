import React, {  } from 'react';
import Style from './navbar.module.css'


const navbar =(props)=>  {

        return (
            <div  className={Style.navhead}>

                <div className={Style.innernavhead}>

                        
                        {props.children}
                      
                </div>
            </div>
           
        );
    }


export default navbar;