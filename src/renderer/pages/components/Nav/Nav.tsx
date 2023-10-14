import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  DropdownButton,
  Navbar,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ThemeIcon from './components/ThemeIcon';
import PeakDevices from './components/PeakDevice/PeakDevices';
// import { getDevices } from './components/PeakDevice/PeakDevices';
import getTheme from '../../../util/getTheme';
import DbcButton from './components/DbcButton';
import pcanConnected from '../../../util/pcanConnected';
import DisconnectButton from './components/DisconnectButton';

function Nav() {
  const [theme, setTheme] = useState(getTheme());
  const [device, setDevice] = useState<string | null>('Adapter not connected');
  const [variant, setVariant] = useState('danger');
  const [showDisconnect, setShowDisconnect] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(0);

  function handleDropDownClick(prevKey: number) {
    return () => {
      setDropdownKey((prevKey + 1) % 2);
    };
  }

  useEffect(() => {
    pcanConnected()
      .then((connected: boolean) => {
        if (connected) {
          setShowDisconnect(true);
          return setVariant('success');
        }
        setShowDisconnect(false);
        return setVariant('danger');
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [device]);

  return (
    <Navbar expand="lg" className="bg-body-secondary px-2">
      <Navbar.Brand>Frame Sender</Navbar.Brand>
      <ButtonToolbar>
        <DbcButton />
        <DropdownButton
          onClick={handleDropDownClick(dropdownKey)}
          variant={variant}
          className="ms-2"
          as={ButtonGroup}
          title={device}
        >
          <PeakDevices key={dropdownKey} setDevice={setDevice} />
        </DropdownButton>
        {showDisconnect && <DisconnectButton setDevice={setDevice} />}
      </ButtonToolbar>
      <Button
        variant="btn-link"
        className="me-3 border-0 position-absolute end-0"
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
