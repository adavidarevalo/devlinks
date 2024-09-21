import { Box, Button } from '@mui/material'
import Divider from '@mui/material/Divider';

export default function Footer() {
  return (
    <Box display={"flex"} justifyContent={"end"} width={"100%"}>
      <Divider color={"#e0e0e0"} />
      <Button type="submit" variant="contained" color="primary" 
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
