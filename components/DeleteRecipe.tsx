import React from "react";
import { IRecipe } from "../types";
import {
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Field } from "formik";
import { Add, Close } from "@material-ui/icons";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

interface IDeleteRecipeProps {
  readonly recipe: IRecipe | null;
  readonly handleClose: () => void;
  readonly handleDeleteRecipe: (recipe: IRecipe) => void;
}

export const DeleteRecipe: React.FC<IDeleteRecipeProps> = ({
  recipe,
  handleClose,
  handleDeleteRecipe
}) => {
  const handleCompleteDeleteRecipe = React.useCallback(() => {
    handleDeleteRecipe(recipe);
    handleClose();
  }, [recipe, handleDeleteRecipe, handleClose]);

  return (
    <Dialog
      open={!!recipe}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        Really delete <strong>{recipe ? recipe.name : ""}</strong>?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This cannot be undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleCompleteDeleteRecipe} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
