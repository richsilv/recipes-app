import React from "react";
import { CssBaseline, Box, AppBar, createMuiTheme } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme();

interface IPageProps {
  readonly title: string;
  readonly appBarContents: React.ReactChild;
}

export const Page: React.FC<IPageProps> = ({
  children,
  appBarContents,
  title
}) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Box clone flexGrow={1}>
        <AppBar position="sticky">{appBarContents}</AppBar>
      </Box>
      <Box clone py={1}>
        <Container>{children}</Container>
      </Box>
    </ThemeProvider>
  </React.Fragment>
);
