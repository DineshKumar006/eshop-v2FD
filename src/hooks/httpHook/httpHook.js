import {useCallback, useState,useContext} from 'react'
import {stateContext} from '../../components/contextApi/contextApi'
import Axios from 'axios';
import {useDispatch} from 'react-redux'

export const useHttpHook=()=>{
    const Mycontextstate=useContext(stateContext)
    const dispatch=useDispatch()

   
    const fetchData=useCallback(async(url,brandname)=>{
        Mycontextstate.LodingHandler(true)
            try {
                const res=await Axios.get(url)
                Mycontextstate.LodingHandler(false)
                dispatch({type:"ADD_BRAND",payload:res.data.result.data,brandname})
                Mycontextstate.shopBytotalpageHandler(res.data.result.totalpages)
                return res.data 
            } catch (error) {
                dispatch({type:"ERROR_OCCUR",errorPayload:error.response.data.message,error:true})
                return error.response.data.message?error.response.data.message:"something went wrong"
            }
      
    },[])

    return [fetchData]
}