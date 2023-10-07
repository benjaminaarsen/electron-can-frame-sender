import { useState } from 'react';
import { Button, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { MoonFill, SunFill } from 'react-bootstrap-icons';

type ThemeIconProps = {
  mode: string;
};

function ThemeIcon({ mode }: ThemeIconProps) {
  if (mode === 'light') {
    return <MoonFill />;
  }
  return <SunFill />;
}

function getTheme() {
  if (document.documentElement.getAttribute('data-bs-theme') === null) {
    return 'light';
  }
  return document.documentElement.getAttribute('data-bs-theme') === 'light'
    ? 'light'
    : 'dark';
}

function Nav() {
  const [theme, setTheme] = useState(getTheme());
  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container className="d-flex justify-content-start">
        <Navbar.Brand>Frame Sender</Navbar.Brand>
        <NavDropdown title="Adapter">
          <NavDropdown.Item>test</NavDropdown.Item>
          <NavDropdown.Item>test</NavDropdown.Item>
          <NavDropdown.Item>test</NavDropdown.Item>
        </NavDropdown>
      </Container>
      <Button
        variant="btn-link"
        className="me-3 border-0"
        onClick={() => {
          const newTheme = theme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-bs-theme', newTheme);
          setTheme(newTheme);
        }}
      >
        <ThemeIcon mode={theme} />
      </Button>
    </Navbar>
  );
}
export default Nav;
