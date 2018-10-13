import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import { logoutUser } from 'actions/index';
import { connect } from 'react-redux';

class HeaderLinksComponent extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  static contextTypes = {
      router: PropTypes.object
    };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>

        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        New bonus points awarded
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Exciting offers from enrolled programs
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Received 10 points from company A
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another Notification
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another One
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <Button color="danger"
          onClick={()=>{this.props.logoutUser().then(()=>{this.context.router.history.push('/login')})}}
          style={{marginLeft:24}}>LOG OUT</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.data }
}
const HeaderLinks = withStyles(headerLinksStyle)(HeaderLinksComponent);
export default connect(mapStateToProps, { logoutUser })(HeaderLinks);
