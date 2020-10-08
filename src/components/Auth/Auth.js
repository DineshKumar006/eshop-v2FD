import React, { Component, useState,useContext } from 'react';
import Style from './auth.module.css'
import {useFormHook} from '../../hooks/formHook/formHook'
import {useHistory} from 'react-router-dom'
import Axios from 'axios';
import {stateContext} from '../contextApi/contextApi'
import Spinner from '../../#UIElements/Spinner/spinner'
import Modal from '../../#UIElements/modal/modal'
import ErrorModal from '../../#UIElements/errorModal/errorModal'

const Auth =()=>  {
    const mycontext=useContext(stateContext)
    const history=useHistory()
const [isLoginMode,setisLoginMode]=useState(true)
const [error,setError]=useState('')
const [loading,setLoading]=useState(false)
const [singnUpsuccess,setSignupsuccess]=useState("")
const [openModal,setopenModal]=useState(false)


const [formState,inputHandler]=useFormHook({
    username:"",
    email:"",
    password:"",
    phonenumber:""
})
const changeHandler=(e)=>{
    inputHandler(e.target.value,e.target.id)
}


const formsubmitHandler=async(e)=>{
            e.preventDefault()
            const {username,password,email,phonenumber}=formState.inputs
            if(!isLoginMode){
                setLoading(true)
                setError('')
                //signup
                const data={
                    username:username.value,
                    email:email.value,
                    password:password.value,
                    phonenumber:phonenumber.value
                }
                try {
                    const response=await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/users/signup`,data)
                    console.log(response)
                        setSignupsuccess(response.data.status)
                    setTimeout(()=>{
                        setisLoginMode(!isLoginMode)
                        setLoading(false)
                    },1000)
                } catch (error) {
                    console.log(error.response)
                    setError(error.response.data.message)
                    setLoading(false)
                }

            }else{

                setError('')
                setLoading(true)
          
                const Logindata={
                    email:email.value,
                    password:password.value,
                  
                }
                try {
                    const response=await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/users/login`,Logindata)
                    const {avatarurl,email,token,username,_id,totalorders}=await response.data.userData
                    setLoading(false)
                    console.log(totalorders)
                    mycontext.isLoginHandler(avatarurl,_id,username,email,token,totalorders)
                    history.push('/')
                } catch (error) {
                    setLoading(false)
                     setError(error.response.data.message)
                    console.log(error.response)
                }
            }



        }

const loginModeHandler=()=>{
    setError("")
    setisLoginMode(!isLoginMode)
}
const openmodalHanlder=()=>{
    setopenModal(!openModal)
    setError("")
}

        return (
            <div id="Login"  className={Style.Authhead}>

                {(error) &&
                <ErrorModal click={openmodalHanlder}>
                    {error}
                </ErrorModal>}


            {loading&&
                <Modal loading={loading}>

                    <p>Validating...</p>
                    {singnUpsuccess&&
                    <p>{singnUpsuccess}</p>
                    }
                </Modal>
            }
                <div className={Style.form}>


                   <div className={error&&Style.errorModel}>
                {loading? <Spinner type="auth" loading={loading}/>:<p> {error}</p>}
                </div>
                <form onSubmit={formsubmitHandler} className={Style.innerform}>
                      
                 {!isLoginMode &&<input type="text" placeholder="enter username" name="username" id="username" onChange={changeHandler} />}

                <input type="email" placeholder="enter email" name="email" id="email" onChange={changeHandler}/>
                {!isLoginMode &&<input type="number" placeholder="enter phonenumber" name="phonenumber" id="phonenumber" onChange={changeHandler} />}

                <input type="password" placeholder="enter password" name="password" id="password" onChange={changeHandler}/>

                    <button type="submit"  disabled={loading}>{isLoginMode?"Login":"Signup"}</button>

                    <div className={Style.switchBtn}>
                    {isLoginMode?<p onClick={loginModeHandler}>New User Signup</p>:<p onClick={loginModeHandler}>Already have account Login</p>}
                    </div>
                    


                </form>

                </div>
            </div>
        );
    
}

export default Auth;