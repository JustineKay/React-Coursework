import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons'; 
import Cockpit from '../components/Cockpit/Cockpit'; 


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

    if ( this.state.showPersons ) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>;
    }

    return (
        <div className={styles.App}>
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler} />
          {persons}
        </div>
    );
  }
}

export default App;