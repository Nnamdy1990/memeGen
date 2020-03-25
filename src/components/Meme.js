import React, { Component } from "react";

class Meme extends Component {
  constructor() {
    super();
    this.state = {
      toptext: "",
      bottomtext: "",
      randomImage: "https://i.imgflip.com/26am.jpg",
      allMemesImg: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({
          allMemesImg: memes
        });
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemesImg.length);
    const randMeme =
      this.state.allMemesImg[randNum] && this.state.allMemesImg[randNum].url;
    this.setState({
      randomImage: randMeme
    });
  }
  render() {
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='toptext'
            placeholder='Top Text'
            value={this.state.toptext}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='bottomtext'
            placeholder='Bottom Text'
            value={this.state.bottomtext}
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className='thememe'>
          <img src={this.state.randomImage} alt='random images' />
          <p className='top'>{this.state.toptext}</p>
          <p className='bottom'>{this.state.bottomtext}</p>
        </div>
      </div>
    );
  }
}

export default Meme;
