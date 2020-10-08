const initialState={
    mobiles:[],
   
    error:null
}

const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_MOBILE_ITEMS":
            return{
                ...oldstate,
                mobiles:oldstate.mobiles.concat(actions.payload),
                error:null
            }

            default :
            return oldstate
    }
}

export default Reducer