const initialState={
    menStyle:null,
    loading:false,
    error:null
}

const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_ITEMS":
            return{
                ...oldstate,
                menStyle:actions.payload,
                loading:actions.loading,
                error:null
            }

            default :
            return oldstate
    }
}

export default Reducer