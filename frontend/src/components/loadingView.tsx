import { Box, LinearProgress } from '@mui/material'
import DevlinksLogoLg from '../assets/DevlinksLogoLg'

export default function LoadingView() {
  return (
    <Box width={"100vw"} height={"100vh"} display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Box display={"flex"} justifyContent={"center"} alignContent={"center"} flexDirection={"column"}>
            <DevlinksLogoLg/>
            <LinearProgress />
        </Box>
    </Box>
  )
}
