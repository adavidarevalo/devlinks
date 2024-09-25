import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

interface PreviewLayoutProps {
    children: ReactNode
}

export default function PreviewLayout({children}: PreviewLayoutProps) {
  return (
    <>
    <Box
    minHeight={"50vh"}
    style={{
      background: "#623CFE",
      borderBottomRightRadius: "25px", // Customize the radius value
      borderBottomLeftRadius: "25px",
    }}
    position={"absolute"}
    top={0}
    width={"100vw"}
    left={0}
  />
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      bgcolor: "#f5f5f5",
    }}
    width={"100vw"}
  >
{children}
  </Box>
  </>
  )
}
