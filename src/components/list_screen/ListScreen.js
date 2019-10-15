import React, { Component } from "react";
import ListHeading from "./ListHeading";
import ListItemsTable from "./ListItemsTable";
import ListTrash from "./ListTrash";
import PropTypes from "prop-types";
import { thisExpression } from "@babel/types";
const ItemSortCriteria = {
  SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
  SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
  SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
  SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
  SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
  SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
  
};

class ListScreen extends Component {   
 
  state = {
    currentItemSortCriteria: null
  };

   /**
   * This method tests to see if the current sorting criteria is the same as the argument.
   *
   * @param {ItemSortCriteria} testCriteria Criteria to test for.
   * 
   * Arrow function pointing to class, regular function pointing to instance
   */ 
  
  isCurrentItemSortCriteria = (testCriteria) => {
    return this.state.currentItemSortCriteria === testCriteria;
  }

  sortItemsByDueDate = () => {
    // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
    if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
        this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
    }
    // ALL OTHER CASES SORT BY INCREASING
    else {
        this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
    }
}

sortItemsByStatus = () => {
  // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
  if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
     this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
  }
  // ALL OTHER CASES SORT BY INCREASING
  else {
      this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
  }
}

  sortItemsByTask = () => {    
    // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
    if (
      this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
    ) {
      this.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
    }
    // ALL OTHER CASES SORT BY INCREASING
    else {
      this.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
    }
  }
  /**
   * This method sorts the todo list items according to the provided sorting criteria.
   *
   * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
   */
  sortTasks = (sortingCriteria) => {
    this.setState({ currentItemSortCriteria: sortingCriteria });
    this.props.todoList.items.sort(this.compare);
    this.props.loadList(this.props.todoList);
  } 

  /**
   * This method compares two items for the purpose of sorting according to what
   * is currently set as the current sorting criteria.
   *
   * @param {TodoListItem} item1 First item to compare.
   * @param {TodoListItem} item2 Second item to compare.
   */
  compare = (item1, item2) => { 
    // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
    if (
      this.isCurrentItemSortCriteria(
        ItemSortCriteria.SORT_BY_TASK_DECREASING
      ) ||
      this.isCurrentItemSortCriteria(
        ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING
      ) ||
      this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)
    ) {
      let temp = item1;
      item1 = item2;
      item2 = temp;
    }
    // SORT BY ITEM DESCRIPTION
    if (
      this.isCurrentItemSortCriteria(
        ItemSortCriteria.SORT_BY_TASK_INCREASING
      ) ||
      this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
    ) {
      if (item1.description < item2.description) return -1;
      else if (item1.description > item2.description) return 1;
      else return 0;
    }
    // SORT BY DUE DATE
    else if (
      this.isCurrentItemSortCriteria(
        ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
      ) ||
      this.isCurrentItemSortCriteria(
        ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING
      )
    ) {
      let dueDate1 = item1.due_date;
      let dueDate2 = item2.due_date;
      let date1 = new Date(dueDate1);
      let date2 = new Date(dueDate2);
      if (date1 < date2) return -1;
      else if (date1 > date2) return 1;
      else return 0;
    }
    // SORT BY COMPLETED
    else {
      if (item1.completed < item2.completed) return -1;
      else if (item1.completed > item2.completed) return 1;
      else return 0;
    }
  }

  getListName = () => {
    if (this.props.todoList) {
      let name = this.props.todoList.name;
      return name;
    } else return "";
  }
  getListOwner = () => {
    if (this.props.todoList) {
      let owner = this.props.todoList.owner;
      return owner;
    }
  }
  showDialog = () => {
    this.refs.dialogShow.classList.add("is_visible");
  };

  hideDialog = () => {
    this.refs.dialogShow.classList.remove("is_visible");
  };

  render() {
    
    return (
      <div>
        <div
          className="modal"
          id="modal_yes_no_dialog"
          dataanimation="slideInOutLeft"
          ref="dialogShow"
        >
          <div className="modal_dialog">
            <header className="dialog_header">Delete list?</header>
            <section className="dialog_content">
              <p>
                <strong>Are you sure you want to delete this list?</strong>
              </p>
            </section>
            <button id="dialog_yes_button" onClick={this.props.deleteList}>
              Yes
            </button>
            <button id="dialog_no_button" onClick={this.hideDialog}>
              No
            </button>
            <footer className="dialog_footer">
              The list will not be retreivable.
            </footer>
          </div>
        </div>

        <div id="todo_list">
          <ListHeading goHome={this.props.goHome} />
          <ListTrash showDialog={this.showDialog} />
          <div id="list_details_container">
            <div id="list_details_name_container" className="text_toolbar">
              <span id="list_name_prompt">Name:</span>
              <input
                value={this.getListName()}
                type="text"
                onChange={this.props.setListName}
                id="list_name_textfield"
              />
            </div>
            <div id="list_details_owner_container" className="text_toolbar">
              <span id="list_owner_prompt">Owner:</span>
              <input
                value={this.getListOwner()}
                type="text"
                onChange={this.props.setListOwner}
                id="list_owner_textfield"
              />
            </div>
          </div>
          
          <ListItemsTable todoList={this.props.todoList} loadList = {this.props.loadList} sortItemsByTask ={this.sortItemsByTask} sortItemsByDueDate={this.sortItemsByDueDate} sortItemsByStatus={this.sortItemsByStatus} goEdit = {this.props.goEdit}
          goList = {this.props.goList} currentEditItem = {this.props.currentEditItem}  newItemAdded = {this.props.newItemAdded}/>
        </div>
      </div>
    );
  }
}



export default ListScreen;
