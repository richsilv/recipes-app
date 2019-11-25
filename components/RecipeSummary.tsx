import { format } from "date-fns";
import React from "react";

import { IRecipe } from "../types";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Menu,
  MenuItem
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

interface IRecipeSummaryProps {
  readonly recipe: IRecipe;
  readonly setEditingRecipe: (recipe: IRecipe) => void;
  readonly setDeletingRecipe: (recipe: IRecipe) => void;
}

export const RecipeSummary: React.FC<IRecipeSummaryProps> = ({
  recipe,
  setEditingRecipe,
  setDeletingRecipe
}) => {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenMenu = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget);
    },
    [setAnchorElement]
  );

  const handleCloseMenu = React.useCallback(() => {
    setAnchorElement(null);
  }, [setAnchorElement]);

  const handleSetEditingRecipe = React.useCallback(() => {
    setEditingRecipe(recipe);
    setAnchorElement(null);
  }, [recipe, setEditingRecipe, setAnchorElement]);

  const handleDeleteRecipe = React.useCallback(() => {
    setDeletingRecipe(recipe);
    setAnchorElement(null);
  }, [recipe, setDeletingRecipe, setAnchorElement]);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{recipe.name.charAt(0)}</Avatar>}
        action={
          <React.Fragment>
            <IconButton aria-label="settings" onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
            <Box clone mt={6}>
              <Menu
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleSetEditingRecipe}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteRecipe}>Delete</MenuItem>
              </Menu>
            </Box>
          </React.Fragment>
        }
        title={recipe.name}
        subheader={format(new Date(recipe._createdOn), "PPP")}
      />
      <Box clone height={150}>
        <CardMedia
          image="https://media3.s-nbcnews.com/j/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422_ae181a762406ae9dce02dd0d5453d1ba.fit-2000w.jpg"
          title={recipe.name}
        />
      </Box>
      <CardContent>
        <Box mb="0.5rem">
          {recipe.tags.map(tag => (
            <Box key={tag} clone mr="0.5rem">
              <Chip label={tag} color="secondary" />
            </Box>
          ))}
        </Box>
        <Typography variant="body1">{recipe.description}</Typography>
      </CardContent>
    </Card>
  );
};
