import { Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <Typography
        textAlign={"start"}
        gutterBottom
        fontSize={"2rem"}
        fontWeight={"700"}
        color={"#333"}
      >
        Customize your links
      </Typography>
      <Typography
        textAlign={"start"}
        variant="body2"
        gutterBottom
        fontSize={"1rem"}
        fontWeight={"400"}
      >
        Add/edit/remove links below and then share all your profiles with the
        world
      </Typography>
    </>
  );
}
