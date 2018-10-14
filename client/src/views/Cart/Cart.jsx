import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Warning from "components/Typography/Warning.jsx";
import { fetchUser } from 'actions/index';
import axios from 'axios';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DetailView from 'views/Offers/DetailView';
import Button from "components/CustomButtons/Button";

class CartComponent extends React.Component {
  state = {
    loading:true,
    items:[],
    user:null,
    selected:null
  };
  componentWillMount(){
    this.props.fetchUser().then(data=>{
      this.setState({user:data.payload.data})
      axios("http://localhost:8080/product/cart", {
        method: "post",
        data: {id: data.payload.data._id},
        withCredentials: true
      }).then(resp=>{
        this.setState({items:resp.data,loading:false})
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
    axios("http://localhost:8080/product/removefromcart", {
      method: "post",
      data: {id: item._id},
      withCredentials: true
    })
  }
  render () {
    const { classes } = this.props;
    return (

        <div>{!this.state.loading?<GridContainer>
            {this.state.items.map(item=>{
              return(
                <GridItem xs={12} sm={6} md={4} key={item._id}>
                  <Card>
                    <CardBody>
                      <img style={{width:"100%"}} src={item.productId.image} alt=""/>
                  <h4 className={classes.cardTitle} style={{cursor:"pointer"}} onClick={()=>this.setState({selected:item,open:true})}>{item.productId.name}</h4>
                    <GridContainer><GridItem>Price: </GridItem><GridItem><Warning>{item.productId.price}</Warning></GridItem></GridContainer>
                      <p className={classes.cardCategory}>
                        <span style={{color:"#228B22"}}>
                         {item.productId.offer}
                        </span>{" "}

                      </p><Button color="primary" onClick={()=>this.handleCart(item)}>Remove from Cart</Button>
                    <Button color="primary" onClick={()=>this.handleBuyClickOpen(item)} style={{marginLeft:"4%"}}>Buy</Button></CardBody>
                  </Card>
                </GridItem>
              )

            })}
            {this.state.selected!==null?<DetailView open={this.state.open} id={this.state.selected._id} user={this.state.user} cart={true} selected={this.state.selected.productId} onClose={()=>{this.setState({open:false})}}/>:null}
        </GridContainer>:<CircularProgress style={{marginLeft:"45%",marginRight:"45%",marginTop:45}}/>}</div>
    );
  }
}


function mapStateToProps(state) {
  return { user: state.user.data }
}
const Cart = withStyles(null)(CartComponent);
export default connect(mapStateToProps, { fetchUser })(Cart);
