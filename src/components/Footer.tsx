import Typography from '@mui/material/Typography';

const Footer = () => {
  const dt = new Date();
  const year = dt.getFullYear();

  return (
    <footer>
      <Typography variant='body2' align='center' sx={{ mb: 3 }}>
        &copy; {year} Kemmei. All rights reserved. | Powerd by{' '}
        {
          <a
            href='https://www.coingecko.com/en/api'
            rel='noopener noreferrer'
            target='_blank'
          >
            CoinGecko
          </a>
        }
        .
      </Typography>
    </footer>
  );
};

export default Footer;
