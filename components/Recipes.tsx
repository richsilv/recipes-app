import { Grid } from "@material-ui/core";
import React from "react";

import { IRecipe } from "../types";
import { RecipeSummary } from "./RecipeSummary";

interface IRecipesProps {
  readonly recipes: Array<IRecipe>;
  readonly setEditingRecipe: (recipe: IRecipe) => void;
  readonly setDeletingRecipe: (recipe: IRecipe) => void;
}

export const Recipes: React.FC<IRecipesProps> = ({
  recipes,
  setEditingRecipe,
  setDeletingRecipe
}) => {
  return (
    <React.Fragment>
      {recipes.map(recipe => (
        <Grid key={recipe.name} item xs={12} sm={6} lg={4}>
          <RecipeSummary
            recipe={recipe}
            setEditingRecipe={setEditingRecipe}
            setDeletingRecipe={setDeletingRecipe}
          />
        </Grid>
      ))}
    </React.Fragment>
  );
};
