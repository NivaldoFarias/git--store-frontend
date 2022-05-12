import { useState } from 'react';
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

import logo from './../assets/git--store-logo.png';

export default function Home() {
    const [sideBar, setSideBar] = useState(false);

    function toggleSideBar() {
        setSideBar(!sideBar);
    }

    const sideBarContent = (
        <>

        </>
    )

    return (
        <main id="home-page">
            <header>
                <img src={logo} alt="git --store" />
                <Typewriter onInit={(typewriter) => {
                    typewriter
                        .typeString("git --store")
                        .pauseFor(3000)
                        .start()
                }} />
            </header>
            <div className="banner"></div>
            <nav>
                <div>
                    <div className="nav-menu">
                        <FontAwesomeIcon onClick={toggleSideBar} icon={sideBar ? faXmark : faBars} className="menu" />
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div>
                    <div className="nav-item">
                        nav-item
                    </div>
                </div>
                <aside className={sideBar ? undefined : 'hidden-aside'}>
                    <div className='sidebar-item'>
                        Carrinho
                    </div>
                    <div className='sidebar-item'>
                        Historico
                    </div>
                    <div className='sidebar-item'>
                        Checkout
                    </div>
                </aside>
            </nav>


        </main>
    )
}