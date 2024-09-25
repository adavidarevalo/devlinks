import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { Link } from './context/link'
import { platforms } from '../utils/const/plataforms'

interface CardPlatformProps {
  link: Link
}

export default function CardPlatform({ link}: CardPlatformProps) {  

  const platform = useMemo(() => {
    return platforms.find(
      (platform) =>
        platform.name === link?.platform
    );
  }, [])

  return (
    <Box
    sx={{
      width: "235px",
      height: "43px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      color: "white",
      borderRadius: "7px",
      marginBottom: "21px",
      backgroundColor: platform?.color,
      cursor: "pointer"
    }}
    onClick={() => {
      window.open(link.link, '_blank', 'noopener,noreferrer');
    }}
  >
    {platform && <platform.icon color={"white"} />}
    <Box marginLeft={"5px"}>{platform?.name}</Box>
  </Box>
  )
}
