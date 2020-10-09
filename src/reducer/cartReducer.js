const initialState={
    Data:[],
    eleID:[],
    favID:[]

    
}


const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_ITEM_IN_CART":

            return{
                ...oldstate,
                Data:actions.arrayFlag===true?actions.payload:oldstate.Data.concat(actions.payload),
               
            }

        case "REMOVE_ITEM_FROM_CART":
            console.log(actions.id)


            const reqdata2=oldstate.Data.filter(ele=>{
                if(ele.itemid===actions.id){
                    return ele.itemid!==actions.id
                }else{
                    return ele._id!==actions.id 
                }
               
            })


            return{
                ...oldstate,
                Data:reqdata2
            }
        case "REMOVE_ALL_ITEM_FROM_CART":
                return{
                    ...oldstate,
                    Data:[]
                }    
        case "ADD_ITEM_ID":
            return{
                ...oldstate,
                eleID:actions.Arrayflag==true?actions.eleids:oldstate.eleID.concat(actions.eleid)
            }    
        case "REMOVE_ITEM_ID":
            return{
                ...oldstate,

                eleID:oldstate.eleID.filter(ele=>ele!==actions.eleid)
            }     
        case "ADD_FAV_ID":
                return{
                    ...oldstate,
                    eleID:oldstate.favID.concat(actions.favid)
                }      
        case "ADD_MORE_ITEM_INCART"  :
            return{
                ...oldstate,
                Data:oldstate.Data.concat(actions.payload)
            }        

            default :
            return oldstate
    }
}

export default Reducer