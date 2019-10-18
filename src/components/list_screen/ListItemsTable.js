import React, { Component } from "react";
import ListItemCard from "./ListItemCard";
import ItemScreen from "../item_screen/ItemScreen";

export class ListItemsTable extends Component {
  render() {
    return (
      <div id="list_items_container">
        <div id="list_item_header" className="list_item_header_card">
          <div
            className="list_item_task_header"
            onClick={this.props.sortItemsByTask}
           
          >
            Task
          </div>
          <div
            className="list_item_due_date_header"
            onClick={this.props.sortItemsByDueDate}
            
          >
            Due Date
          </div>
          <div
            className="list_item_status_header"
            onClick={this.props.sortItemsByStatus}
          >
            Status
          </div>
        </div>

        {this.props.todoList.items.map(todoItem => (
          <ListItemCard
            key={todoItem.key}
            listItem={todoItem}
            todoList={this.props.todoList}
            loadList={this.props.loadList}
            goEdit={this.props.goEdit}
            currentEditItem={this.props.currentEditItem}
            newItemAdded = {this.props.newItemAdded}
            transactionStack = {this.props.transactionStack}
          />
        ))}
        <div
          className="list_item_add_card"
          onClick={() =>
            this.props.goEdit({
              key: this.props.todoList.length,
              description: "",
              due_date: "",
              assigned_to: "",
              completed: false
            }, true)
          }
        >
          &#x2b;
        </div>
      </div>
    );
  }
}

export default ListItemsTable;
