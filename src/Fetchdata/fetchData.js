import {useCallback, useState,useContext} from 'react'
// import {stateContext} from '../../components/contextApi/contextApi'
import {stateContext} from '../components/contextApi/contextApi'
import {useDispatch} from 'react-redux'
import Axios from 'axios'
export const FetchData=async(url)=>{
    const state=useContext(stateContext)
    const dispatch=useDispatch()

            try {
                const res=await Axios.get(url)
                state.LodingHandler(false)
                dispatch({type:"ADD_BRAND",payload:"hello"})
                return res.data   
            } catch (error) {
                dispatch({type:"ERROR_OCCUR",errorPayload:error.response.data.message,error:true})
                return error.response.data.message?error.response.data.message:"some thing went wrong"
                
            }

}