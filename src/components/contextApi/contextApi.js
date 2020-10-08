import {createContext} from 'react';



export const stateContext=createContext({
    loading:false,
    totalPage:0,
    presentscroll:0,
    optionsCatagoryFlag:false,
    shopBytotalpage:0,

    isLogin:false,

    token:null,
    userId:null,
    email:null,
    username:null,

    profileImage:"",
    totalorders:0,
    searchFlag:false,

    searchFlagHandler:()=>{},

    isLoginHandler:()=>{},
    LodingHandler:()=>{},
    LogoutHandler:()=>{},
    shopBytotalpageHandler:()=>{},
    presentscrollHandler:()=>{},
    TotalPageHandler:()=>{},
    optionsCatagoryHandler:()=>{}

})