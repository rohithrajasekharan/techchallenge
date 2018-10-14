import React from 'react'
import Search from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import axios from 'axios';
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchUser } from 'actions/index';
import { connect } from 'react-redux';

class SearchPage extends React.Component {
  state={
    loading:false,
    keyword: "",
    items: null
  }
  handleChange = (value) => {
    this.setState({keyword:value})
  }

  handleSearch = () => {
      axios("http://localhost:8080/search", {
        method: "post",
        data: {keyword: this.state.keyword},
        withCredentials: true
      }).then(resp=>{
        this.setState({items:resp.data,loading:false})
      })
  }
  render () {
    const { classes } = this.props;
    return(
      <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          onChange={(value)=>this.handleChange(value)}
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
      <Button color="white" onClick={()=>{this.setState({loading:true});this.handleSearch()}} aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      {this.state.items!==null?<div>{!this.state.loading?<GridContainer>
          {this.state.items.map(item=>{
            return(
              <GridItem xs={12} sm={6} md={4} key={item._id}>
                <Card>
                  <CardBody>
                <h4 className={classes.cardTitle} style={{cursor:"pointer"}}>{item.name}</h4>
                <h6 className={classes.cardTitle} style={{cursor:"pointer"}}>{item.location}</h6>
              <Button color="primary" style={{marginRight:"4%"}}>Deals</Button>
              </CardBody>
            </Card>
              </GridItem>
            )

          })}

      </GridContainer>:<CircularProgress style={{marginLeft:"45%",marginRight:"45%",marginTop:45}}/>}</div>:<div>
      {this.state.loading?<CircularProgress style={{marginLeft:"45%",marginRight:"45%",marginTop:45}}/>:null}</div>}
</div>
    )
  }
}

export default withStyles(null)(SearchPage);
