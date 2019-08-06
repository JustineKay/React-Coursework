import React, { Component } from 'react';
import styles from './App.module.css';
// import React, { useState } from 'react';
// import './App.css';
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
      { id: '573894', name: 'Claire', age: 36},
      { id: '429389', name: 'Tony', age: 64},
      { id: '324878', name: 'Yuji', age: 4}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    console.log('Was clicked!');
    // Two ways to create a copy of an array

    // older
    // const persons = this.state.persons.slice();

    // preferred
    const persons = [...this.state.persons];
    
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Two ways to create a copy of a single object

    // older
    // const person = Object.assign({}, this.state.persons[personIndex]);

    // preferred
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} )
  }

  togglePersonsHandler = (event) => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    let persons = null;
    let buttonClass = '';

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)} 
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
      </div>
      )

      buttonClass = styles.red
    }

    // let classes = ['red', 'bold'].join(' ');
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles.bold); // classes = ['red', 'bold']
    }

    return (
        <div className={styles.App}>
          <h1>Helloooo, React app here.</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
          className={buttonClass} 
            onClick={this.togglePersonsHandler}>Toggle Peeps</button>
          {persons}
        </div>
    );
    // The above code does what is described below because it is JSX
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', 'Helllooo, is this thing on??'))
  }
}

export default App;
// export default app;