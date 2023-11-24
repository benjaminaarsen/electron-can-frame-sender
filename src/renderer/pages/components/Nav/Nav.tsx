import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  DropdownButton,
  Navbar,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { XLg, DashLg, Fullscreen, FullscreenExit } from 'react-bootstrap-icons';
import ThemeIcon from './components/ThemeIcon';
import PeakDevices from './components/PeakDevice/PeakDevices';
// import { getDevices } from './components/PeakDevice/PeakDevices';
import getTheme from '../../../util/getTheme';
import DbcButton from './components/DbcButton';
import DisconnectButton from './components/DisconnectButton';

function Nav({ Initdevice }: { Initdevice: number | null }) {
  const [theme, setTheme] = useState(getTheme());
  // const [variant, setVariant] = useState('danger');
  const [dropdownKey, setDropdownKey] = useState(0);
  const [device, setDevice] = useState<string | null>(null);
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    (async () => {
      if (Initdevice) {
        return setDevice(`PeakCAN handle: ${Initdevice}`);
      }
      return setDevice(null);
    })();
  }, [Initdevice]);

  useEffect(() => {
    return window.api.handleResize(() => {
      window.api
        .isMaximized()
        .then((m) => {
          // console.log(m);
          return setMaximized(m);
        })
        .catch(console.log);
    });
  });
  function handleDropDownClick(prevKey: number) {
    return () => {
      setDropdownKey((prevKey + 1) % 2);
    };
  }
  const variant = device ? 'success' : 'danger';

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
            disabled={!!device}
            as={ButtonGroup}
            title={device || 'Select Device'}
          >
            <PeakDevices key={dropdownKey} setDevice={setDevice} />
          </DropdownButton>
          {device && <DisconnectButton setDevice={setDevice} />}
        </ButtonToolbar>
      </Container>

      <div className="position-absolute end-0 nodrag p-2">
        <Button
          className="border-0 theme-button"
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
        <ButtonGroup className="rounded-pill overflow-hidden">
          <Button
            variant="btn-link"
            className="border-0 nav-shade"
            onClick={() => {
              window.api.minimizeApp();
            }}
          >
            <DashLg size={18} />
          </Button>
          <Button
            variant="btn-link"
            className="border-0 nav-shade"
            onClick={() => {
              if (maximized) {
                window.api.unmaximizeApp();
              } else {
                window.api.maximizeApp();
              }
            }}
          >
            {maximized ? (
              <FullscreenExit size={18} />
            ) : (
              <Fullscreen size={18} />
            )}
          </Button>
          <Button
            variant="btn-link"
            className="border-0 nav-shade close-button"
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
