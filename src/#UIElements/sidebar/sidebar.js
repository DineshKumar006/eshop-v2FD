import React, { Component } from 'react';
import Style from './sidebar.module.css'
const Sidebar =(props)=>  {
        return (
            <div className={Style.sidebarHead}>
                <div className={Style.closeBtn}>
                <p onClick={props.click}>X</p>
                </div>

                <div className={Style.logotext}>
                <h4 className={Style.Logo}>Es</h4><span className={Style.Ltext}>Happy shopping with eshopping.</span>
                </div>

                <div className={Style.sidebarinner}>
                    
                {props.children}
                </div>
            </div>
        );
    }


export default Sidebar;