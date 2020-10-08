import React from 'react';
import Style from './card.module.css';

const Card =(props)=>  {

        return (
            <div className={Style.card}>
               
                    {props.children}
                
            </div>
        );
    
}

export default Card;