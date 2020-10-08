const initialState={
    order:[],
    address:[],
    quantity:0,
    error:null
}

const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_ORDER_ITEMS":
            return{
                ...oldstate,
                order:actions.payload,
                address:actions.address,
                quantity:actions.quantity,
                error:null
            }
            default :
            return oldstate
    }
}

export default Reducer