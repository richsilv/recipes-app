import React from "react";
import fetch from "isomorphic-unfetch";

import { Page } from "../components/Page";
import { RecipeSummary } from "../components/RecipeSummary";
import { Fab, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { ErrorDialog } from "../components/ErrorDialog";
import { IRecipe } from "../types";
import { AddRecipe } from "../components/AddRecipe";

const Home = pageData => {
  const [{ recipes, error }, setPageData] = React.useState(pageData);
  const [isAddingRecipe, setIsAddingRecipe] = React.useState(false);

  const handleToggleAddRecipe = React.useCallback(() => {
    setIsAddingRecipe(localIsAddingRecipe => !localIsAddingRecipe);
  }, [setIsAddingRecipe]);

  const refreshData = React.useCallback(() => {
    Home.getInitialProps({
      pathname: window.location.pathname
    }).then(newPageData => setPageData(newPageData));
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

  return (
    <Page title="Recipes">
      {error ? (
        <ErrorDialog error={error} />
      ) : (
        <React.Fragment>
          {isAddingRecipe ? (
            <AddRecipe
              handleClose={handleToggleAddRecipe}
              handleAddRecipe={handleAddRecipe}
            />
          ) : (
            <Box clone position="absolute" bottom="2rem" right="2rem">
              <Fab color="primary" onClick={handleToggleAddRecipe}>
                <Add />
              </Fab>
            </Box>
          )}
          {recipes.map(recipe => (
            <RecipeSummary key={recipe.name} recipe={recipe} />
          ))}
        </React.Fragment>
      )}
    </Page>
  );
};

Home.getInitialProps = async ({ pathname }) => {
  const res = await fetch("http://localhost:3000/api/recipes");
  if (res.status !== 200) {
    return { error: res.statusText };
  }
  const json = await res.json();
  return { recipes: json };
};

export default Home;
