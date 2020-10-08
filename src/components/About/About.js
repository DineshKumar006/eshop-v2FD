import React, { Component } from 'react';
import Style from './about.module.css'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import { pink, blue } from '@material-ui/core/colors';

class About extends Component {
    render() {
        return (
            <div id="About"  className={Style.head}>
               <h2>Eshopping Pvt Ltd.</h2>
               <h4>Hyderabad, sector 007</h4>

            <div className={Style.icons}>
                <span>
                <FacebookIcon style={{ fontSize: 30 ,color:blue[500]}} />

                </span>
           
           <span>
           <InstagramIcon style={{ fontSize: 30 ,color:pink[500]}}/>

           </span>
            <span>
              <TwitterIcon style={{ fontSize: 30 ,color:blue[300]}} />
              </span>
            </div>
            
            </div>
        );
    }
}

export default About;