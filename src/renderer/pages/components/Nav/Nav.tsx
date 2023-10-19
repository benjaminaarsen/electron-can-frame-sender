import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  DropdownButton,
  Navbar,
} from 'react-bootstrap';
import { useState } from 'react';
import { XLg, DashLg } from 'react-bootstrap-icons';
import ThemeIcon from './components/ThemeIcon';
import PeakDevices from './components/PeakDevice/PeakDevices';
// import { getDevices } from './components/PeakDevice/PeakDevices';
import getTheme from '../../../util/getTheme';
import DbcButton from './components/DbcButton';
import DisconnectButton from './components/DisconnectButton';

function Nav() {
  const [theme, setTheme] = useState(getTheme());
  const [variant, setVariant] = useState('danger');
  const [dropdownKey, setDropdownKey] = useState(0);
  const [device, setDevice] = useState<string | null>(null);
  function handleDropDownClick(prevKey: number) {
    return () => {
      setDropdownKey((prevKey + 1) % 2);
    };
  }

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
            title={device || 'Select Device'}
          >
            <PeakDevices key={dropdownKey} setDevice={setDevice} />
          </DropdownButton>
          {/* {showDisconnect && <DisconnectButton setDevice={setDevice} />} */}
        </ButtonToolbar>
      </Container>

      <div className="position-absolute end-0 nodrag p-2">
        <Button
          className="border-0"
          variant="btn-link"
          onClick={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);

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
              window.api.minimizeApp();
            }}
          >
            <DashLg size={18} />
          </Button>
          <Button
            variant="btn-link"
            className="border-0"
            onClick={() => {
              window.api.saveSettings(localStorage);
              window.api.closeApp();
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
