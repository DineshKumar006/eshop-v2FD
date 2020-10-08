import React, { useState ,useContext} from 'react';
import Style from './search.module.css'
import {Search} from 'react-bootstrap-icons'
import {useHistory} from 'react-router-dom'
import {stateContext} from '../../components/contextApi/contextApi'
const SearchBar =(props)=>  {

    const [text,setText]=useState("")
    const mycontext=useContext(stateContext)
const history=useHistory()
    const SearchFormHandler=async(e)=>{

        e.preventDefault()
        let value=e.target.elements.text.value

        
        if(value===""){
            mycontext.searchFlagHandler(false)
            return  history.push('/')
        }else{
            mycontext.searchFlagHandler(true)
        }

    
        history.push(`/searchData/${value}`)
    }

    const changeHandler=(e)=>{
        setText(e.target.value)
        if(e.target.value===''){
           history.push('/')
        }
    }
    
        return (
            <div className={Style.searchHead}>
                <form onSubmit={SearchFormHandler}>
                <input type="text" placeholder="Enter your search" name="text" value={text} onChange={changeHandler}/>

           <button type="submit" className={Style.searchIcon}>
               <Search size={20} color={'red'}/> 
               </button>
    
                </form>
           
            </div>
        );
    }


export default SearchBar;