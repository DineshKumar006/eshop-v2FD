import React, { Component, useEffect, useState } from 'react';
import {useParams,useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Axios from 'axios'
import Spinner from '../../#UIElements/Spinner/spinner';
import Style from './searchData.module.css'
import Card from '../../#UIElements/card/Card2';
const SearchData =()=>  {

    const params=useParams()
    const history=useHistory()
    const [loading,setLoading]=useState(false)
    const [pageno,setPageno]=useState(2)
    const [error,setError]=useState('')

const dispatch=useDispatch()
const searchState=useSelector(state=>state.searchData)

  useEffect(()=>{
    if(params.value===''){
        return history.push('/')
    }
    const fetchData=async()=>{
        setLoading(true)
        try {
            const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/bulk/getSearchdata/${params.value}?pageno=1`) 
            console.log(response.data)
            dispatch({type:"ADD_SEARCH_ITEMS",payload:response.data.result})
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.response.data)
            setError(error.response.data.message)
        }
    }
    fetchData()
  },[params.value])


  console.log(searchState)

        return (
            <div className={Style.Head}>
                {loading&&
                <Spinner/>
              }

              {searchState.data.length>0&&
                  <div className={Style.outersearchItem}>

                    {searchState.data.map(ele=>{
                        return <div key={ele._id}>
                            <Card>
                            <img src={ele.secure_url} alt="Not found" width="250px" height="280px"/>
                            </Card>
                            </div>
                    })}
                    </div>
              }

            </div>
        );
    }


export default SearchData;