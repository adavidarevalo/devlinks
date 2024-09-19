import { Link } from 'react-router-dom';
import { Button, Typography, AppBar, Toolbar, Tooltip, Box } from '@mui/material';
import { AiOutlineLink, AiOutlineUser, AiOutlineEye } from 'react-icons/ai';
import { styled } from '@mui/system';
import DevlinksLogoLg from '../../../assets/DevlinksLogoLg';


// active ? theme.palette.primary.main : theme.palette.text.secondary,
const NavButton = styled(Button)(({ theme }: any) => ({
    color: "red",
    '&:hover': {
        // color: theme.palette.primary.main,
    },
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

export default function Header() {
    return (
        <AppBar position="static" style={{padding: "10px"}}>
            <Toolbar style={{background: "white", width: "100%", borderRadius: "10px", display: "flex", justifyContent: "space-between"}}>
            <DevlinksLogoLg />

                <Box display={"flex"}>
                    <NavButton
                        color="inherit"
                        // onClick={() => setPage('links')}
                        // active={page === 'links'}
                        
                        startIcon={<AiOutlineLink />}
                    >
                        <Typography variant="button">
                            Links
                        </Typography>
                    </NavButton>

                    <NavButton
                        color="inherit"
                        // onClick={() => setPage('profile')}
                        // active={page === 'profile'}
                        startIcon={<AiOutlineUser />}
                    >
                        <Typography variant="button">
                            Profile Details
                        </Typography>
                    </NavButton>
                </Box>

                <Tooltip title="Preview">
                    <Button
                        component={Link}
                        to='/preview'
                        color="primary"
                        variant="outlined"
                        startIcon={<AiOutlineEye />}
                    >
                        <Typography variant="button">
                            Preview
                        </Typography>
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}
