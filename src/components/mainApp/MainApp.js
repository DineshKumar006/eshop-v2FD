import React, { Component,Suspense } from 'react';

const NavRoute=React.lazy(()=>import('../navigation/navrouter/NavRoute'))
class MainApp extends Component {
    render() {
        return (
            <div>


                <Suspense fallback={'Loading'}>
                <NavRoute/>  
                </Suspense>
            
               
            </div>
        );
    }
}

export default MainApp;