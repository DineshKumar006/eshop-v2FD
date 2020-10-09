import React, { useRef,useContext, useState, useEffect } from 'react';
import Style from './profile.module.css'
import {stateContext} from '../../contextApi/contextApi'
import Axios from 'axios';
import {Trash, Flag} from 'react-bootstrap-icons'
import ProfileModal from './profileModal/profileModal'
import ErrorModal from '../../../#UIElements/errorModal/errorModal'
const Profile =()=>  {
 const fileRef=useRef()
 const mycontext=useContext(stateContext)
 const [image,setImage]=useState(null)
 const [imgFlag,setImgFlag]=useState(false)
 const [previewUrl,setpreviewUrl]=useState('')
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState('')
 const [openModal,setopenModal]=useState(false)




 useEffect(()=>{
    if(image==null){
        return
    }
   let fileReader=new FileReader()
   fileReader.onload=()=>{
       setpreviewUrl(fileReader.result)
   }
   fileReader.readAsDataURL(image)

 },[image])
 const pickHandler=(e)=>{
    fileRef.current.click()
 }




const chnageHandler=(e)=>{
// console.log(e.target)
if(e.target.files && e.target.files.length>0){
    setImage(e.target.files[0])
    setImgFlag(true)
}else{
    setImgFlag(false)
}
}


const deleteHandler=()=>{
    setImgFlag(false)
    setImage(null)
    setpreviewUrl('')

}
console.log(process.env.REACT_APP_BACKEND_URL)
 
const uploadHandler=async()=>{
       setLoading(true)
    try {
        const formData=new FormData()
        formData.append("profile_image", image)
        const response=await Axios.patch(`https://eshop-app-v2.herokuapp.com/api/eshop/users/updateProfile`,formData,{headers:{'Authorization':mycontext.token}})
        console.log(response)
        const {avatarurl,email,token,username,_id}=response.data.user
        mycontext.isLoginHandler(avatarurl,_id,username,email,token)
        setpreviewUrl('')
        setImage(null)
        setImgFlag(false)
        setLoading(false)
        setError('')
    } catch (error) {
        setLoading(false)
        setError(error.response.data.message)
        console.log(error.response)
    }
        
}

// console.log(!!previewUrl)
// console.log(mycontext.profileImage)

const openmodalHanlder=()=>{
    setopenModal(!openModal)
    setError("")
}
        return (
            <div className={Style.profile}>
                
                {(error) &&
                <ErrorModal click={openmodalHanlder}>
                    {error}
                </ErrorModal>}
              
                <h1>Hi,{mycontext.username}</h1>


                <div className={Style.innerprofile}>

                    <div className={Style.maipulation}>
                        <ul>
                            <li>chnage username</li>
                            <li>chnage email</li>
                            <li>change password</li>

                        </ul>
                        
                    </div>


                <div>
                    <p>username:{mycontext.username}</p>
                    <p>email:{mycontext.email}</p>
                    
                </div>



                    <div className={Style.profilImg}>
                            
                     {loading&&         
                    <div className={Style.fallback}>
                                <ProfileModal loading={loading}/>
                     </div>

                     }
                            <div>

                        <img src={!!previewUrl?previewUrl:mycontext.profileImage} alt="not found"/>
                      
                        </div>

                        <div className={Style.uploadFile}>

                        <input type="file" accept=".png,.jpeg,.jpg" ref={fileRef} onChange={chnageHandler} onClick={(e)=>e.target.value=null}/>

                        </div>



                        <div className={Style.uploadBtn}>
                            
                            <div className={Style.innerBtns}>
                           
                            {(image==null && imgFlag==false) ?<button onClick={pickHandler} className={Style.pickBtn} >Pick</button>:
                            <button onClick={uploadHandler} disabled={loading} className={!loading?Style.enableBtn:Style.disableBtn}>upload</button>
                            }
                             </div>

                             {(image!==null && imgFlag==true  && !loading) &&
                            <div className={Style.delBtn}>
                            {(image!==null && imgFlag==true) && <button onClick={deleteHandler}><Trash size="30" color="red"/></button>}
                            </div>

                             }


                        </div>
                     

                    </div>

                </div>
                
            </div>
        );
    }


export default Profile;