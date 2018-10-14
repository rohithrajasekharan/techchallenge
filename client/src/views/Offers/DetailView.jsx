import React from 'react'
import PropTypes from 'prop-types'
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
import withStyles from "@material-ui/core/styles/withStyles";

class DetailView extends React.Component {
  handleCart = (item) => {
    axios("http://localhost:8080/product/addtocart", {
      method: "post",
      data: {productId:item._id,userId:this.props.user._id},
      withCredentials: true
    })
    this.setState({ notif: true, selected: item })
  }
  handleRemoveCart = (id) => {
    axios("http://localhost:8080/product/removefromcart", {
      method: "post",
      data: {id:id},
      withCredentials: true
    })
  }
  render () {
    const { fullScreen,classes,open,selected,onClose,cart,id } = this.props;
  return(
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

</DialogContent>
<DialogActions>
  {cart?<div><Button style={{margin:14}} onClick={()=>this.handleRemoveCart(id)} color="primary">
    Remove from cart
  </Button>
  <Button style={{margin:14}} onClick={this.handleClose} color="primary" autoFocus>
    Buy
  </Button></div>: <div> <Button style={{margin:14}} onClick={()=>this.handleCart(selected)} color="primary">
      Add to cart
    </Button>
    <Button style={{margin:14}} onClick={this.handleClose} color="primary" autoFocus>
      Buy
    </Button></div>}

</DialogActions>
</Dialog>
  </div>:null}
</div>

  )
  }
}

export default withStyles(null)(DetailView);
