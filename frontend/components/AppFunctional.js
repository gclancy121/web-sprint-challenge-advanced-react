import React, {useState} from 'react';
import axios from 'axios';

export default function AppFunctional(props) {
  const initialState = {
    coordinateX: 2,
    coordinateY: 2,
    message: '',
    moves: 0,
    grid: ['', '', '', '', 'B', '', '', '', ''],
    value: ''
  };
  const [state, setState] = useState(initialState);
  
  const gridHandler = (coordinateX, coordinateY) => {
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

  const handleLeft = () => {
    if(state.coordinateX === 1) {
      setState({...state, 
        coordinateX: 1,  
        message: "You can't go left",
        grid: gridHandler(state.coordinateX, state.coordinateY)});
    }else{
      setState({...state, 
        coordinateX: state.coordinateX - 1, 
        moves: state.moves +1,
        message: '',
        grid: gridHandler(state.coordinateX -1, state.coordinateY)
      })
    }
  }
  const handleRight = () => {
    if(state.coordinateX === 3) {
      setState({...state, 
        coordinateX: 3,  
        message: "You can't go right",
        grid: gridHandler(state.coordinateX, state.coordinateY)
      });
    }else{
      setState({...state, 
        coordinateX: state.coordinateX + 1,  
        moves: state.moves +1, 
        message: '',
        grid: gridHandler(state.coordinateX +1, state.coordinateY)
      })
    }
  }
  const handleUp = () => {
    if (state.coordinateY === 1) {
      setState({...state, 
        coordinateY: 1, 
        message: "You can't go up",
        grid: gridHandler(state.coordinateX, state.coordinateY)
      });
    } else{
    // when you press up, update the Y coordinate to subtract by 1
    setState({...state, 
      coordinateY: state.coordinateY - 1,  
      moves: state.moves +1, 
      message: '',
      grid: gridHandler(state.coordinateX, state.coordinateY -1)
      });
    }
    
  }
  const handleDown = () => {
    //this checks if the max number has already been reached
    if (state.coordinateY === 3) {
      setState({...state, 
        coordinateY: 3,  
        message: "You can't go down",
        grid: gridHandler(state.coordinateX, state.coordinateY)
      });
    } else{
    // when you press down, update the Y coordinate to increase by 1
    setState({...state, 
      coordinateY: state.coordinateY + 1,  
      moves: state.moves +1, 
      message: '',
      grid: gridHandler(state.coordinateX, state.coordinateY +1)
    });
  }
}
  const handleReset = () => {
    setState({
      coordinateX: 2,
      coordinateY: 2,
      message: '',
      moves: 0,
      grid: ['', '', '', '', 'B', '', '', '', ''],
      value: ''
    })
  }

  const handleChanges = (evt) => {
    setState({...state, value: evt.target.value });
  }


  const handleSubmit = evt => {
    evt.preventDefault();
    const email = state.value;
    axios.post(`http://localhost:9000/api/result`, {x: state.coordinateX, y: state.coordinateY, steps: state.moves, email: email})
    .then(res => {
      console.log(res)
      setState({...state, message: res.data.message})
    })
    .catch(err => {
      console.log(err)
      setState({...state, message: err.response.data.message})
     })
  }
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({state.coordinateX}, {state.coordinateY})</h3>
        <h3 id="steps">You moved {state.moves} times</h3>
      </div>
      <div id="grid">
      {state.grid.map((item, idx) => {
            if (item === 'B') {
              return (<div key = {idx} className = 'square active'>{item}</div>)
            } else {
            return (
              <div key = {idx} className="square">{item}</div>
            )}
          })}
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={handleLeft}>LEFT</button>
        <button id="up" onClick={handleUp}>UP</button>
        <button id="right" onClick={handleRight}>RIGHT</button>
        <button id="down" onClick={handleDown}>DOWN</button>
        <button id="reset" onClick={handleReset}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="email" 
        type="email" 
        placeholder="type email" 
        onChange={handleChanges}
        value={state.value}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
