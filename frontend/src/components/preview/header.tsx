import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useLinks } from '../context/link';

export default function PreviewHeader() {
    const navigate = useNavigate()
    const { getValues } = useLinks();

    const links = getValues("links") || []

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
            disabled={links.length === 0}
          >
            Share Link
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
