const initialState={
    brandData:[],
    brandName:null,
    error:false,
    errorMessage:null
    
}

const Reducer=(oldstate=initialState,actions)=>{
    switch(actions.type){
        case "ADD_BRAND":
                // console.log(actions.payload)

            return{
                ...oldstate,
                brandData:actions.payload,
                brandName:actions.brandname,
                error:false,
                errorMessage:null
            }

        case "ERROR_OCCUR":
            return{
                brandData:[],
                error:true,
                errorMessage:actions.errorPayload
            }    

            default :
            return oldstate
    }
}

export default Reducer