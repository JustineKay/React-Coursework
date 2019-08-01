import React, { Component } from 'react';
// import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';


// const app = props => {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: 'Claire', age: 36},
//       { name: 'Tony', age: 64},
//       { name: 'Yuji', age: 4}
//     ]
//   });

//   const [otherState, setOtherState] = useState('To be or not to be?');
//   console.log(personsState, otherState);

//   const switchNameHandler = () => {
//     console.log('Was clicked!');
//     setPersonsState({
//       persons: [
//         { name: 'Claire Bear', age: 36},
//         { name: 'Tony', age: 87},
//         { name: 'Yuji', age: 4}
//       ]
//     })

//     setOtherState({
//       otherState:'That is not the question'
//     })
//   }
  
//   return (
//     <div className="App">
//       <h1>Helloooo, React app here.</h1>
//       <p>This is really working!</p>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age} >My Hobbies: Feeding stray cats</Person>
//       <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
//     </div>
//   );
// };

class App extends Component {
  state = {
    persons: [
      { name: 'Claire', age: 36},
      { name: 'Tony', age: 64},
      { name: 'Yuji', age: 4}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    console.log('Was clicked!');
    // Don't do this -> this.persons[0].name = 'Claire Bear'
    this.setState({
      persons: [
        { name: 'Claire Bear', age: 36},
        { name: newName, age: 87},
        { name: 'Yuji', age: 4}
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
        { name: 'Claire Bear', age: 36},
        { name: event.target.value, age: 87},
        { name: 'Yuji', age: 4}
      ]
    })
  }

  togglePersonsHandler = (event) => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Antonia')}
          changed={this.nameChangedHandler} >My Hobbies: Feeding stray cats</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}/>
      </div>
      )
    }


    return (
      <div className="App">
        <h1>Helloooo, React app here.</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Show Peeps</button>
        {persons}
      </div>
    );
    // The above code does what is described below because it is JSX
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', 'Helllooo, is this thing on??'))
  }
}

export default App;
// export default app;