import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { makeStyles } from '@mui/styles';

import Carousel from "./Carousel";

// const useStyles = makeStyles(() => ({
// }))

const Banner = () => {
  // const classes = useStyles()

  return (
    <div>
      <Container sx={{
        // height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 5,
      }}>
        <Box sx={{
          display: "flex",
          // height: "40%",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", mt: 3, }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              m: 2,
            }}
          >
            Get your favorite crypto currency info
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner 
