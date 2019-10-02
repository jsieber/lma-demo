import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../App.css';
import ListGroup from 'react-bootstrap/ListGroup';

class fetchVersions extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.match.params.identifier);
    this.state = {
      shows: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    axios.get(`https://archive.org/advancedsearch.php?q=collection%3AJoeRussosAlmostDead+date%3A${this.props.match.params.date}&fl%5B%5D=avg_rating&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=date&fl%5B%5D=downloads&fl%5B%5D=format&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json`)
      .then(res => {
        //console.log(res.data.response.docs);
        //console.log(res.data.files);
        //console.log(res.data.metadata.title);
        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        //this.setState({shows: res.data.response.docs});
        this.setState({shows: res.data.response.docs});

        this.setState({
          error: null,
          loading: false,
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

  renderVersions() {

    if(this.state.error) {
      return this.renderError();
    }
    console.log(this.state.shows);
    //console.log(this.state.playlist);
    //const theplaylist = this.state.playlist;
    //console.log(theplaylist);
    return (

      <div>
          <ListGroup variant="flush">
              {this.state.shows.map(s =>

                <ListGroup.Item action variant="light" key={s.identifier} className="showList">
                  <Link to={`/show/${s.identifier}`}>{s.title} - Downloads {s.downloads}</Link>
                </ListGroup.Item>
              )}
          </ListGroup>

      </div>
    );
  }

  render() {
    return (

      <div>
        <h1>{this.props.collection}</h1>
        {this.state.loading ?
          this.renderLoading()
          : this.renderVersions()}
      </div>
    );
  }

}

export default fetchVersions;
