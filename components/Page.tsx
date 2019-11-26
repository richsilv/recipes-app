import React from "react";
import { Box, AppBar } from "@material-ui/core";
import { Container } from "@material-ui/core";

interface IPageProps {
  readonly title: string;
  readonly appBarContents: React.ReactChild;
}

export const Page: React.FC<IPageProps> = ({ children, appBarContents }) => (
  <React.Fragment>
    <Box clone flexGrow={1}>
      <AppBar position="sticky">{appBarContents}</AppBar>
    </Box>
    <Box clone py={1}>
      <Container>{children}</Container>
    </Box>
  </React.Fragment>
);
