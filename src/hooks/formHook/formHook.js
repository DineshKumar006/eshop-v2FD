import {useCallback, useState,useContext,useReducer} from 'react'
// import {stateContext} from '../../components/contextApi/contextApi'
// import Axios from 'axios';
// import {useDispatch} from 'react-redux'


const formReducer=(initialstate,actions)=>{
            switch(actions.type){
                    case "ADD_INPUTS":
                        return {
                            ...initialstate,
                        inputs:{
                            ...initialstate.inputs,
                            [actions.inputId]:{
                                value:actions.value
                            }
                        }
                            // inputs:actions.payload
                            
                        }

                    default:return initialstate    
            }
}

export const useFormHook=(initialstateData)=>{


    const [formState,dispatch]=useReducer(formReducer,{
      inputs:initialstateData
    })


    const inputHandler=useCallback((inputvalue,id)=>{
        dispatch({
            type:"ADD_INPUTS",
            value:inputvalue,
            inputId:id
        })

    },[dispatch])


    return [formState,inputHandler]
}