import React from 'react';
import axios from 'axios';

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state={
      coordinateX: 2,
      coordinateY: 2,
      message: '',
      moves: 0,
      grid: ['', '', '', '', 'B', '', '', '', ''],
      value: ''
    };
  }

  gridHandler = (coordinateX, coordinateY) => {
    if (coordinateX === 1 && coordinateY === 1) {
      return ['B', '', '', '', '', '', '', '', '']
    }
    if (coordinateX === 2 && coordinateY === 1) {
      return ['', 'B', '', '', '', '', '', '', '']
    }
     if (coordinateX === 3 && coordinateY === 1) {
      return ['', '', 'B', '', '', '', '', '', '']
    }
    if (coordinateX === 1 && coordinateY === 2) {
      return ['', '', '', 'B', '', '', '', '', '']
    }
    if (coordinateX === 2 && coordinateY === 2) {
      return ['', '', '', '', 'B', '', '', '', '']
    }
    if (coordinateX === 3 && coordinateY === 2) {
      return ['', '', '', '', '', 'B', '', '', '']
    }
    if (coordinateX === 1 && coordinateY === 3) {
      return ['', '', '', '', '', '', 'B', '', '']
    }
    if (coordinateX === 2 && coordinateY === 3) {
      return ['', '', '', '', '', '', '', 'B', '']
    }
    if (coordinateX === 3 && coordinateY === 3) {
      return ['', '', '', '', '', '', '', '', 'B']
    }
  }

  handleUp = () => {
    if (this.state.coordinateY === 1) {
      this.setState({...this.state, 
        coordinateY: 1, 
        message: "You can't go up",
        grid: this.gridHandler(this.state.coordinateX, this.state.coordinateY)
      });
    } else{
    // when you press up, update the Y coordinate to subtract by 1
    this.setState({...this.state, 
      coordinateY: this.state.coordinateY - 1,  
      moves: this.state.moves +1, 
      message: '',
      grid: this.gridHandler(this.state.coordinateX, this.state.coordinateY -1)
      });
    }
    
  }
  handleDown= () => {
    //this checks if the max number has already been reached
    if (this.state.coordinateY === 3) {
      this.setState({...this.state, 
        coordinateY: 3,  
        message: "You can't go down",
        grid: this.gridHandler(this.state.coordinateX, this.state.coordinateY)
      });
    } else{
    // when you press down, update the Y coordinate to increase by 1
    this.setState({...this.state, 
      coordinateY: this.state.coordinateY + 1,  
      moves: this.state.moves +1, 
      message: '',
      grid: this.gridHandler(this.state.coordinateX, this.state.coordinateY +1)
    });
  }
}
  handleRight = () => {
    if(this.state.coordinateX === 3) {
      this.setState({...this.state, 
        coordinateX: 3,  
        message: "You can't go right",
        grid: this.gridHandler(this.state.coordinateX, this.state.coordinateY)
      });
    }else{
      this.setState({...this.setState, 
        coordinateX: this.state.coordinateX + 1,  
        moves: this.state.moves +1, 
        message: '',
        grid: this.gridHandler(this.state.coordinateX +1, this.state.coordinateY)
      })
    }
  }
  handleLeft = () => {
    if(this.state.coordinateX === 1) {
      this.setState({...this.state, 
        coordinateX: 1,  
        message: "You can't go left",
        grid: this.gridHandler(this.state.coordinateX, this.state.coordinateY)});
    }else{
      this.setState({...this.setState, 
        coordinateX: this.state.coordinateX - 1, 
        moves: this.state.moves +1,
        message: '',
        grid: this.gridHandler(this.state.coordinateX -1, this.state.coordinateY)
      })
    }
  }
  handleReset = () => {
    //when you hit reset, it sets the state back to the default position
    this.setState({
      coordinateX: 2,
      coordinateY: 2,
      message: '',
      moves: 0,
      grid: ['', '', '', '', 'B', '', '', '', ''],
    })
  }

  handleChanges = (evt) => {
    this.setState({...this.state, value: evt.target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const email =this.state.value;
    axios.post(`http://localhost:9000/api/result`, {x: this.state.coordinateX, y: this.state.coordinateY, steps: this.state.moves, email: email})
    .then(res => {
      this.setState({...this.state, message: res.data.message});
    })
    .catch(err => {
     console.log(err.message)
     this.setState({...this.state, message: err.response.data.message})
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.coordinateX}, {this.state.coordinateY})</h3>
          <h3 id="steps">You moved {this.state.moves} times</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((item, idx) => {
            if (item === 'B') {
              return (<div key = {idx} className = 'square active'>{item}</div>)
            } else {
            return (
              <div key = {idx} className="square">{item}</div>
            )}
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleLeft}>LEFT</button>
          <button id="up" onClick={this.handleUp}>UP</button>
          <button id="right" onClick={this.handleRight}>RIGHT</button>
          <button id="down" onClick={this.handleDown}>DOWN</button>
          <button id="reset" onClick={this.handleReset}>reset</button>
        </div>
        <form onSubmit = {this.handleSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email" 
            onChange={this.handleChanges}
            value={this.state.value}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
