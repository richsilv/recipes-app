import React from "react";
import fetch from "isomorphic-unfetch";

import { Page } from "../components/Page";
import {
  Fab,
  Box,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  useTheme
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { ErrorDialog } from "../components/ErrorDialog";
import { IRecipe } from "../types";
import { AddRecipe } from "../components/AddRecipe";
import { Recipes } from "../components/Recipes";
import { AppBar } from "../components/AppBar";
import { EditRecipe } from "../components/EditRecipe";
import { DeleteRecipe } from "../components/DeleteRecipe";
import { getRecipes } from "./api/recipes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: "fixed",
      bottom: "2rem",
      right: "2rem"
    }
  })
);

const Home = pageData => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [{ recipes, error }, setPageData] = React.useState(pageData);
  const [isAddingRecipe, setIsAddingRecipe] = React.useState(false);
  const [editingRecipe, setEditingRecipe] = React.useState<IRecipe | null>(
    null
  );
  const [deletingRecipe, setDeletingRecipe] = React.useState<IRecipe | null>(
    null
  );
  const [searchTags, setSearchTags] = React.useState<Array<string>>([]);

  const tags = React.useMemo(() => {
    const tagsLocal = new Set<string>();
    if (recipes) {
      recipes.forEach(recipe => {
        recipe.tags.forEach(tag => tagsLocal.add(tag));
      });
    }
    return Array.from(tagsLocal);
  }, [recipes]);

  const filteredRecipes = React.useMemo(() => {
    return recipes
      ? recipes.filter(recipe => {
          const recipeTagSet = new Set(recipe.tags);
          const initialSize = recipeTagSet.size;
          searchTags.forEach(searchTag => recipeTagSet.add(searchTag));
          return recipeTagSet.size === initialSize;
        })
      : [];
  }, [searchTags, recipes]);

  const handleToggleAddRecipe = React.useCallback(() => {
    setIsAddingRecipe(localIsAddingRecipe => !localIsAddingRecipe);
  }, [setIsAddingRecipe]);

  const handleClearEditingRecipe = React.useCallback(() => {
    setEditingRecipe(null);
  }, [setEditingRecipe]);

  const handleClearDeletingRecipe = React.useCallback(() => {
    setDeletingRecipe(null);
  }, [setDeletingRecipe]);

  const refreshData = React.useCallback(() => {
    Home.getInitialProps({} as any).then(newPageData =>
      setPageData(newPageData)
    );
  }, []);

  const handleAddRecipe = React.useCallback(
    (recipe: IRecipe) => {
      fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
      }).then(() => {
        refreshData();
      });
    },
    [refreshData]
  );

  const handleEditRecipe = React.useCallback(
    (recipe: IRecipe) => {
      fetch("/api/recipes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
      }).then(() => {
        refreshData();
      });
    },
    [refreshData]
  );

  const handleDeleteRecipe = React.useCallback(
    (recipe: IRecipe) => {
      fetch("/api/recipes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
      }).then(() => {
        refreshData();
      });
    },
    [refreshData]
  );

  return (
    <Page
      title="Recipes"
      appBarContents={
        <AppBar
          allTags={tags}
          selectedTags={searchTags}
          handleChangeTagSearch={setSearchTags}
        />
      }
    >
      {error ? (
        <ErrorDialog error={error} />
      ) : (
        <React.Fragment>
          <AddRecipe
            tags={tags}
            open={isAddingRecipe}
            handleClose={handleToggleAddRecipe}
            handleAddRecipe={handleAddRecipe}
          />
          <EditRecipe
            tags={tags}
            recipe={editingRecipe}
            handleClose={handleClearEditingRecipe}
            handleEditRecipe={handleEditRecipe}
          />
          <DeleteRecipe
            recipe={deletingRecipe}
            handleClose={handleClearDeletingRecipe}
            handleDeleteRecipe={handleDeleteRecipe}
          />
          {isAddingRecipe ? null : (
            <Fab
              className={classes.addButton}
              color="primary"
              onClick={handleToggleAddRecipe}
            >
              <Add />
            </Fab>
          )}
          <Grid container spacing={3}>
            <Recipes
              recipes={filteredRecipes}
              setEditingRecipe={setEditingRecipe}
              setDeletingRecipe={setDeletingRecipe}
            />
          </Grid>
        </React.Fragment>
      )}
    </Page>
  );
};

Home.getInitialProps = async ({ req }) => {
  // This is the server
  if (req) {
    const json = await getRecipes().then(body => body.json());
    return { recipes: json };
  }

  const res = await fetch("/api/recipes");
  if (res.status !== 200) {
    return { error: res.statusText };
  }
  const json = await res.json();
  return { recipes: json };
};

export default Home;
