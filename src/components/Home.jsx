import React , {Image}from 'react';
import "./New.css"
import Logo from "./images/Log.png"
// import {Routes, Route, useNavigate} from 'react-router-dom'
import { useLocation , Link } from 'react-router-dom';
function Home() {

    // const navigate = useNavigate();

    // const navigateHome = () => {
    //     // 👇️ navigate to /
    //     navigate('/');
    //   };
    const location = useLocation();


    document.addEventListener('DOMContentLoaded', function (event) {

        var dataText = [
             "Swap TRCT-USDT token.",
            "Trustless- Fully decentralised.",
            "Lower Transaction fee",
            "Instant Fund transafer to youe wallet",
            "Select BNB smart chain mainnet in Metamask"


       ];

        // type one text in the typwriter
        // keeps calling itself until the text is finished
        function typeWriter(text, i, fnCallback) {
            // chekc if text isn't finished yet
            if (i < (text.length)) {
                // add next character to h1
                document.getElementById("text").innerHTML = text.substring(0, i + 1) +
                    '<span aria-hidden="true" class="banner_text_w3ls"></span>';

                // wait for a while and call this function again for next character
                setTimeout(function () {
                    typeWriter(text, i + 1, fnCallback)
                }, 50);
            }
            // text finished, call callback if there is a callback function
            else if (typeof fnCallback == 'function') {
                // call callback after timeout
                setTimeout(fnCallback, 1000);
            }
        }
        // start a typewriter animation for a text in the dataText array
        function StartTextAnimation(i) {
            // check if dataText[i] exists
            if (i < 5) {
                // text exists! start typewriter animation
                typeWriter(dataText[i], 0, function () {
                    // after callback (and whole text has been animated), start next text
                    StartTextAnimation(i + 1);
                });
            }
        }
        // start the text animation
        StartTextAnimation(0);
    });


    return (
        <div>
            
            {/* <header >
       
        <div style={{backgroundColor: "lightblue"}} class="logo_wthree">
            <a href="index.html">
                <i  class="fab fa-node-js"></i>
               
            </a>
        </div>
        
    
    </header> */}

    
  
    <section class="slide-wrapper">

        <div class="agile_banner bg1">
            <div class="layer">

            {/* <h1 style={{backgroundImage: "url(" + Logo + ")" ,  cursor:'pointer', backgroundRepeat: 'no-repeat' ,  backgroundPosition: 'center', 
                }} > hi</h1> */}
                <div class="container">
                    <div class="banner_text_wthree
                        <div class="d-flex>
                            <h1>Welcome to Trust Coin Swap </h1>
                            <h2>swap TRCT token</h2>                                                  
                        </div>
                        <div id="text" class="banner_text_w3ls my-md-5 my-3"></div>
                        <ul class="list-inline bnr_list_w3">
                            <li class="list-inline-item">
                                <Link  to="/App" class="btn  text-white  scroll" href="portfolio.html">Connect wallet </Link>
                                {/* <Link to="/">Home</Link> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
        
    </section>
    
    <footer>
        <div class="cpy-right text-center py-4">
            <p class="text-white">This is a decentralized swap application | Design by
                <a href="https://wa.me/919211271038"> DK Gautam.</a>
            </p>
        </div>
    </footer>
        </div>
    );
}

export default Home;
