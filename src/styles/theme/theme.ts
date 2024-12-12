"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
// });

let theme = createTheme({
  palette: {
    background: {
      default: "rgba(255,248,220,0.25)",
    },
    primary: {
      main: "rgba(0,65,106,0.8)",
    },
    secondary: {
      main: "rgb(255,215,0)",
      light: "rgb(255,192,203)",
    },
    // error: {
    //   main: red.A400,
    // },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
