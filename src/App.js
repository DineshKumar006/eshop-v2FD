import React,{ useState, useEffect, useCallback} from 'react';
import Style from './App.module.css';
import MainApp from './components/mainApp/MainApp';
import {stateContext} from './components/contextApi/contextApi'

import {useHistory} from 'react-router-dom'

let logoutTimer
function App() {

const history =useHistory()
// const d=new Date(new Date().getTime() +1000 *60 *60)
//   console.log(d)
  useEffect(()=>{
   history.push('/')
  },[])

  const [scrollFlag,setScrollFlag]=useState(true)
const  [presentScroll,setpresentScroll]=useState(0)
const [optionsCatagoryflag,setoptionsCatagoryFlag]=useState(false)
 
 

  const [searchFlag,setSearchFlag]=useState(false)
  const [loading,setLoading]=useState(false)
  const [totalPage,setTotalPage]=useState(0)
  const [shopBytotalpage,setshopBytotalpage]=useState(0)
  const [isLogin,setisLogin]=useState(false);
  const [userId,setUserId]=useState(null);
  const [username,setUsername]=useState(null);
  const [email,setEmail]=useState(null)
  const [token,setToken]=useState(null)
  const [expireTime,setExpireTime]=useState(null)
  const [profilePic,setProfilePic]=useState("")
  const [totalOrders,setTotalOrders]=useState(0)

  const LodingHandler=(flag)=>{
      setLoading(flag)
  }
const TotalPageHandler=(page)=>{
      setTotalPage(page)
}
const scrollHandler=(scroll)=>{
    setpresentScroll(scroll)
}

const optionsCatagoryHandler=(flag)=>{
  setoptionsCatagoryFlag(flag)
}

const shopBytotalpageHandler=(totalpage)=>{
  setshopBytotalpage(totalpage)
}


const searchFlagHandler=(flag)=>{
  setSearchFlag(flag)
}

const isLoginHandler=useCallback((avatarurl,userid,username,email,token,totalorders,Expiretimer)=>{
   console.log(totalorders)
  const Expire_Time= Expiretimer || new Date(new Date().getTime()+ 1000 *60 *60)
  setExpireTime(Expire_Time)
  setisLogin(!!token)
  setUserId(userid)
  setUsername(username)
  setEmail(email)
  setToken(`Bearer ${token}`)
  setProfilePic(avatarurl)
  setTotalOrders(totalorders)

  localStorage.setItem("userdata",JSON.stringify({
    username,
    email,
    token:`Bearer ${token}`,
    userid,
    expireTime:Expire_Time,
    avatarurl,
    totalorders
  }))

})


useEffect(()=>{
  const userdata=JSON.parse(localStorage.getItem('userdata'))
  if(userdata && userdata.token && new Date(userdata.expireTime) > new Date().getTime() ){
      isLoginHandler(
         userdata.avatarurl,
        userdata.userid,
        userdata.username,
        userdata.email,
        userdata.token.replace('Bearer ',''),
        userdata.totalorders,
        userdata.expireTime,    
       
        )
  }
},[])






const LogoutHandler=()=>{
  setisLogin(false)
  setUserId(null)
  setUsername(null)
  setEmail(null)
  setToken(null)
  setTotalOrders(0)
  localStorage.clear()
}

useEffect(()=>{

  if(token && expireTime){
    let remainingTime=expireTime.getTime() - new Date().getTime()
    logoutTimer=setTimeout(LogoutHandler,remainingTime);
  }else{
    clearTimeout(logoutTimer)
  }
},[])

  return (
    <div className={Style.App}>
      <stateContext.Provider value={{loading:loading,
      presentscroll:presentScroll,
        totalPage:totalPage,
        TotalPageHandler:TotalPageHandler,
        presentscrollHandler:scrollHandler  ,

        LodingHandler:LodingHandler,

        optionsCatagoryFlag:optionsCatagoryflag,
        optionsCatagoryHandler:optionsCatagoryHandler ,
        shopBytotalpageHandler:shopBytotalpageHandler,
        shopBytotalpage:shopBytotalpage,


        isLogin:isLogin,
        isLoginHandler:isLoginHandler,
        userId:userId,
        username:username,
        email:email,
        token:token,
        LogoutHandler:LogoutHandler,

        profileImage:profilePic,

        totalorders:totalOrders,

        searchFlagHandler:searchFlagHandler,
        searchFlag:searchFlag

        
    
        
        }}  >

        <MainApp/>

        </stateContext.Provider>
    </div>
  );
}

export default App;
