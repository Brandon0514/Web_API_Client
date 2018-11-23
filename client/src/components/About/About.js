import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <p>
          <img alt="My Logo" src={'favicon.ico.png'} className="aboutLogo" />
        </p>
        <h2 style={{fontSize:'5vw'}} className="Name">The Fox TV Series</h2>
        <hr className="style4"/>
        <p className="Discrip">
          Check out the most popular TV shows on The Fox TV Series. This Website
          Developed by Brandon.
        </p>
      </div>
    );
  }
}

export default About;
