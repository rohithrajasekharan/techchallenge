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

import Button from "components/CustomButtons/Button";

class CartComponent extends React.Component {
  state = {
    loading:true,
    items:[],
    user:null
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
                  <h4 className={classes.cardTitle} style={{cursor:"pointer"}}>{item.productId.name}</h4>
                    <GridContainer><GridItem>Price: </GridItem><GridItem><Warning>{item.productId.price}</Warning></GridItem></GridContainer>
                      <p className={classes.cardCategory}>
                        <span style={{color:"#228B22"}}>
                         {item.productId.offer}
                        </span>{" "}

                      </p><Button color="primary" style={{marginRight:"4%"}}>Buy</Button>
                      <Button color="primary">Remove from Cart</Button></CardBody>
                  </Card>
                </GridItem>
              )

            })}

        </GridContainer>:<CircularProgress style={{marginLeft:"45%",marginRight:"45%",marginTop:45}}/>}</div>
    );
  }
}


function mapStateToProps(state) {
  return { user: state.user.data }
}
const Cart = withStyles(null)(CartComponent);
export default connect(mapStateToProps, { fetchUser })(Cart);
