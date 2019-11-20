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
  CardActions,
  Collapse,
  Box,
  Chip
} from "@material-ui/core";
import { MoreVert, Favorite, Share, ExpandMore } from "@material-ui/icons";

interface IRecipeSummaryProps {
  recipe: IRecipe;
}

export const RecipeSummary: React.FC<IRecipeSummaryProps> = ({ recipe }) => {
  return (
    <Box clone my={1}>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">{recipe.name.charAt(0)}</Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
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
                <Chip label={tag} />
              </Box>
            ))}
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {recipe.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
          <IconButton
            // onClick={handleExpandClick}
            // aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={false} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};
