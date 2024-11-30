import { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import CssBaseline from "@mui/material/CssBaseline";
import TanstackQueryClientProvider from "./QueryClientProvider";

import theme from "../styles/theme/theme";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/global.css";

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
            <Header />
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
