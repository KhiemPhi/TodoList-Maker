import React, { Component } from "react";
import ListItemCard from "./ListItemCard";

export class ListItemsTable extends Component {
  

  render() {
    return (
      <div id="list_items_container">
        <div id="list_item_header" className="list_item_header_card">
          <div
            className="list_item_task_header"
            onClick={this.sortByTask}
          >
            Task
          </div>
          <div
            className="list_item_due_date_header"
            onClick={this.sortByDueDate}
          >
            Due Date
          </div>
          <div
            className="list_item_status_header"
            onClick={this.sortByStatus} //
          >
            Status
          </div>
        </div>

        {this.props.todoList.items.map(todoItem => (
          <ListItemCard key={todoItem.key} listItem={todoItem} todoList={this.props.todoList} loadList = {this.props.loadList} />
        ))}
        <div className="list_item_add_card">&#x2b;</div>
      </div>
    );
  }
}

export default ListItemsTable;
