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
  MenuItem,
  makeStyles,
  Theme,
  createStyles,
  useTheme
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      marginTop: theme.spacing(6)
    },
    media: {
      height: "150px"
    },
    chip: {
      marginRight: theme.spacing(1)
    },
    chips: {
      marginBottom: theme.spacing(1)
    }
  })
);

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
  const theme = useTheme();
  const classes = useStyles(theme);

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
            <Menu
              className={classes.menu}
              anchorEl={anchorElement}
              keepMounted
              open={Boolean(anchorElement)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleSetEditingRecipe}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteRecipe}>Delete</MenuItem>
            </Menu>
          </React.Fragment>
        }
        title={recipe.name}
        subheader={format(new Date(recipe._createdOn), "PPP")}
      />
      <CardMedia
        className={classes.media}
        image="https://media3.s-nbcnews.com/j/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422_ae181a762406ae9dce02dd0d5453d1ba.fit-2000w.jpg"
        title={recipe.name}
      />
      <CardContent>
        <Box className={classes.chips}>
          {recipe.tags.map(tag => (
            <Chip
              className={classes.chip}
              key={tag}
              label={tag}
              color="secondary"
            />
          ))}
        </Box>
        <Typography variant="body1">{recipe.description}</Typography>
      </CardContent>
    </Card>
  );
};
