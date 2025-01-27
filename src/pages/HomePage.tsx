import { Link } from 'react-router-dom'
import '../assets/styles/HomePage.scss'
import Gradient from '../components/Gradient'

import Header from '../components/Header'

export default function HomePage() {
    // TODO: finish later
    return (
        <>
            <Gradient />
            <Header />
            <main>
                <div className="hero">
                    <div className="heroBG"></div>
                    <div className="content">
                        <div className="heroLeft">
                            <div className="heading">
                                <h1 className="font-extralight">I AM</h1>
                                <h1 className="textGrad font-extrabold">Mikael</h1>
                            </div>
                            <div className="subtitle">
                                <span id="typewriter"></span><span id="cursor">|</span>
                            </div>

                            <div className="buttonContainer">
                                <Link to="/aboutme" className="button1">About Me</Link>
                                <Link to="/portfolio" className="button2">Portfolio</Link>
                            </div>
                        </div>
                        <div className="socials">
                            <a className="github" href="https://github.com/Kaillr" target="_blank">
                                <i className='bx bxl-github'></i>
                            </a>

                            <a className="linkedin" href="https://www.linkedin.com/in/mikael-holand-5a181b329/" target="_blank">
                                <i className='bx bxl-linkedin-square'></i>
                            </a>

                            <a className="stackOverflow" href="https://stackoverflow.com/" target="_blank">
                                <i className='bx bxl-stack-overflow'></i>
                            </a>

                            <a className="codepen" href="https://codepen.io/kailler" target="_blank">
                                <i className='bx bxl-codepen'></i>
                            </a>
                        </div>
                        <div className="arrowContainer">
                            <div className="arrow"></div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}