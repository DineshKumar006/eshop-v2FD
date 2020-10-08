import React, { Component, useContext,useEffect, useState,Suspense } from 'react';
 import Category from '../category/category'
import Style from './Home.module.css'
import axios from 'axios'
import Slider from "react-slick";
import {useDispatch,useSelector} from 'react-redux'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from '../../#UIElements/Spinner/spinner'
import {stateContext} from '../contextApi/contextApi'
import ShopByBrand from '../#shopBybrand/ShopBybrand'
import ShopByCategory from '../#shopBycategory/ShopBycategory'
import BrandData from '../#getshopBybrand_data/BrandData'
import MobileData from '../getGadgets/mobiles'
import LaptopData from '../getGadgets/Laptops'
import Axios from 'axios';
const Paginate =React.lazy(()=>import('../paginateData/paginate'))

const Home =()=> {
    const dispatch=useDispatch()

    const myContext=useContext(stateContext)
     const state=useSelector(state=>state.menData)
 const brandState=useSelector(state=>state.brandData)
  const [imageUrl,setimageUrl]=useState(null)
  const [headimageUrl,setheadimageUrl]=useState(null)
  const [loading,setLoading]=useState(state.loading)
const   [pageno,Setpageno]=useState(1)

    // console.log(myContext)
    useEffect(()=>{
        const fetchdata=async()=>{
           const res=await axios.get('/staticData2.json')
           setheadimageUrl(res.data.images)
        }
        fetchdata()
    },[])
   
    useEffect(()=>{

      
        const fetchdata=async()=>{
           const res=await axios.get('/staticData.json')
           setimageUrl(res.data.images)
        }
        fetchdata()
    },[])

  
useEffect(()=>{

    if(myContext.isLogin && myContext.token){
    const fetchdata=async()=>{
        try {
            const response=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eshop/users/getuserCartItemid`,{headers:{'Authorization':myContext.token}})
            // console.log(response.data)
            dispatch({type:"ADD_ITEM_ID",eleids:response.data.Item,Arrayflag:true})

        } catch (error) {
            console.log(error.response)

        }
    }
    fetchdata()
}
},[])

    const PageHandler=(e)=>{
        Setpageno(parseInt(e.target.value))
        document.documentElement.scrollTop=51
    }
    const setting={
        dots: true,
        infinite: true,
        speed: 1000,
          
      }
      

let btn=[]
for(let i=0;i<myContext.totalPage;i++){
       btn.push(<button onClick={PageHandler} value={parseInt(i+1)}>{i+1}</button>)
}
 
      


        return (
            <div  id='Home' className={Style.Homehead}>


                        
                <div>

                        <Category pageno={pageno} />


                        <div className={Style.categoryData}>

                     
                    {
                        state.menStyle!==null&&
                                <div>
                         <Suspense fallback={<h1>loading</h1>}>
                            <Paginate data={state.menStyle.data} loading={loading} PageHandler={PageHandler} />
                            </Suspense>
                            </div>

                        }

                        </div>
                </div>


                   {imageUrl!==null?
               
               
                <div>


        


          

             <div className={Style.imgSliderHead}>

                        <ShopByBrand  totalPage={myContext.shopBytotalpage}   />



                    <div className={Style.imgSlider}>

                    <Slider {...setting} className={Style.slider} swipeToSlide={false} autoplay={true} fade={true} autoplaySpeed={2000} slidesToShow={1} arrows={false} slidesToScroll={1}>
                         
                    {imageUrl!==null && imageUrl.map((ele,index)=>{
                                    return(<div className={Style.immerImage} key={index}>
                                         <img src={ele.imgurl} />
                                         </div>)
                                }) 
                              
                    }
                    </Slider>

                    </div>


                    <ShopByCategory/>

                    
            </div>

                   

                     <div className={Style.brandUi}>

                         {/* <button>1</button> */}

                    <BrandData data={brandState.brandData} loading={myContext.loading} totalPage={myContext.shopBytotalpage} brandname={brandState.brandName}/>


                     </div>       

         </div>


                    


                     : <Spinner/>}




                     <div>
                         <MobileData/>
                     </div>


                     <div>
                         <LaptopData/>
                     </div>
            </div>
        );
    }


export default Home;