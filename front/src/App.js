import React, { Component } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("/todos/")
      .then((response) => this.setState({ todos: response.data }))
      .catch((error) => console.log(error));
  }

  handleChange(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    });
  }

  render() {
    const todoItems = this.state.todos.map((item) => (
      <TodoItem key={item.id} item={item} handleChange={this.handleChange} />
    ));

    return <div className="todo-list">{todoItems}</div>;
  }
}

export default App;
