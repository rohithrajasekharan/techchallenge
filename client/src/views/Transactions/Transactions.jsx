import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import { fetchUser } from 'actions/index';
import axios from 'axios';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Quote from "components/Typography/Quote.jsx";


class TransactionsComponent extends React.Component {
  state = {
    user: null,
    items: [],
    loading: false
  }
  componentWillMount(){
    this.props.fetchUser().then(data=>{
      this.setState({user:data.payload.data})
      axios("http://localhost:8080/product/order", {
        method: "post",
        data: {id: data.payload.data._id},
        withCredentials: true
      }).then(resp=>{
        this.setState({items:resp.data,loading:false})
      })
    })
  }
  render () {
    return(
      <div>
        <Quote
          text="You have no transactions yet"
          author=""
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user.data }
}
const Transactions = withStyles(null)(TransactionsComponent);
export default connect(mapStateToProps, { fetchUser })(Transactions);
