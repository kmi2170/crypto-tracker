import { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import CssBaseline from "@mui/material/CssBaseline";
import TanstackQueryClientProvider from "./QueryClientProvider";

import "../styles/global.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import theme from "../styles/theme/theme";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description:
    "Crypto currency info app. A Next.js project with Typescript, Material-UI and Tanstack Query.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TanstackQueryClientProvider>
              {children}
            </TanstackQueryClientProvider>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
