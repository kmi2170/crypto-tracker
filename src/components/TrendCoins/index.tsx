import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import Carousel from "./Carousel";

const TrendCoins = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        margin: "auto",
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "0.75rem",
        // [theme.breakpoints.down("sm")]: {
        //   marginTop: "1rem",
        // },
        // [theme.breakpoints.up("sm")]: {
        //   marginTop: "3rem",
        // },
        // [theme.breakpoints.down("md")]: {
        //   maxWidth: "600px",
        // },
        // [theme.breakpoints.up("md")]: {
        //   width: "800px",
        // },
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", mb: "1.0rem" }}
      >
        Trend
      </Typography>

      <Carousel />
    </Paper>
  );
};

export default TrendCoins;
