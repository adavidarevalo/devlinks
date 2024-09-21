import { Box, Container,  Typography} from '@mui/material';
import DevlinksLogoLg from '../assets/DevlinksLogoLg';
import LoginForm from '../components/login/form';

export default function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#F7F7F7',
    }}>
        <Box  sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
      }}>
        <Box sx={{
        marginBottom: "40px"
      }}>
        <DevlinksLogoLg />
        </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 480,
        p: 3,
        borderRadius: 2,
        bgcolor: '#FFFFFF'
      }}>
        <Typography 
        component="h1" 
        variant="h4" 
        sx={{  fontWeight: 'bold', textAlign: 'center' }}
        >
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
          Add your details below to get back into the app
        </Typography>
            <LoginForm/>
        </Box>
      </Box>
    </Container>
  );
}
