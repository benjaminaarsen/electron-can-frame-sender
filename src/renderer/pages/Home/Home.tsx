import Container from 'react-bootstrap/esm/Container';
import React from 'react';

function Home() {
  return (
    <div className="Home">
      <Container className="text-center absolute-center text-secondary">
        <h3>There is currently no data to show.</h3>
        <p>
          Select adapter: Click &quot;Select device&quot; menu <br />
          Select DBC file: Click &quot;Open DBC File&quot; button
        </p>
      </Container>
    </div>
  );
}

export default Home;
