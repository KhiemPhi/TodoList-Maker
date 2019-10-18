import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json';
import HomeScreen from './components/home_screen/HomeScreen';
import ItemScreen from './components/item_screen/ItemScreen';
import ListScreen from './components/list_screen/ListScreen';
import jsTPS from './jsTPS';
import ListNameChangeTransaction from './ListNameChangeTransaction.js';
import ListOwnerChangeTransaction from './ListOwnerChangeTransaction.js';


const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists, // All the currentLists
    currentList: null, // List Currently Being Edited  
    currentEditItem: null, //Item Currently Being Edited  
    newItemAdded: null, // whether a new item will be added to the current list
    transactionStack : new jsTPS(),
    defaultName : null,
    defaultOwner: null,
    defaultList: null
  }

  goHome = () => { // clear all Transaction Stacks
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.setState({transactionStack: new jsTPS()});
  }

  goEdit = (listItem, newItemAdded) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});    
    this.setState({currentEditItem:listItem});
    this.setState({newItemAdded: newItemAdded});
  }

  goList = () => {
    this.setState({currentScreen:AppScreen.LIST_SCREEN});
  }

  deleteList = () => {     
   
    let indexOfList = this.state.todoLists.indexOf(this.state.currentList);
    if (indexOfList >= 0)
      this.state.todoLists.splice(indexOfList, 1);
    this.goHome();
  
  }
  
  loadList = (todoListToLoad) => {  
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    this.setState({defaultName: todoListToLoad.name});
    this.setState({defaultOwner: todoListToLoad.owner});      
  }

 

  setListOwner = (e) => { // List Owner Change must implement jsTPS
     let currentList = this.state.currentList;
     currentList.owner = e.target.value;    
     this.setState({currentList:currentList});
  }

  setListName = (e) => { // List User Change must implement jsTPS
    let currentList = this.state.currentList;    
    currentList.name = e.target.value;        
    this.setState({currentList:currentList});
  }

  addListNameChangeTransaction = (e) => {    
    
    if (this.state.transactionStack.mostRecentTransaction === -1 || !( typeof this.state.transactionStack.getPreviousTransaction() === ListNameChangeTransaction)) {
      this.state.transactionStack.addTransaction(new ListNameChangeTransaction(this.state.defaultName, e.target.value, this.nameChange));
    }else{
      let oldTransaction = this.state.transactionStack.getPreviousTransaction();      
      let oldName = oldTransaction.newName;      
      this.state.transactionStack.addTransaction(new ListNameChangeTransaction(oldName, e.target.value, this.nameChange));     
     
    }   
    this.loadList(this.state.currentList);
  }

  addListOwnerChangeTransaction = (e) => {    
    
    if (this.state.transactionStack.mostRecentTransaction === -1 || !( typeof this.state.transactionStack.getPreviousTransaction() === ListOwnerChangeTransaction)) {
      this.state.transactionStack.addTransaction(new ListOwnerChangeTransaction(this.state.defaultOwner, e.target.value, this.ownerChange));
    }else{
      let oldTransaction = this.state.transactionStack.getPreviousTransaction();      
      let oldName = oldTransaction.newName;      
      this.state.transactionStack.addTransaction(new ListOwnerChangeTransaction(oldName, e.target.value, this.ownerChange));     
     
    }   
    this.loadList(this.state.currentList);
  }

  ownerChange = (owner) => {
    let currentList = this.state.currentList;    
    currentList.owner = owner;        
    this.setState({currentList:currentList});
  }

  nameChange = (name) => {
    let currentList = this.state.currentList;    
    currentList.name = name;        
    this.setState({currentList:currentList});
    
  }

  addNewList () { // Adding New List Item must implement jsTPS
    let newKey = this.state.todoLists.length;    
    let newList = {
      "key": newKey,
      "name": "Unknown",
      "owner": "Unknown",
      "items": []
    } ;
    this.state.todoLists.push(newList);
    this.loadList(newList);
  }

 


  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}
        addNewList = {this.addNewList.bind(this)} />;        
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          deleteList = {this.deleteList.bind(this)}
          loadList = {this.loadList.bind(this)}
          todoList={this.state.currentList}
          setListOwner = {this.setListOwner.bind(this)}
          setListName = {this.setListName.bind(this)}
          goEdit = {this.goEdit.bind(this)}
          transactionStack = {this.state.transactionStack}
          addListNameChangeTransaction = {this.addListNameChangeTransaction.bind(this)}
          addListOwnerChangeTransaction = {this.addListOwnerChangeTransaction.bind(this)}
          
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen goList = {this.goList.bind(this)}
        currentEditItem = {this.state.currentEditItem}
        newItemAdded = {this.state.newItemAdded}
        currentList = {this.state.currentList}
        loadList= {this.loadList.bind(this)}
        transactionStack = {this.state.transactionStack}
       />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;