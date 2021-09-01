import React, { useState, useEffect } from 'react'
import '../Components-Styling/Navbar.css'

function Navbar() {

    const [show, handleShow] = useState(false);

    useEffect(() => {

        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else {
                handleShow(false)
            }
        });

        return () => {
            window.removeEventListener("scroll", {});
        }
    }, [handleShow])
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className='nav__logo'
                src="Images/Netflix_logo.png"
                alt="Netflix Logo"
            />


            <img
                className='avatar__logo'
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                alt="Avatar Logo"
            />
        </div>
    )
}

export default Navbar
