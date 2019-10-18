import React, { Component } from "react";
import ListMoveUpTransaction from "../../ListMoveUpTransaction.js";
import ListMoveDownTransaction from "../../ListMoveDownTransaction.js";
import ListDeleteItemTransaction from '../../ListDeleteItemTransaction.js';

export class ListItemCard extends Component {
  

  itemSwap = (index1, index2) => {
    console.log("call");
    let temp = this.props.todoList.items[index1];
    this.props.todoList.items[index1] = this.props.todoList.items[index2];
    this.props.todoList.items[index2] = temp;
    this.props.loadList(this.props.todoList);
  };

  itemDelete = (index) => {
    this.props.todoList.items.splice(index, 1);
    this.props.loadList(this.props.todoList);
  }

  itemRestore = (index, listItem) => {
    this.props.todoList.items.splice(index, 0, listItem);
    this.props.loadList(this.props.todoList);
  }

  moveItemUp = e => {
    // Implment jsTPS
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(this.props.listItem);
    if (0 < itemIndex && itemIndex < this.props.todoList.items.length) {
      this.props.transactionStack.addTransaction(
        new ListMoveUpTransaction(itemIndex, itemIndex - 1, this.itemSwap)
      );
    }
  };

  moveItemDown = e => {
    // Implement jsTPS
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(this.props.listItem);
    if (
      this.props.todoList.items.length > 1 &&
      itemIndex < this.props.todoList.items.length - 1
    ) {
      this.props.transactionStack.addTransaction(
        new ListMoveDownTransaction(itemIndex, itemIndex + 1, this.itemSwap)
      );
    }
  };

  deleteItem = e => {
    // Implement jsTPS
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(this.props.listItem);
    this.props.transactionStack.addTransaction(new ListDeleteItemTransaction(itemIndex, this.props.listItem, this.itemDelete, this.itemRestore));
  };

  stopMove = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <div
        className="list_item_card"
        onClick={() => this.props.goEdit(this.props.listItem, false)}
      >
        <div className="list_item_card_description">
          {this.props.listItem.description}
        </div>
        <div className="list_item_card_assigned_to">
          Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
        </div>
        <div className="list_item_card_due_date">
          {this.props.listItem.due_date}
        </div>
        <div
          className={
            this.props.listItem.completed
              ? "list_item_card_completed"
              : "list_item_card_not_completed"
          }
        >
          {this.props.listItem.completed ? "Completed" : "Pending"}
        </div>
        <div id="list_item_card_toolbar" className="list_item_card_toolbar">
          <span
            className={
              this.props.todoList.items.indexOf(this.props.listItem) === 0
                ? "list_item_card_button_disable"
                : "list_item_card_button"
            }
            onClick={
              this.props.todoList.items.indexOf(this.props.listItem) === 0
                ? this.stopMove
                : this.moveItemUp
            }
          >
            {" "}
            &#x21e7;{" "}
          </span>
          <span
            className={
              this.props.todoList.items.indexOf(this.props.listItem) ===
              this.props.todoList.items.length - 1
                ? "list_item_card_button_disable"
                : "list_item_card_button"
            }
            onClick={
              this.props.todoList.items.indexOf(this.props.listItem) ===
              this.props.todoList.items.length - 1
                ? this.stopMove
                : this.moveItemDown
            }
          >
            {" "}
            &#x21e9;{" "}
          </span>
          <span className="list_item_card_button" onClick={this.deleteItem}>
            {" "}
            &#10005;{" "}
          </span>
        </div>
      </div>
    );
  }
}

export default ListItemCard;
