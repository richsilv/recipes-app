import React from "react";
import { CssBaseline, Box } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Head from "next/head";

interface IPageProps {
  title: string;
}

export const Page: React.FC<IPageProps> = ({ children, title }) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <CssBaseline />
    <Box clone py={1}>
      <Container>{children}</Container>
    </Box>
  </React.Fragment>
);
