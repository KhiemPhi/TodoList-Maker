import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

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
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
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
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  setListOwner = (e) => {
     let currentList = this.state.currentList;
     currentList.owner = e.target.value;
     this.setState({currentList:currentList});
  }

  setListName = (e) => {
    let currentList = this.state.currentList;
    currentList.name = e.target.value;
    this.setState({currentList:currentList});
  }

  addNewList () {
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
         
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen goList = {this.goList.bind(this)}
        currentEditItem = {this.state.currentEditItem}
        newItemAdded = {this.state.newItemAdded}
        currentList = {this.state.currentList}
        loadList= {this.loadList.bind(this)}
       />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;