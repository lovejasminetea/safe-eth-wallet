import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";

export const metadata = {
  title: "Safe ETH Wallet",
  viewport: "initial-scale=1, width=device-width",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="root">
        <CssBaseline></CssBaseline>
        {children}
      </body>
    </html>
  );
}
