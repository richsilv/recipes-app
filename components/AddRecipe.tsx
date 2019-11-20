import React from "react";
import { IRecipe } from "../types";
import { Box, Card, TextField, Button, Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Field } from "formik";
import { Add } from "@material-ui/icons";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const tags = ["foo", "bar", "baz"];

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
  const preventDefaultOnEnter = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.which === 13) {
        event.preventDefault();
      }
    },
    []
  );

  return (
    <Box clone my="1rem" px="2rem" py="1rem">
      <Card>
        <Formik
          initialValues={{ name: "", description: "", tags: [] }}
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
