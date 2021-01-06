import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
//import { MediaPlayer } from '@cassette/player';
//import '@cassette/player/dist/css/cassette-player.css';
//import ReactJWPlayer from 'react-jw-player';
//import WaveSurfer from 'wavesurfer.js';
import ReactWaves from '@dschoon/react-waves';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

class Show extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.match.params.identifier);
    this.state = {
      playing: false,
      loading: true,
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


        let audioFiles = res.data.files.filter(function(item){
          return item.name.slice(-3) === "mp3";
        });

        let playlist = audioFiles.forEach(item => (item.url = "https://archive.org/download/" + res.data.metadata.identifier + "/" + item.name ));

        //console.log(playlist);
        this.setState({
          error: null,
          identifier: res.data.metadata.identifier,
          date: res.data.metadata.date,
          description: res.data.metadata.description,
          publicDate: res.data.metadata.publicdate,
          title: res.data.metadata.title,
          taper: res.data.metadata.taper,
          files: res.data.files,
          headerImage: `https://archive.org/download/${res.data.metadata.identifier}/${res.data.files[0].name}`,
          audioFiles: audioFiles,
          sampleaudiolink: `https://archive.org/download/${res.data.metadata.identifier}/${audioFiles[1].name}`,
          loading: false,
          playlist: playlist,
          playing: false,
          currentTrack: `https://archive.org/download/${res.data.metadata.identifier}/${audioFiles[0].name}`,
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

    //const theplaylist = this.state.playlist;
    console.log(this.state.currentTrack);
    return (

      <div>

        <img src={this.state.headerImage} alt={this.state.title} width="250" />
        <p>{this.state.date}</p>
        <p>{this.state.title}</p>
        <p>Taper: {this.state.taper}</p>

          <div className={'container example'}>
          <div className="play button" onClick={() => { this.setState({ playing: !this.state.playing }) }}>
            { !this.state.playing ? <FaPlay /> : <FaStop /> }
          </div>
          <ReactWaves
            audioFile={this.state.currentTrack}
            className={'react-waves'}
            options={{
              barHeight: 2,
              cursorWidth: 0,
              height: 200,
              hideScrollbar: true,
              progressColor: '#EC407A',
              responsive: true,
              waveColor: '#D1D6DA',
              mediaControls: true,
              mediaType: 'audio',
            }}
            volume={1}
            zoom={1}
            playing={this.state.playing}

          />
        </div>

        <div className="list-group" id="playlist">
          <ListGroup variant="flush">
              {this.state.audioFiles.map(track =>

                <ListGroup.Item action variant="light" key={track.md5} className="showList">
                  <div className="list-group-item" onClick={() => { this.setState({ playing: false, currentTrack: track.url
                   }) }}>
                       <FaPlay />  {track.track} - {track.title}
                      <span className="badge">{track.length}</span>
                  </div>
                </ListGroup.Item>
              )}
          </ListGroup>
        </div>

      {/*
        <ReactJWPlayer
          playerId='jwplayer_1'
          playerScript='https://cdn.jwplayer.com/libraries/ePODmTX6.js'
          playlist={this.state.playlist}
        />
        <MediaPlayer playlist={this.state.audioFiles} />
      */  }
        <Link to='/'>Back</Link>
        <img src="https://archive.org/download/etree/lma.jpg" alt="Archive.org Live Music Archive" width="100"/>
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
