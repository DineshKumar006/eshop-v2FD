import React, { Component,Suspense } from 'react';
import Modal from '../../#UIElements/modal/modal'

const NavRoute=React.lazy(()=>import('../navigation/navrouter/NavRoute'))
class MainApp extends Component {
    render() {
        return (
            <div>

                <Suspense fallback={<Modal> <p>Validating...</p></Modal>}>
                <NavRoute/>  
                </Suspense>
            </div>
        );
    }
}

export default MainApp;