import React from 'react'
import Search from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import Button from "components/CustomButtons/Button.jsx";

function SearchPage(props){
  const { classes } = props;
  return(
    <div className={classes.searchWrapper}>
      <CustomInput
        formControlProps={{
          className: classes.margin + " " + classes.search
        }}
        inputProps={{
          placeholder: "Search Store  By Location",
          inputProps: {
            "aria-label": "Search Store By Location"
          }
        }}
      />
      <Button color="white" aria-label="edit" justIcon round>
        <Search />
      </Button>
    </div>
  )
}

export default withStyles()(SearchPage);
