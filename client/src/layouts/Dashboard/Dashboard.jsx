/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-8.jpg";
import logo from "assets/img/reactlogo.png";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchUser } from 'actions/index';

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      loading: true,
      user: ""
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentWillMount(){
    if (this.props.user==undefined) {
      this.props.fetchUser().then((data)=>{
        this.setState({loading:false,user: data.payload.data})
        if (!this.state.user) {
              this.context.router.history.push('/login');
        }
      })
    }
  }
  static contextTypes = {
      router: PropTypes.object
    };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
        const { classes, ...rest } = this.props;
      if (this.state.loading) {
         return(<CircularProgress style={{marginLeft:"45%",marginRight:"45%",marginTop:45}}/>)
      }else{
        return (
          <div className={classes.wrapper}>
            <Sidebar
              routes={dashboardRoutes}
              logoText={"Loyalty"}
              logo={logo}
              image={image}
              handleDrawerToggle={this.handleDrawerToggle}
              open={this.state.mobileOpen}
              color="blue"
              {...rest}
            />
            <div className={classes.mainPanel} ref="mainPanel">
              <Header
                routes={dashboardRoutes}
                handleDrawerToggle={this.handleDrawerToggle}
                {...rest}
              />
              {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
              {this.getRoute() ? (
                <div className={classes.content}>
                  <div className={classes.container}>{switchRoutes}</div>
                </div>
              ) : (
                <div className={classes.map}>{switchRoutes}</div>
              )}
            </div>
          </div>
        );
      }
  }
}

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { user: state.user.data }
}
const App = withStyles(dashboardStyle)(AppComponent);
export default connect(mapStateToProps, { fetchUser })(App);
