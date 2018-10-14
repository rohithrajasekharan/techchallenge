import React from 'react'
import PropTypes from 'prop-types'
import Info from "components/Typography/Info.jsx";
import Primary from "components/Typography/Primary.jsx";
import Quote from "components/Typography/Quote.jsx";
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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchUser } from 'actions/index';
import { connect } from 'react-redux';
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';

class DetailViewComponent extends React.Component {
  state={
    review: "",
    loading: true,
    reviews: [],
    notif:false
  }
  handleCart = (item) => {
    axios("http://localhost:8080/product/addtocart", {
      method: "post",
      data: {productId:item._id,userId:this.props.user._id},
      withCredentials: true
    })
  }
  handleBuy = (item) => {
    this.setState({notif: true});
    axios("http://localhost:8080/product/order", {
      method: "post",
      data: {id: item._id},
      withCredentials: true
    }).then(()=>{
      this.context.router.history.push('/user');
    })
  }
  componentWillMount(){
    this.getReview();
  }
  getReview = ()=>{
    axios("http://localhost:8080/getreviews", {
      method: "post",
      data: {productId:this.props.selected._id},
      withCredentials: true
    }).then((resp)=>{
      this.setState({reviews: resp.data,loading: false})
    })
  }
  handleRemoveCart = (id) => {
    axios("http://localhost:8080/product/removefromcart", {
      method: "post",
      data: {id:id},
      withCredentials: true
    }).then(()=>{
        window.location.reload();
    })
  }
  handleSubmit = () => {
    axios("http://localhost:8080/addreview", {
      method: "post",
      data: {name:this.props.user.name,productId:this.props.selected._id,review:this.state.review},
      withCredentials: true
    }).then(()=>{
        this.getReview();
        this.setState({review:""})
    })
  }
  addreview = (username,productId) => {
    axios("http://localhost:8080/addreview", {
      method: "post",
      data: {name:username,productId:productId,review:this.state.review},
      withCredentials: true
    }).then(()=>{

    })
  }
  static contextTypes = {
      router: PropTypes.object
    };
  render () {
    const { fullScreen,classes,open,selected,onClose,cart,id } = this.props;
  return(
    <div>
<div>{selected!==null?<div><Dialog
  fullScreen={fullScreen}
  open={open}
  scroll='paper'
  onClose={onClose}
  aria-labelledby="responsive-dialog-title"
><DialogTitle id="responsive-dialog-title">{selected.name}</DialogTitle>
<DialogContent><GridContainer>
<GridItem xs={12} sm={6} md={6} >
  <DialogContentText>
    {selected.description}
  </DialogContentText>
</GridItem>
<GridItem xs={12} sm={6} md={6} >
  <img style={{width:"100%"}} src={selected.image} alt=""/><br/><br/>
    <GridContainer><GridItem>Price: </GridItem><GridItem><Warning>{selected.price}</Warning></GridItem></GridContainer>
    <p className={classes.cardCategory}>
      <span style={{color:"#228B22"}}>
       {selected.offer}
     </span>
   </p><Info>{selected.companyId.name}</Info>
</GridItem>
</GridContainer>
<GridContainer>
  <GridItem xs={12} sm={6} md={9} >
    <TextField
          id="standard-multiline-flexible"
          label="Write a review of the product."
          multiline
          rows="3"
          fullWidth
          value={this.state.review}
          onChange={(event)=>{this.setState({review:event.target.value})}}
          className={classes.textField}
          margin="normal"
        />
</GridItem>
<GridItem xs={12} sm={6} md={3} >
<Button style={{marginTop:60}} color="primary" round onClick={()=>this.handleSubmit()}>
  Submit
</Button>
</GridItem>
</GridContainer><br/><br/>
{this.state.loading?<CircularProgress style={{marginLeft:"45%",marginRight:"45%",marginTop:45}}/>:<div>
{this.state.reviews.map(msg=>{
  return(<div><Primary>{msg.name}</Primary><h8>{msg.review}</h8><br/><br/></div>)
})}
</div>}
</DialogContent>
<DialogActions>
  {cart?<div><Button style={{margin:14}} onClick={()=>this.handleRemoveCart(id)} color="primary">
    Remove from cart
  </Button>
  <Button style={{margin:14}} onClick={()=>this.handleBuy(selected)} color="primary" autoFocus>
    Buy
  </Button></div>: <div> <Button style={{margin:14}} onClick={()=>this.handleCart(selected)} color="primary">
      Add to cart
    </Button>
    <Button style={{margin:14}} onClick={()=>this.handleBuy(selected)} color="primary" autoFocus>
      Buy
    </Button></div>}

</DialogActions>
</Dialog>
  </div>:null}
</div>
<Snackbar
  place="br"
  color="success"
  icon={AddAlert}
  message="Item bought"
  open={this.state.notif}
  closeNotification={() => this.setState({ notif: false })}
  close
/></div>
  )
  }
}
const DetailView = withMobileDialog()(DetailViewComponent)
export default withStyles(null)(DetailView);
