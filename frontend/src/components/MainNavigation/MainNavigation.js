import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'

import MainHeader from '../MainHeader/MainHeader.js'
import SideDrawer from '../SideDrawer/SideDrawer.js'
import BackDrop from '../BackDrop/BackDrop.js'
import './MainNavigation.css'

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    
    const openDrawer = () => {
        setDrawerIsOpen(!drawerIsOpen)
    }
    const closeDrawer = () => {
        setDrawerIsOpen(false)
    }

    return (
        <React.Fragment>        
            {drawerIsOpen && <BackDrop onClick={closeDrawer}/>}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <h1 className='white'>:D</h1>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className="main-navigation__title">
                    <Link to='/'>Your Tasks</Link>
                </h1>
                <nav>
                    ...
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation