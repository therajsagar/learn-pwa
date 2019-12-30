import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
export default class App extends Component {
  state = {
    items: [],
    loading: true,
    todoItem: ""
  };

  componentDidMount() {
    fetch("http://localhost:4567/items.json")
      .then(response => response.json())
      .then(items => {
        this.setState({ items, loading: false });
      });
  }

  addItem = e => {
    e.preventDefault();

    fetch("http://localhost:4567/items.json", {
      method: "POST",
      body: JSON.stringify({ item: this.state.todoItem }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(items => {
        this.setState({ items });
      });

    this.setState({ todoItem: "" });
  };

  deleteItem = itemId => {
    fetch("http://localhost:4567/items.json", {
      method: "DELETE",
      body: JSON.stringify({ id: itemId }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(items => {
        this.setState({ items });
      });
  };

  handleChange = e => {
    const todoItem = e.target.value;
    if (todoItem.trim()) {
      this.setState({ todoItem });
    }
  };

  render() {
    const { todoItem, loading, items } = this.state;
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <img src={logo} className="App-logo" alt="logo" />
            Todo List
          </span>
        </nav>

        <div className="px-3 py-2">
          <form className="form-inline my-3" onSubmit={this.addItem}>
            <div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
              <input
                className="form-control col-12"
                placeholder="What do you need to do?"
                value={todoItem}
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-2 col-4 col-sm-2"
            >
              Add
            </button>
          </form>

          {loading ? (
            <p>Loading...</p>
          ) : !items.length ? (
            <div className="alert alert-secondary">No items - all done!</div>
          ) : (
                <table className="table table-striped">
                  <tbody>
                    {items.map((item, i) => {
                      return (
                        <tr key={item.id} className="row">
                          <td className="col-1">{i + 1}</td>
                          <td className="col-10">{item.item}</td>
                          <td className="col-1">
                            <button
                              type="button"
                              className="close"
                              aria-label="Close"
                              onClick={() => this.deleteItem(item.id)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
        </div>
      </div>
    );
  }
}
