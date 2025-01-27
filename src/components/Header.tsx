import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import LogoSVG from '../assets/images/logo/MH.svg'
import GitHubLogo from '../assets/images/icons/socials/github.svg'
import LinkedInLogo from '../assets/images/icons/socials/linkedin-square.svg'
import StackOverflowLogo from '../assets/images/icons/socials/stack-overflow.svg'
import CodePenLogo from '../assets/images/icons/socials/codepen.svg'

const headerLinks = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "About Me",
        path: "/aboutme"
    },
    {
        name: "Portfolio",
        path: "/portfolio"
    }
]


const socials = [
    {
        name: "GitHub",
        icon: GitHubLogo,
        link: "https://github.com/kaillr"
    },
    {
        name: "LinkedIn",
        icon: LinkedInLogo,
        link: "https://www.linkedin.com/in/mikael-holand-5a181b329/"
    },
    {
        name: "Stack Overflow",
        icon: StackOverflowLogo,
        link: "https://stackoverflow.com/"
    },
    {
        name: "CodePen",
        icon: CodePenLogo,
        link: "https://codepen.io/kailler"
    },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0); // Set to true if not at the top
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navHeader = headerLinks.map((item) => (
        <li key={item.name} className="nav-item">
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
                {item.name}
            </NavLink>
        </li>
    ));

    const navSocials = socials.map((social, index) => (
        <React.Fragment key={social.name}>
            <a href={social.link} target='_blank' rel="noopener noreferrer">
                <img src={social.icon} alt={social.name} className="invert" />
            </a>
            {index < socials.length - 1 && <div className="vertical-separator"></div>}
        </React.Fragment>
    ));

    return (
        <header>
            <div
                id="headerSolid"
                className={`headerSolid ${isScrolled ? 'show' : ''}`}
            ></div>

            <div className="navbar">
                <div className="nav-branding">
                    <Link to="/"><img src={LogoSVG} className="logo-img" /></Link>
                </div>

                <ul className={`nav-menu ${isHamburgerOpen ? 'active' : ''}`}>
                    {navHeader}

                    <li className="nav-socials">
                        {navSocials}
                    </li>
                </ul>

                {/* Hamburger menu */}
                <div
                    className={`hamburger ${isHamburgerOpen ? 'active' : ''}`}
                    onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </header>
    );
}
