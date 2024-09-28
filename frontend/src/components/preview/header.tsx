import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useLinks } from '../context/link';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/slices/globalSlice';

export default function PreviewHeader() {
    const navigate = useNavigate()
    const { getValues } = useLinks();
    const dispatch = useDispatch<AppDispatch>();

    const id = getValues("id") || [];
    
    const copyGoogleUrlToClipboard = () => {
      const url = window.location;
      const linkUrl = `${url.protocol}//${url.host}/${id}`;
      navigator.clipboard.writeText(linkUrl).then(() => {
        dispatch(
          addMessage({
            type: "info",
            message: "Link copied to clipboard!"
          })
        );

      })
    };

  return (
    <Box
      sx={{
        backgroundColor: '#6F2DFF', // Purple background
        padding: '16px',
        borderRadius: '12px',
        margin: '16px',
      }}
      zIndex={10}
      style={{
        background: "#fff"
      }}
      width={"90%"}
    >
      <Grid 
        container 
        justifyContent="space-between" 
        alignItems="center"
        sx={{ width: '100%' }}
      >
        {/* Left Button */}
        <Grid>
          <Button
            variant="outlined"
            sx={{
              color: '#6F2DFF',
              borderColor: '#6F2DFF',
              textTransform: 'none',
              fontSize: '16px',
            }}
            onClick={() => navigate("/links")}
          >
            Back to Editor
          </Button>
        </Grid>

        {/* Right Button */}
        <Grid>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#6F2DFF',
              color: 'white',
              textTransform: 'none',
              fontSize: '16px',
            }}
            onClick={copyGoogleUrlToClipboard}
          >
            Share Link
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
