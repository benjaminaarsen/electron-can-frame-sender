import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  DropdownButton,
  Navbar,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { XLg, DashLg } from 'react-bootstrap-icons';
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
    <Navbar expand="lg" className="bg-body-secondary px-2 drag">
      <Container className="ms-2 d-flex justify-content-start">
        <Navbar.Brand>Frame Sender</Navbar.Brand>
        <ButtonToolbar className="nodrag">
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
      </Container>

      <div className="position-absolute end-0 nodrag p-2">
        <Button
          className="border-0"
          variant="btn-link"
          onClick={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            setTheme(newTheme);
          }}
        >
          <ThemeIcon mode={theme} />
        </Button>
        <ButtonGroup className="rounded-pill">
          <Button
            variant="btn-link"
            className="border-0"
            onClick={() => {
              window.api.ipcRenderer.send('minimize-app');
            }}
          >
            <DashLg size={18} />
          </Button>
          <Button
            variant="btn-link"
            className="border-0"
            onClick={() => {
              window.api.ipcRenderer.send('close-app');
            }}
          >
            <XLg size={18} />
          </Button>
        </ButtonGroup>
      </div>
    </Navbar>
  );
}

export default Nav;
