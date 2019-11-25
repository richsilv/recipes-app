import React from "react";
import {
  Toolbar,
  Box,
  IconButton,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  InputBase
} from "@material-ui/core";
import { Menu, Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { fade, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      display: "flex",
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      paddingLeft: theme.spacing(7)
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      transition: theme.transitions.create("width"),
      width: "100%",
      maxWidth: "calc(100% - 5rem)",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    popupIndicator: {
      color: theme.palette.common.white
    }
  })
);

interface IAppBarProps {
  selectedTags: Array<string>;
  allTags: Array<string>;
  handleChangeTagSearch: (tagsValue: Array<string>) => void;
}

export const AppBar: React.FC<IAppBarProps> = ({
  selectedTags,
  allTags,
  handleChangeTagSearch
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Toolbar>
      <Box clone mr={2}>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <Menu />
        </IconButton>
      </Box>
      <Box clone width="32rem" color="white">
        <Autocomplete
          multiple
          value={selectedTags}
          options={allTags}
          classes={{
            popupIndicator: classes.popupIndicator
          }}
          filterSelectedOptions
          onChange={(_, tagsValue) => handleChangeTagSearch(tagsValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                size="small"
                color="secondary"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={params => (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                {...params.InputProps}
                placeholder="Cuisine, ingredient, etc..."
                fullWidth
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={params.inputProps}
              />
            </div>
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
      </Box>
    </Toolbar>
  );
};
