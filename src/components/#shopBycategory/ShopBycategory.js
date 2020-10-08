import React, { Component } from 'react';
import Style from './Bycategory.module.css'
import {Link} from 'react-slick'

const ShopBycategory =(props)=>  {

        const BrandHandler=(e)=>{
       
            let cc=e.target.id.toLowerCase().trim().split(" ").join('')
            console.dir(cc)
        
        
        }
        return (
          
            <div className={Style.Category}>
            <p>Shop by Category</p>

            {/* <Link activeClass={Style.active} hashSpy={true} to="shop_by_category" spy={true}  smooth={true} offset={-100}  duration={500} onClick={BrandHandler}>

                  <span>Tshirts</span>
                  <span>Shirts</span>
                  <span>Jeans</span>
                  <span>Shorts</span>
                  <span>Joggers</span>
                  <span>Casual</span>
                  <span>Tracks</span>
                  <span>Sports</span>
                  <span>Shoes</span>

            
            </Link> */}




              <div className={Style.Linkhead}>
                  
                  <span>Tshirts</span>
                  <span>Shirts</span>
                  <span>Jeans</span>
                  <span>Shorts</span>
                  <span>Joggers</span>
                  <span>Casual</span>
                  <span>Tracks</span>
                  <span>Sports</span>
                  <span>Shoes</span>


              </div>

          </div> 
        );
    }


export default ShopBycategory;