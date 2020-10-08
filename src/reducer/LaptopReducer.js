const initialState={
    laptops:[],
   
    error:null
}

const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_LAPTOPS_ITEMS":
            return{
                ...oldstate,
                laptops:oldstate.laptops.concat(actions.payload),
                error:null
            }

            default :
            return oldstate
    }
}

export default Reducer