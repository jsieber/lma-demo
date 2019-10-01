import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Versions extends React.Component {
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
    axios.get(`https://archive.org/advancedsearch.php?q=collection%3AJoeRussosAlmostDead+date%3A${this.props.match.params.date}&fl%5B%5D=collection&fl%5B%5D=date&fl%5B%5D=downloads&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json`)
      .then(res => {
        console.log(res.data.response.docs);
        //console.log(res.data.files);
        //console.log(res.data.metadata.title);
        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        //this.setState({shows: res.data.response.docs});
        //this.setState({showDetails: res.data});

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

  renderShows() {

    if(this.state.error) {
      return this.renderError();
    }
    console.log("");
    //console.log(this.state.playlist);
    //const theplaylist = this.state.playlist;
    //console.log(theplaylist);
    return (

      <div>


      </div>
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

export default Versions;
