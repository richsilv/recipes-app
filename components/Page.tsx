import React from "react";
import {
  AppBar,
  makeStyles,
  Theme,
  createStyles,
  useTheme
} from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  })
);

interface IPageProps {
  readonly title: string;
  readonly appBarContents: React.ReactChild;
}

export const Page: React.FC<IPageProps> = ({ children, appBarContents }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <React.Fragment>
      <AppBar className={classes.appBar} position="sticky">
        {appBarContents}
      </AppBar>
      <Container className={classes.container}>{children}</Container>
    </React.Fragment>
  );
};
