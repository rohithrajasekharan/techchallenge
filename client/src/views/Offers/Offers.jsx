import React from "react";
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
// core components
import Info from "components/Typography/Info.jsx";
import Warning from "components/Typography/Warning.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";

class OffersPage extends React.Component {
  state = {
    buy: false,
    notif: false
  };

  handleBuyClickOpen = () => {
    this.setState({ buy: true });
  };

  handleBuyClose = () => {
    this.setState({ buy: false });
  };
  handleCart = () => {
    this.setState({ notif: true })
  }

  render() {
    const { fullScreen,classes } = this.props;

    return (
      <div>
        <div className={classes.typo}>
          <Info>
            <InfoOutlined style={{marginRight:12}}/><span>The images used are stock photos with proper attribution</span>
          </Info>
        </div><GridContainer>
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

              </p><Button color="primary" onClick={()=>this.handleCart()}>Add to Cart</Button>
            <Button color="primary" onClick={()=>this.handleBuyClickOpen()} style={{marginLeft:"4%"}}>Buy</Button></CardBody>
          </Card>
        </GridItem>

      </GridContainer>
      <Dialog
        fullScreen={fullScreen}
        open={this.state.buy}
        onClose={this.handleBuyClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Buy the product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to buy the selected item? Agreeing will direct you to a payment gateway.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{margin:14}} onClick={this.handleBuyClose} color="danger">
            Disagree
          </Button>
          <Button style={{margin:14}} onClick={this.handleBuyClose} color="success" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        place="br"
        color="success"
        icon={AddAlert}
        message="Item added to cart"
        open={this.state.notif}
        closeNotification={() => this.setState({ notif: false })}
        close
      />
    </div>

    );
  }
}

OffersPage.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const Offers = withStyles(null)(OffersPage)
export default withMobileDialog()(Offers);
