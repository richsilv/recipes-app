import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

interface IErrorDialogProps {
  error: string;
}

export const ErrorDialog: React.FC<IErrorDialogProps> = ({ error }) => {
  return (
    <Box clone my="1rem">
      <Paper>
        <Box p="0.5rem">
          <Typography color="error" variant="h5" component="h3">
            Could not contact API
          </Typography>
          <Typography color="error" component="p">
            {error}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
