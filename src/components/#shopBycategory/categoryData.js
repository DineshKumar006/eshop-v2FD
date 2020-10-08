import React, { Component ,useContext} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Card from '../../#UIElements/card/Card'
import {stateContext} from '../contextApi/contextApi'
import Style from './branddData.module.css'
import FallBack from '../../#UIElements/fallBack/Fallback'
import Spinner from '../../#UIElements/Spinner/spinner';
const BrandData =(props)=>  {
    const mycontext=useContext(stateContext)

    const brandState=useSelector(state=>state.brandData)
        return (
            <div id="shop_by_brand">
                <div className={Style.Spinner}>
                {mycontext.loading&&<Spinner/>}
                </div>

                {props.data.length>0&&

              <div className={Style.head}>
                  <div className={Style.text}>
                      <p className={Style.logo}>Es</p>
              <p className={Style.innertext}>Showing result {props.brandname}</p>
              </div>
                {mycontext.loading&& 
                <div className={Style.FallBack}>
               <FallBack loading={mycontext.loading}/> 
                </div>
                 }

            <div className={Style.contentHead}>
               
                {props.data.length>0&&props.data.map(ele=>{
                    return <div key={ele._id}  className={Style.contentinner}>
                        <Card>
                            <img src={ele.secure_url} alt="Not found" width="250px" height="280px"/>
                       </Card>
                        </div>
                })}
            </div>
                



            </div>
             
            }
            </div>
        );
    }


export default BrandData;


