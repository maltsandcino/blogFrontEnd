import { useContext, useState } from 'react';
import "./Home.css";

function Home() {


  return (
  <>
      <div className="home-content">
        <div className="welcome">
        Hey, I'm Tom.
        </div>
        <div className="welcome-text">
        Learn more about me by visiting the pages linked above.
        </div>
        <div className="link-holder">
          <a href="https://www.github.com/maltsandcino" target="_new"><img src="/github-white.svg" className="icon"></img></a>
          <a href="https://www.linkedin.com/in/tharrisoncs/" target="_new"><img src="/linked-white.svg" className="icon"></img></a>
        </div>
      </div>
  
    </>
  )
}

export default Home;