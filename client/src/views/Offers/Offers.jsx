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
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchUser } from 'actions/index';
import { connect } from 'react-redux';
import axios from 'axios';
import DetailView from 'views/Offers/DetailView';

class OffersPage extends React.Component {
  state = {
    buy: false,
    open: false,
    loading: true,
    user: null,
    notif: false,
    enrolled: [],
    items: [],
    selected: null
  };
  componentWillMount(){
    this.props.fetchUser().then((resp)=>{
      this.setState({enrolled:resp.payload.data.enrolled,user:resp.payload.data})
    }).then(()=>{
      this.state.enrolled.map((data)=>{
        axios("http://localhost:8080/product/list", {
          method: "post",
          data: {companyId:data},
          withCredentials: true
        }).then((item)=>{
          console.log(item);
          this.setState({loading:false,items: [...this.state.items, item.data ]})
        }).then(()=>{
          console.log(this.state.items);
        })
      })
    })
  }

  handleBuyClickOpen = (item) => {
    this.setState({ buy: true, selected: item });
  };

  handleBuyClose = () => {
    this.setState({ buy: false });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleCart = (item) => {
    console.log(item);
    axios("http://localhost:8080/product/addtocart", {
      method: "post",
      data: {productId:item[0]._id,userId:this.state.user._id},
      withCredentials: true
    })
    this.setState({ notif: true, selected: item })
  }

  render() {
    const { fullScreen,classes } = this.props;

    return (
      <div>{this.state.loading?<CircularProgress style={{marginLeft:"45%",marginRight:"45%",marginTop:45}}/>:
        <div><div className={classes.typo}>
          <Info>
            <InfoOutlined style={{marginRight:12}}/><span>The images used are stock photos with proper attribution</span>
          </Info>
        </div><br/><GridContainer>
        {this.state.items.map((item)=>{
          return(<GridItem xs={12} sm={6} md={4} key={item[0]._id}>
            <Card>
              <CardBody>
                <img style={{width:"100%"}} src={item[0].image} alt=""/>
            <h4 className={classes.cardTitle} style={{cursor:"pointer"}} onClick={()=>this.setState({selected:item,open:true})}>{item[0].name}</h4>
              <GridContainer><GridItem>Price: </GridItem><GridItem><Warning>{item[0].price}</Warning></GridItem></GridContainer>
                <p className={classes.cardCategory}>
                  <span style={{color:"#228B22"}}>
                   {item[0].offer}
                 </span>
               </p><Info>{item[0].companyId.name}</Info><br/><Button color="primary" onClick={()=>this.handleCart(item)}>Add to Cart</Button>
             <Button color="primary" onClick={()=>this.handleBuyClickOpen(item)} style={{marginLeft:"4%"}}>Buy</Button></CardBody>
            </Card>
          </GridItem>)

        })}


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
      {this.state.selected!==null?<DetailView open={this.state.open} user={this.state.user} handleCart={()=>this.handleCart(this.state.selected)} cart={false} selected={this.state.selected[0]} onClose={()=>{this.setState({open:false})}}/>
:null}

      <Snackbar
        place="br"
        color="success"
        icon={AddAlert}
        message="Item added to cart"
        open={this.state.notif}
        closeNotification={() => this.setState({ notif: false })}
        close
      />
    </div>}
        </div>

    );
  }
}

OffersPage.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { user: state.user.data }
}
const Offersstyled = withStyles(null)(OffersPage);
const Offers = withMobileDialog()(Offersstyled);
export default connect(mapStateToProps, { fetchUser })(Offers);
