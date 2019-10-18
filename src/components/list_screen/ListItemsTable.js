import React, { Component } from "react";
import ListItemCard from "./ListItemCard";
import ItemScreen from "../item_screen/ItemScreen";
import ListSortTransaction from '../../ListSortTransaction';

export class ListItemsTable extends Component {
  state = {
    taskOrder: true,
    dateOrder: true,
    statusOrder: true,
    unSorted: true

  }
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

  sortItemsByTaskTransaction  = () => {
    if (this.state.taskOrder || this.state.unSorted){
      this.props.todoList.items.sort( (itemA, itemB) => itemA.description > itemB.description    );
    }else{
      this.props.todoList.items.sort( (itemA, itemB) => itemA.description < itemB.description    );
    }
    this.setState({taskOrder: !this.state.taskOrder});  
    this.setState({unSorted: false});  
    this.props.loadList(this.props.todoList);
  }

  restoreTransactionUnSortedTask = (list) => {
    for (var i = 0; i < this.props.todoList.items.length; i++){
      this.props.todoList.items[i].description = list.items[i].description;
      this.props.todoList.items[i].due_date = list.items[i].due_date;
      this.props.todoList.items[i].assigned_to = list.items[i].assigned_to;
      this.props.todoList.items[i].completed = list.items[i].completed;
      this.props.todoList.items[i].key = list.items[i].key;
    }
    this.setState({taskOrder: !this.state.taskOrder}); 
    this.setState({unSorted: true}); 
    this.props.loadList(this.props.todoList);
  }

  restoreTransactionSortedTask = (list) => {
    for (var i = 0; i < this.props.todoList.items.length; i++){
      this.props.todoList.items[i].description = list.items[i].description;
      this.props.todoList.items[i].due_date = list.items[i].due_date;
      this.props.todoList.items[i].assigned_to = list.items[i].assigned_to;
      this.props.todoList.items[i].completed = list.items[i].completed;
      this.props.todoList.items[i].key = list.items[i].key;
    }
    this.setState({taskOrder: !this.state.taskOrder}); 
    this.setState({unSorted: false});
    this.props.loadList(this.props.todoList);
  }

  sortItemsByDueDateTransaction  = () => {
    if (this.state.dateOrder || this.state.unSorted){
      this.props.todoList.items.sort( (itemA, itemB) => itemA.due_date > itemB.due_date  );
    }else{
      this.props.todoList.items.sort( (itemA, itemB) => itemA.due_date < itemB.due_date   );
    }
    this.setState({dateOrder: !this.state.dateOrder});  
    this.setState({unSorted: false});  
    this.props.loadList(this.props.todoList);
  }

  restoreTransactionUnSortedDueDate = (list) => {
    for (var i = 0; i < this.props.todoList.items.length; i++){
      this.props.todoList.items[i].description = list.items[i].description;
      this.props.todoList.items[i].due_date = list.items[i].due_date;
      this.props.todoList.items[i].assigned_to = list.items[i].assigned_to;
      this.props.todoList.items[i].completed = list.items[i].completed;
      this.props.todoList.items[i].key = list.items[i].key;
    }
    this.setState({dateOrder: !this.state.dateOrder}); 
    this.setState({unSorted: true}); 
    this.props.loadList(this.props.todoList);
  }

  restoreTransactionSortedDueDate = (list) => {
    for (var i = 0; i < this.props.todoList.items.length; i++){
      this.props.todoList.items[i].description = list.items[i].description;
      this.props.todoList.items[i].due_date = list.items[i].due_date;
      this.props.todoList.items[i].assigned_to = list.items[i].assigned_to;
      this.props.todoList.items[i].completed = list.items[i].completed;
      this.props.todoList.items[i].key = list.items[i].key;
    }
    this.setState({dateOrder: !this.state.dateOrder}); 
    this.setState({unSorted: false});
    this.props.loadList(this.props.todoList);
  }

  sortItemsByStatusTransaction  = () => {
    if (this.state.statusOrder){
      this.props.todoList.items.sort( (itemA, itemB) => itemA.completed > itemB.completed    );
      
    }else{
      this.props.todoList.items.sort( (itemA, itemB) => itemA.completed < itemB.completed    );
    }
    this.setState({statusOrder: !this.state.statusOrder}); 
    this.setState({unSorted: false});  
    this.props.loadList(this.props.todoList);
  }

  restoreTransactionUnSortedStatus = (list) => {
    for (var i = 0; i < this.props.todoList.items.length; i++){
      this.props.todoList.items[i].description = list.items[i].description;
      this.props.todoList.items[i].due_date = list.items[i].due_date;
      this.props.todoList.items[i].assigned_to = list.items[i].assigned_to;
      this.props.todoList.items[i].completed = list.items[i].completed;
      this.props.todoList.items[i].key = list.items[i].key;
    }
    this.setState({statusOrder: !this.state.statusOrder}); 
    this.setState({unSorted: true}); 
    this.props.loadList(this.props.todoList);
  }

  restoreTransactionSortedStatus = (list) => {
    for (var i = 0; i < this.props.todoList.items.length; i++){
      this.props.todoList.items[i].description = list.items[i].description;
      this.props.todoList.items[i].due_date = list.items[i].due_date;
      this.props.todoList.items[i].assigned_to = list.items[i].assigned_to;
      this.props.todoList.items[i].completed = list.items[i].completed;
      this.props.todoList.items[i].key = list.items[i].key;
    }
    this.setState({statusOrder: !this.state.statusOrder}); 
    this.setState({unSorted: false});
    this.props.loadList(this.props.todoList);
  }

  sortItemsByTask()  {
    let oldList = this.iterationCopy(this.props.todoList);
    let transaction = new ListSortTransaction(  this.state.unSorted , this.sortItemsByTaskTransaction , oldList , this.restoreTransactionUnSortedTask, this.restoreTransactionSortedTask       );
    this.props.transactionStack.addTransaction(transaction);
  }

  sortItemsByDueDate()  {
    let oldList = this.iterationCopy(this.props.todoList);
    let transaction = new ListSortTransaction(  this.state.unSorted , this.sortItemsByDueDateTransaction , oldList , this.restoreTransactionUnSortedDueDate, this.restoreTransactionSortedDueDate       );
    this.props.transactionStack.addTransaction(transaction); 
  }

  sortItemsByStatus()  {
    let oldList = this.iterationCopy(this.props.todoList);
    let transaction = new ListSortTransaction(  this.state.unSorted , this.sortItemsByStatusTransaction , oldList , this.restoreTransactionUnSortedStatus, this.restoreTransactionSortedStatus      );
    this.props.transactionStack.addTransaction(transaction);     
  }


  render() {
    return (
      <div id="list_items_container">
        <div id="list_item_header" className="list_item_header_card">
          <div
            className="list_item_task_header"
            onClick={this.sortItemsByTask.bind(this)}
           
          >
            Task
          </div>
          <div
            className="list_item_due_date_header"
            onClick={this.sortItemsByDueDate.bind(this)}
            
          >
            Due Date
          </div>
          <div
            className="list_item_status_header"
            onClick={this.sortItemsByStatus.bind(this)}
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
