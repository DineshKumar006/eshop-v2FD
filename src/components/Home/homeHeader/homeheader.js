import React, {  useContext,useEffect, useState } from 'react';
import Style from './Homehead.module.css'
import axios from 'axios'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeHead =()=> {
    // const myContext=useContext(stateContext)
  const [headimageUrl,setheadimageUrl]=useState(null)
  const [scrollStyle,setScrollStyle]=useState(false)

    useEffect(()=>{

      
     

        const fetchdata=async()=>{
           const res=await axios.get('/staticData2.json')
           setheadimageUrl(res.data.images)
        }
        fetchdata()
    },[])
   


    const setting={
        dots: true,
        infinite: true,
        speed: 1000,
          
      }
      
        return (

                <div className={Style.imgheadSlider2}>


                {/* <h2>Eshopping special discount on every band </h2> */}
               
                        <div className={Style.imgSlider2}>

                        <Slider {...setting}  className={Style.slider2} swipeToSlide={false} autoplay={true} fade={true} autoplaySpeed={1000} slidesToShow={1} arrows={false} slidesToScroll={1}>
                            
                        {headimageUrl!==null && headimageUrl.map((ele,index)=>{
                                        return(<div className={Style.immerImage2} key={index}>
                                            <img src={ele.imgurl} />
                                            </div>)
                                    })   
                        }
                        </Slider>
                        </div>
                </div>

 

                 
        );
    }


export default HomeHead;