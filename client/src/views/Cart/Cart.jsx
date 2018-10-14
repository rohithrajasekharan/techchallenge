import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Warning from "components/Typography/Warning.jsx";

import Button from "components/CustomButtons/Button";

function Cart(props) {
  const { classes } = props;
  return (

      <div><GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardBody>
              <img style={{width:"100%"}} src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt=""/>
          <h4 className={classes.cardTitle} style={{cursor:"pointer"}}>Fujifilm XT10</h4>
            <GridContainer><GridItem>Price: </GridItem><GridItem><Warning>30000</Warning></GridItem></GridContainer>
              <p className={classes.cardCategory}>
                <span style={{color:"#228B22"}}>
                 55% OFF in price
                </span>{" "}

              </p><Button color="primary" style={{marginRight:"4%"}}>Buy</Button>
              <Button color="primary">Remove from Cart</Button></CardBody>
          </Card>
        </GridItem>

      </GridContainer></div>
  );
}

export default withStyles(null)(Cart);
