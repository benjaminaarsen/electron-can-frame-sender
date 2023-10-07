import Container from 'react-bootstrap/esm/Container';

function Home() {
  return (
    <div className="Home">
      <Container className="text-center absolute-center text-secondary">
        <h3>There is currently no data to show.</h3>
        <p>
          Select adapter: Click &quot;Adapter&quot; dropdown menu <br />
          Select DBC file: Click &quot;File&quot; button
        </p>
      </Container>
    </div>
  );
}

export default Home;
