import React, { Component } from 'react';
import Style from './Style.module.css'
import {ClipLoader} from "react-spinners";

const ProfileModal =(props)=> {
        return (
            <div className={Style.model}>
                
                  <ClipLoader	
                    width={400}
                    size={50}
                    height={3}
                    color={"white"}
                    loading={props.loading}
                    />
            </div>
        );
    
}

export default ProfileModal;