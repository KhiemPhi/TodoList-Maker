import React, { Component } from "react";
import ListHeading from "./ListHeading";
import ListItemsTable from "./ListItemsTable";
import ListTrash from "./ListTrash";
import ListNameChangeTransaction from "../../ListNameChangeTransaction";

import PropTypes from "prop-types";
import { thisExpression } from "@babel/types";

class ListScreen extends Component {
  

  getListName = () => {
    if (this.props.todoList) {
      let name = this.props.todoList.name;
      return name;
    } else return "";
  };
  getListOwner = () => {
    if (this.props.todoList) {
      let owner = this.props.todoList.owner;
      return owner;
    }
  };
  showDialog = () => {
    this.refs.dialogShow.classList.add("is_visible");
  };

  hideDialog = () => {
    this.refs.dialogShow.classList.remove("is_visible");
  };

  unDoAndRedoDetect = event => {
    if (event.key === "z" && event.ctrlKey) {
      console.log("Cltr+z Pressed");
      this.props.transactionStack.undoTransaction();
    } else if (event.key === "y" && event.ctrlKey) {
      console.log("Cltr+y Pressed");
      this.props.transactionStack.doTransaction();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.unDoAndRedoDetect, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.unDoAndRedoDetect, false);
  }

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
                onBlur={this.props.addListNameChangeTransaction}
                id="list_name_textfield"
              />
            </div>
            <div id="list_details_owner_container" className="text_toolbar">
              <span id="list_owner_prompt">Owner:</span>
              <input
                value={this.getListOwner()}
                type="text"
                onChange={this.props.setListOwner}
                onBlur={this.props.addListOwnerChangeTransaction}
                id="list_owner_textfield"
              />
            </div>
          </div>

          <ListItemsTable
            todoList={this.props.todoList}
            loadList={this.props.loadList}
            sortItemsByTask={this.sortItemsByTask}
            sortItemsByDueDate={this.sortItemsByDueDate}
            sortItemsByStatus={this.sortItemsByStatus}
            goEdit={this.props.goEdit}
            goList={this.props.goList}
            currentEditItem={this.props.currentEditItem}
            newItemAdded={this.props.newItemAdded}
            transactionStack={this.props.transactionStack}
          />
        </div>
      </div>
    );
  }
}

export default ListScreen;
