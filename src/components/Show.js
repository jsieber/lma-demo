import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { MediaPlayer } from '@cassette/player';
import '@cassette/player/dist/css/cassette-player.css';

class Show extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.match.params.identifier);
    this.state = {
      shows: [],
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    axios.get(`https://archive.org/metadata/${this.props.match.params.identifier}`)
      .then(res => {
        //console.log(res.data);
        //console.log(res.data.files);
        //console.log(res.data.metadata.title);
        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        //this.setState({shows: res.data.response.docs});
        //this.setState({showDetails: res.data});

        //const audioFiles = res.data.files.map(getmp3files);

        const audioFiles = res.data.files.filter(function(item){
          return item.name.slice(-3) === "mp3";
        });

        const testplaylist = [
                {
                  url:
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  title: 'Big Buck Bunny'
                },
                {
                  url:
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                  title: 'Elephants Dream'
                }
              ];


        //console.log(audioFiles);
        this.setState({
          loading: false,
          error: null,
          identifier: res.data.metadata.identifier,
          date: res.data.metadata.date,
          publicDate: res.data.metadata.publicdate,
          title: res.data.metadata.title,
          taper: res.data.metadata.taper,
          files: res.data.files,
          headerImage: `https://archive.org/download/${res.data.metadata.identifier}/${res.data.files[0].name}`,
          audioFiles: audioFiles,
          playlist: testplaylist,
          sampleaudiolink: `https://archive.org/download/${res.data.metadata.identifier}/${audioFiles[0].name}`
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
    console.log(this.state.audioFiles);
    console.log(this.state.playlist);
    const theplaylist = this.state.playlist;
    console.log(theplaylist);
    return (

      <div>
        <img src="https://archive.org/download/etree/lma.jpg" alt="Archive.org Live Music Archive" />
        <img src={this.state.headerImage} alt={this.state.title} width="250" />
        <p>{this.state.date}</p>
        <p>{this.state.title} Taper: {this.state.taper}</p>
        <p>{this.state.sampleaudiolink}</p>

        <Link to='/'>Back</Link>
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

export default Show;
