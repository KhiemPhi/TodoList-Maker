import React, { Component } from "react";
import PropTypes from "prop-types";
import ListAddNewItemTransaction from "../../ListAddNewItemTransaction.js";
import ListEditItemTransaction from "../../ListEditItemTransaction.js";

export class ItemScreen extends Component {
  isObject = obj => {
    var type = typeof obj;
    return type === "function" || (type === "object" && !!obj);
  };

  iterationCopy = src => {
    let target = {};
    for (let prop in src) {
      if (src.hasOwnProperty(prop)) {
        // if the value is a nested object, recursively copy all it's properties
        if (this.isObject(src[prop])) {
          target[prop] = this.iterationCopy(src[prop]);
        } else {
          target[prop] = src[prop];
        }
      }
    }
    return target;
  };

  itemDelete = () => {
    this.props.currentList.items.pop();
    this.props.loadList(this.props.currentList);
  };

  itemAdd = listItem => {
    this.props.currentList.items.push(listItem);
    this.props.loadList(this.props.currentList);
  };

  itemMakeChanges = item => {
    this.props.currentEditItem.description = item.description;
    this.props.currentEditItem.assigned_to = item.assigned_to;
    this.props.currentEditItem.due_date = item.due_date;
    this.props.currentEditItem.completed = item.completed;
    this.props.loadList(this.props.currentList);
  };

  itemRevertChanges = item => {
    this.props.currentEditItem.description = item.description;
    this.props.currentEditItem.assigned_to = item.assigned_to;
    this.props.currentEditItem.due_date = item.due_date;
    this.props.currentEditItem.completed = item.completed;
    this.props.loadList(this.props.currentList);
  };

  submitChanges = () => {
    // Must Implement jsTPS share the Transaction Stack with addNewList
    let oldItem = this.iterationCopy(this.props.currentEditItem);
    let newItem = this.iterationCopy(this.props.currentEditItem);
    newItem.description = document.getElementById(
      "item_description_textfield"
    ).value;
    newItem.assigned_to = document.getElementById(
      "item_assigned_to_textfield"
    ).value;
    newItem.due_date = document.getElementById(
      "item_due_date_picker"
    ).value;
    newItem.completed = document.getElementById(
      "item_completed_checkbox"
    ).checked;
    this.props.loadList(this.props.currentList);
    this.props.transactionStack.addTransaction(
      new ListEditItemTransaction(
        oldItem, newItem,
        this.itemMakeChanges,
        this.itemRevertChanges
      )
    );

    if (this.props.newItemAdded) {
      this.props.transactionStack.addTransaction(
        new ListAddNewItemTransaction(
          this.props.currentEditItem,
          this.itemDelete,
          this.itemAdd
        )
      );
    }
  };

  render() {
    return (
      <form id="todo_item">
        <h3 id="item_heading">Item</h3>
        <div id="item_form_container">
          <div id="item_description_prompt" className="item_prompt">
            Description:
          </div>
          <input
            name="description"
            id="item_description_textfield"
            className="item_input"
            type="input"
            defaultValue={this.props.currentEditItem.description}
          />
          <div id="item_assigned_to_prompt" className="item_prompt">
            Assigned To:
          </div>
          <input
            name="assignedTo"
            id="item_assigned_to_textfield"
            className="item_input"
            type="input"
            defaultValue={this.props.currentEditItem.assigned_to}
          />
          <div id="item_due_date_prompt" className="item_prompt">
            Due Date:
          </div>
          <input
            id="item_due_date_picker"
            className="item_input"
            type="date"
            name="dueDate"
            defaultValue={this.props.currentEditItem.due_date}
          />
          <div id="item_completed_prompt" className="item_prompt">
            Completed:
          </div>
          <input
            id="item_completed_checkbox"
            className="item_input"
            type="checkbox"
            name="completed"
            defaultChecked={this.props.currentEditItem.completed}
          />
        </div>
        <button
          id="item_form_submit_button"
          className="item_button"
          onClick={this.submitChanges}
        >
          Submit
        </button>
        <button
          id="item_form_cancel_button"
          className="item_button"
          onClick={this.props.goList}
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default ItemScreen;
