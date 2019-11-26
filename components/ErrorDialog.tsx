import React from "react";
import {
  Box,
  Paper,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    typography: {
      padding: theme.spacing(2)
    }
  })
);

interface IErrorDialogProps {
  error: string;
}

export const ErrorDialog: React.FC<IErrorDialogProps> = ({ error }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Paper className={classes.paper}>
      <Box className={classes.typography}>
        <Typography color="error" variant="h5" component="h3">
          Could not contact API
        </Typography>
        <Typography color="error" component="p">
          {error}
        </Typography>
      </Box>
    </Paper>
  );
};
