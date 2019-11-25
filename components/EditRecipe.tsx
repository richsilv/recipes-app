import React from "react";
import { IRecipe } from "../types";
import {
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Field } from "formik";
import { Add, Close } from "@material-ui/icons";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

interface IEditRecipeProps {
  readonly recipe: IRecipe;
  readonly tags: Array<string>;
  readonly handleClose: () => void;
  readonly handleEditRecipe: (recipe: IRecipe) => void;
}

export const EditRecipe: React.FC<IEditRecipeProps> = ({
  recipe,
  tags,
  handleClose,
  handleEditRecipe
}) => {
  const validate = React.useCallback(values => {
    const errors: Partial<{ -readonly [key in keyof IRecipe]: string }> = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  }, []);
  const onSubmit = React.useCallback(
    (values, { setSubmitting }) => {
      handleEditRecipe(values);
      setSubmitting(false);
      handleClose();
    },
    [handleEditRecipe, handleClose]
  );
  const preventDefaultOnEnter = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.which === 13) {
        event.preventDefault();
      }
    },
    []
  );

  return (
    <Dialog
      open={!!recipe}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Formik initialValues={recipe} validate={validate} onSubmit={onSubmit}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">Edit Recipe</DialogTitle>
            <DialogContent>
              <TextField
                type="text"
                name="name"
                label="Recipe name"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                required
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                margin="normal"
              />
              <TextField
                multiline
                type="text"
                name="description"
                label="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                fullWidth
                margin="normal"
              />
              <Field name="tags">
                {({ field, form }) => {
                  return (
                    <Autocomplete
                      multiple
                      options={tags}
                      value={field.value}
                      freeSolo
                      filterSelectedOptions
                      onChange={(_, tagsValue) =>
                        form.setFieldValue("tags", tagsValue, false)
                      }
                      onBlur={field.handleBlur}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          onKeyDown={preventDefaultOnEnter}
                          label="Tags"
                          placeholder="Cuisine, ingredient, etc..."
                          margin="normal"
                          fullWidth
                        />
                      )}
                      renderOption={(option, { inputValue }) => {
                        const matches = match(option, inputValue);
                        const parts = parse(option, matches);

                        return (
                          <div>
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                          </div>
                        );
                      }}
                    />
                  );
                }}
              </Field>
            </DialogContent>
            <DialogActions>
              <Button
                type="button"
                disabled={isSubmitting}
                variant="text"
                color="secondary"
                size="large"
                onClick={handleClose}
                endIcon={<Close />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="text"
                color="primary"
                size="large"
                endIcon={<Add />}
              >
                Save recipe
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
