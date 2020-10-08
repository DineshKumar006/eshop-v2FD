const initialState={
    data:[],
    error:null
}

const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_SEARCH_ITEMS":
            return{
                ...oldstate,
                data:actions.payload,
                error:null
            }

            case "ADD_MORE_SEARCH_ITEMS":
                return{
                    ...oldstate,
                    mobiles:oldstate.data.concat(actions.payload),
                    error:null
                }

            default :
            return oldstate
    }
}

export default Reducer