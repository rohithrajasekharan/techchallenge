import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import axios from 'axios';
import { fetchUser,enrollUser } from 'actions/index';
import { connect } from 'react-redux';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class DashboardComponent extends React.Component {
  state = {
    value: 0,
    notif: false,
    points: 0,
    cart: 0,
    user:null
  };
  componentWillMount(){
    this.props.fetchUser().then(data=>{
      this.setState({points:data.payload.data.points,user:data.payload.data})
      axios("http://localhost:8080/product/cart/count", {
        method: "post",
        data: {id: data.payload.data._id},
        withCredentials: true
      }).then(resp=>{
        this.setState({cart:resp.data})
      })
    })
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleEnroll = (id) => {
    const data = {
      userId: this.state.user._id,
      companyId: id
    }
    this.props.enrollUser(data).then(()=>{
        this.setState({ notif: true })
    })

  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleTransaction = () => {
    this.context.router.history.push('/transaction');
  }
  handleCart = () => {
    this.context.router.history.push('/cart');
  }
  static contextTypes = {
      router: PropTypes.object
    };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AccountBalanceWallet/>
                </CardIcon>
                <p className={classes.cardCategory}>Balance</p>
                <h3 className={classes.cardTitle}>
                  {this.state.points} <small>points</small>
                </h3>
              </CardHeader>
              <CardFooter stats onClick={()=>this.handleTransaction()}>
                <div className={classes.stats}>
                    <DateRange />
                    Get transaction history
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <ShoppingCart />
                </CardIcon>
                <p className={classes.cardCategory}>Items in Cart</p>
                <h3 className={classes.cardTitle}>{this.state.cart}</h3>
              </CardHeader>
              <CardFooter stats onClick={()=>this.handleCart()}>
                <div className={classes.stats}>
                  <ShoppingCart />
                  View Cart
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Button color="transparent" href="#" className={classes.title}>
          Popular deals
        </Button>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <GridContainer><GridItem><img style={{maxHeight:200,maxWidth:80}} src="https://www.seoclerk.com/pics/551103-1TOqFD1502285018.jpg" alt=""/>
              </GridItem><GridItem><h4 className={classes.cardTitleWhite}>Flipbuy</h4></GridItem></GridContainer></CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Grab the best offers and discounts on electronics and accessories</h4>
                <p className={classes.cardCategory}>Upto{" "}
                  <span className={classes.successText}>
                     55%
                  </span>{" "}
                  discount for active enrolled members.
                </p>
              </CardBody>
              <CardFooter chart>
                <Button color="success" onClick={()=>this.handleEnroll("5bc2c475de40a83c6cb045a4")} href="#" className={classes.title}>
                  Enroll now
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <GridContainer><GridItem><img style={{maxHeight:200,maxWidth:80}} src="https://www.crearlogogratisonline.com/images/crearlogogratis_1024x1024_01.png" alt=""/>
              </GridItem><GridItem><h4 className={classes.cardTitleWhite}>SmartShop</h4></GridItem></GridContainer></CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Best fashion wears at amazing prices</h4>
                <p className={classes.cardCategory}>Upto{" "}
                  <span className={classes.successText}>
                     15%
                  </span>{" "}
                  cashback for enrolled members.
                </p>
              </CardBody>
              <CardFooter chart>
                <Button color="danger" onClick={()=>this.handleEnroll("5bc37c2f7e6de32a9816cc8e")} href="#" className={classes.title}>
                  Enroll now
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <GridContainer><GridItem><img style={{maxHeight:200,maxWidth:80}} src="https://www.seoclerk.com/pics/551577-1HDYF31502458653.jpg" alt=""/>
              </GridItem><GridItem><h4 className={classes.cardTitleWhite}>MyCart</h4></GridItem></GridContainer></CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Amazing offers and discounts on fashion wears</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                     Daily
                  </span>{" "}
                  rewards for people who promote good products.
                </p>
              </CardBody>
              <CardFooter chart>
                <Button color="warning" onClick={()=>this.handleEnroll("5bc37c667e6de32a9816cc8f")} href="#" className={classes.title}>
                  Enroll now
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="info">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}><img style={{maxHeight:200,maxWidth:80}} src="https://i.ytimg.com/vi/XY5CEnS-qwk/maxresdefault.jpg" alt=""/>
              </GridItem><GridItem xs={12} sm={12} md={8}><h4 style={{marginLeft:20}} className={classes.cardTitleWhite}>Autumn Purchase</h4></GridItem></GridContainer></CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Best quality drinks and beverages</h4>
                <p className={classes.cardCategory}>
                  Amazing offers awaiting for you.
                </p>
              </CardBody>
              <CardFooter chart>
                <Button color="info" onClick={()=>this.handleEnroll("5bc37c9f7e6de32a9816cc90")} href="#" className={classes.title}>
                  Enroll now
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="primary">
                <GridContainer><GridItem><img style={{maxHeight:200,maxWidth:80}} src="https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250" alt=""/>
              </GridItem><GridItem><h4 className={classes.cardTitleWhite}>ShopMate</h4></GridItem></GridContainer></CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Grab the best offers and discounts on cosmetics</h4>
                <p className={classes.cardCategory}>Upto{" "}
                  <span className={classes.successText}>
                     30
                  </span>{" "}
                  points a month for active enrolled members.
                </p>
              </CardBody>
              <CardFooter chart>
                <Button color="primary" onClick={()=>this.handleEnroll("5bc37d1e7e6de32a9816cc91")} href="#" className={classes.title}>
                  Enroll now
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          place="br"
          color="success"
          icon={AddAlert}
          message="Enrolled to the loyalty program"
          open={this.state.notif}
          closeNotification={() => this.setState({ notif: false })}
          close
        />
      </div>
    );
  }
}

DashboardComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { user: state.user.data }
}
const Dashboard = withStyles(dashboardStyle)(DashboardComponent);
export default connect(mapStateToProps, { fetchUser, enrollUser })(Dashboard);
