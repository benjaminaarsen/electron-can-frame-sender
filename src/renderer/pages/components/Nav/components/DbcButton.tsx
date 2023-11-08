import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DbcButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="primary"
      onClick={async () => {
        await window.api.openDbcFile();
        const data = await window.api.getDbcData();
        console.log(data);
        if (!data) return;
        //check that we are not already on the DBC page
        if (window.location.pathname === '/dbc') {
          return;
        }
        navigate('/dbc');
      }}
    >
      Open DBC File
    </Button>
  );
}

export default DbcButton;
