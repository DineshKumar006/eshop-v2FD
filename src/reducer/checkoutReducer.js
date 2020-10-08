const initialState={
    checkout:[],
   
    error:null
}

const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_CHECKOUT_ITEMS":
            return{
                ...oldstate,
                checkout:actions.payload,
                error:null
            }

            default :
            return oldstate
    }
}

export default Reducer