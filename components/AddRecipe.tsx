import React from "react";
import { IRecipe } from "../types";
import { Box, Card, TextField, Button, Grid } from "@material-ui/core";
import { Formik } from "formik";
import { Add } from "@material-ui/icons";

interface IAddRecipeProps {
  readonly handleClose: () => void;
  readonly handleAddRecipe: (recipe: IRecipe) => void;
}

export const AddRecipe: React.FC<IAddRecipeProps> = ({
  handleClose,
  handleAddRecipe
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
      handleAddRecipe(values);
      setSubmitting(false);
      handleClose();
    },
    [handleAddRecipe, handleClose]
  );

  return (
    <Box clone my="1rem" px="2rem" py="1rem">
      <Card>
        <Formik
          initialValues={{ name: "", description: "" }}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="name"
                label="Recipe name"
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

              <Box mt="2rem" mb="1rem" textAlign="right">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="text"
                  color="primary"
                  size="large"
                  endIcon={<Add />}
                >
                  Add recipe
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};
