import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  container: {
    // height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container}>
        <div className={classes.title}>
          <Typography
            variant='h2'
            component='h1'
            sx={{ fontWeight: 'bold', mt: 3 }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant='h6'
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              m: 2,
              mb: 10,
            }}
          >
            Get your favorite crypto currency info
          </Typography>
        </div>
        <Typography variant='h4' align='center' sx={{ mt: 2, mb: 3 }}>
          Trend
        </Typography>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
