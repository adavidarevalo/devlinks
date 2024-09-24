import { Box, Button } from '@mui/material'
import Divider from '@mui/material/Divider';

interface FooterProps {
  loading: boolean
}

export default function Footer({loading}: FooterProps) {
  return (
    <Box display={"flex"} justifyContent={"end"} width={"100%"}>
      <Divider color={"#e0e0e0"} />
      <Button 
      disabled={loading}
      type="submit" variant="contained" color="primary" 
      style={{
          fontWeight: "600",
          fontSize: "1rem"
        }}
        >
          Save
        </Button>
    </Box>
  )
}
