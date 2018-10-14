import React from "react";
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { fetchUser } from 'actions/index';
import { connect } from 'react-redux';
import avatar from "assets/img/faces/acc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


class UserProfileComponent extends React.Component {
  state = {
    loading: true,
    user: null
  };
  componentWillMount(){
    this.props.fetchUser().then((data)=>{
      this.setState({user:data.payload.data,loading:false})
    })
  }
  render () {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            {!this.state.loading?<Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{this.state.user.name}</h6>
                <h4 className={classes.cardTitle}>{this.state.user.email}</h4>
                <p className={classes.description}>
                Loyalty card Number: {this.state.user._id}
                </p>
                <Button color="primary" round>
                  Edit Profile
                </Button>
              </CardBody>
            </Card>:null}

          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.data }
}
const UserProfile = withStyles(styles)(UserProfileComponent);
export default connect(mapStateToProps, { fetchUser })(UserProfile);
