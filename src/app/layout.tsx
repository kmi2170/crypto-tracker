import { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import CssBaseline from "@mui/material/CssBaseline";
import TanstackQueryClientProvider from "./query-client-provider";

import theme from "../styles/theme/theme";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import CurrencyProvider from "./currency-provider";

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
            <CurrencyProvider>
              <Navbar />
              <TanstackQueryClientProvider>
                {children}
              </TanstackQueryClientProvider>
            </CurrencyProvider>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
