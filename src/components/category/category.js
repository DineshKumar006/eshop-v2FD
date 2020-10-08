import React, { Component, useState, useContext,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Style from './Category.module.css'
import Axios from 'axios';
import Spinner from '../../#UIElements/Spinner/spinner'
import {useHttpHook} from '../../hooks/httpHook/httpHook'
import {stateContext} from '../contextApi/contextApi'

const Category =(props)=>  {
// const state=useSelector(state=>state.menData)
const mycontext=useContext(stateContext)
const dispatch=useDispatch()
const [categoryType,setCategoryType]=useState("Mens style")
const [categoryFlag,setCategoryFlag]=useState(false)
const [loading,setLoading]=useState(false)
const [error,setError]=useState(null)

const onchangeHandler=async(e)=>{
    setCategoryFlag(true)
    let url;
    const fetchData=async()=>{
        setLoading(true)
        mycontext.LodingHandler(true)
            try {
                setCategoryType(e.target.value)
                if(e.target.value=="men_tshirts"){
                    url=`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getMenTShirts?pageno=${1}`
                }else if(e.target.value=="men_shirts"){
                    url=`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getMenShirts?pageno=${1}`
                }else if(e.target.value=="men_jeans"){
                    url=`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getMenjeans?pageno=${1}`
                }
                const res=await Axios.get(url)
                setError(null)
                setLoading(false)
                dispatch({type:"ADD_ITEMS",payload:res.data.result,loading:false}) 
                mycontext.LodingHandler(false)
                mycontext.optionsCatagoryHandler(true)
                mycontext.TotalPageHandler(res.data.result.totalpages)
  
            } catch (error) {
                console.log(error.response)
                // setError(error.response.message)
            }
    }
fetchData()

}






useEffect(()=>{
            if(categoryFlag){
        let url
       const fetchData=async()=>{
        setLoading(true)
        mycontext.LodingHandler(true)

            try {

                console.log(props.pageno)
                if(categoryType=="men_tshirts"){
                    url=`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getMenTShirts?pageno=${props.pageno}`
                }else if(categoryType=="men_shirts"){
                    url=`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getMenShirts?pageno=${props.pageno}`
                }else if(categoryType=="men_jeans"){
                    url=`${process.env.REACT_APP_BACKEND_URL}/api/eshop/getMenjeans?pageno=${props.pageno}`
                }
                const res=await Axios.get(url)
                console.log(res.data.result)
                setError(null)
                setLoading(false)
                dispatch({type:"ADD_ITEMS",payload:res.data.result,loading:false})   
                mycontext.LodingHandler(false)

            } catch (error) {
                setError(error.response.message)
            }
    }
fetchData()
            
}

},[props.pageno])





        return (
            <React.Fragment>

           
            <div className={Style.selectItem}>

                <div className={Style.select}>
                    <label >Mens style</label>

                    <select id="Men" onChange={onchangeHandler} value={categoryType}>
                        <option value="Men_style">Mens style</option>
                        <option value="men_tshirts">Tshirts</option>
                        <option value="men_jeans">Jeans</option>
                        <option value="men_shirts">Shirts</option>
                        <option value="men_formals">Formals</option>
                        <option value="men_casual">Casual</option>
                        

                    </select>
                </div>

                <div className={Style.select}>
                <label>Womens style</label>

                    <select>
                        <option>Women style</option>
                        <option>Tshirts</option>
                        <option>Jeans</option>
                        <option>Shirts</option>
                        <option>Formal</option>
                        <option>casual</option>

                    </select>
                </div>

                <div className={Style.select}>
                <label>Kids style</label>
                    <select>
                        <option>Kids style</option>
                        <option>Tshirts</option>
                        <option>Jeans</option>
                        <option>Shirts</option>
                        <option>Formal</option>
                        <option>Casuel</option>

                    </select>
                </div>

         

            </div>
            
            <div className={Style.spinner}>
            <Spinner loading={loading}/>
            </div>



            
                
            </React.Fragment>
        );
    }


export default Category;