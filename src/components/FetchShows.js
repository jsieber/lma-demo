import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../App.css';
import ListGroup from 'react-bootstrap/ListGroup';

let _ = require('underscore');

const collection = "JoeRussosAlmostDead";
const rows = 1000;
const sort = "date+desc&sort%5B%5D=downloads+desc&sort%5B%5D=avg_rating+desc";


class FetchShows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {

    axios.get(`https://www.archive.org/advancedsearch.php?q=collection%3A${collection}&fl%5B%5D=avg_rating&fl%5B%5D=date&fl%5B%5D=downloads&fl%5B%5D=format&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=title&sort%5B%5D=${sort}&rows=${rows}&page=1&output=json`)
      .then(res => {

        //use underscore.js to group array.
        const grouped = _.groupBy(res.data.response.docs, 'date');
        //console.log(grouped);
        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        //this.setState({shows: res.data.response.docs});
        this.setState({groupedShows: _.map(grouped)});
        //console.log(this.state.groupedShows);
        this.setState({
          loading: false,
          error: null
        });

      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Uh oh: {this.state.error.message}
      </div>
    );
  }

  renderShows() {
    if(this.state.error) {
      return this.renderError();
    }

    return (

      <ListGroup variant="flush">
          {this.state.groupedShows.map(show =>

            <ListGroup.Item action variant="light" key={show[0].identifier} className="showList">
              <Link to={`/show/${show[0].identifier}`}>{show[0].title} - versions {show.length}</Link>
            </ListGroup.Item>
          )}
      </ListGroup>
    );
  }

  render() {
    return (
      <div>
        <h1>{this.props.collection}</h1>
        {this.state.loading ?
          this.renderLoading()
          : this.renderShows()}
      </div>
    );
  }

}

export default FetchShows;
