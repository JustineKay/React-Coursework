import React, { Component } from 'react';
import styles from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


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
            return <ErrorBoundary key={person.id}>
                <Person
                  click={() => this.deletePersonHandler(index)} 
                  name={person.name} 
                  age={person.age}
                  key={person.id}
                  changed={(event) => this.nameChangedHandler(event, person.id)} />
              </ ErrorBoundary>
          })}
      </div>
      )

      buttonClass = styles.red
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red);
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles.bold);
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
  }
}

export default App;