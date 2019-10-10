import React, { Component } from "react";

export class ListItemCard extends Component {

  moveItemUp = (e) => {
      e.stopPropagation();
      let itemIndex = this.props.todoList.items.indexOf(this.props.listItem);
      if ((0 < itemIndex) && (itemIndex < this.props.todoList.items.length)) {
          let temp = this.props.todoList.items[itemIndex];
          this.props.todoList.items[itemIndex] = this.props.todoList.items[itemIndex-1];
          this.props.todoList.items[itemIndex-1] = temp;
          this.props.loadList(this.props.todoList);
      }    
  }

  moveItemDown = (e) => {
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(this.props.listItem);
     if ((this.props.todoList.items.length > 1) && (itemIndex < this.props.todoList.items.length-1)) {
        let temp = this.props.todoList.items[itemIndex];
        this.props.todoList.items[itemIndex] = this.props.todoList.items[itemIndex+1];
        this.props.todoList.items[itemIndex+1] = temp;
        this.props.loadList(this.props.todoList);
    }    
}

  deleteItem = (e) => {
    e.stopPropagation();
    let itemIndex = this.props.todoList.items.indexOf(this.props.listItem);
    this.props.todoList.items.splice(itemIndex, 1);
    this.props.loadList(this.props.todoList);
  }

  stopMove = (e) => {
    e.stopPropagation();
  }

  render() {
    return (
      <div className="list_item_card" onClick ={this.props.goEdit}>
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
          <span className={this.props.todoList.items.indexOf(this.props.listItem) === 0 ? "list_item_card_button_disable" : "list_item_card_button"} onClick={this.props.todoList.items.indexOf(this.props.listItem) === 0 ? this.stopMove : this.moveItemUp } > &#x21e7; </span>
          <span className={this.props.todoList.items.indexOf(this.props.listItem) === (this.props.todoList.items.length - 1) ? "list_item_card_button_disable" : "list_item_card_button"} onClick={this.props.todoList.items.indexOf(this.props.listItem) === (this.props.todoList.items.length - 1) ? this.stopMove : this.moveItemDown }> &#x21e9; </span>
          <span className="list_item_card_button" onClick={this.deleteItem} > &#10005; </span>
        </div>
      </div>
    );
  }
}

export default ListItemCard;
