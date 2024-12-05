import Typography from "@mui/material/Typography";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Typography
      component="footer"
      variant="body2"
      align="center"
      sx={{ mt: "2rem", mb: "1rem" }}
    >
      &copy; {year} Kemmei H. | Powered by{" "}
      <a
        href="https://www.coingecko.com/en/api"
        rel="noopener noreferrer"
        target="_blank"
      >
        CoinGecko
      </a>
      .
    </Typography>
  );
};

export default Footer;
