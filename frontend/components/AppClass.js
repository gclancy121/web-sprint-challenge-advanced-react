import React from 'react'

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
  

  handleUp = () => {
    if (this.state.coordinateY === 1) {
      this.setState({...this.state, 
        coordinateY: 1, 
        message: "you can't go up"});
    } else{
    // when you press up, update the Y coordinate to subtract by 1
    this.setState({...this.state, 
      coordinateY: this.state.coordinateY - 1,  
      moves: this.state.moves +1, 
      message: '',
      });
    }
  }
  handleDown= () => {
    //this checks if the max number has already been reached
    if (this.state.coordinateY === 3) {
      this.setState({...this.state, 
        coordinateY: 3,  
        message: "you can't go down"});
    } else{
    // when you press down, update the Y coordinate to increase by 1
    this.setState({...this.state, 
      coordinateY: this.state.coordinateY + 1,  
      moves: this.state.moves +1, 
      message: ''})
    }
  }
  handleRight = () => {
    if(this.state.coordinateX === 3) {
      this.setState({...this.state, 
        coordinateX: 3,  
        message: "you can't go right"});
    }else{
      this.setState({...this.setState, 
        coordinateX: this.state.coordinateX + 1,  
        moves: this.state.moves +1, 
        message: ''})
    }
  }
  handleLeft = () => {
    if(this.state.coordinateX === 1) {
      this.setState({...this.state, 
        coordinateX: 1,  
        message: "you can't go left"});
    }else{
      this.setState({...this.setState, 
        coordinateX: this.state.coordinateX - 1, 
        moves: this.state.moves +1,
        message: '',
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
    if (this.state.value==='foo@bar.baz') {
      this.setState({...this.setState, message: 'ERROR! Forbidden email!'})
    } else {
    this.setState({...this.state, message: `${this.state.value} wins!` })
    }
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
