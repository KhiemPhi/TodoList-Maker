class ListAddNewItemTransaction {

    constructor(initItem, initDeleteFunction, initAddItemFunction){
        
        this.item = initItem;        
        this.deleteFunction = initDeleteFunction;
        this.addItemFunction = initAddItemFunction;
    }
    
       
    doTransaction()  {
      
       this.addItemFunction(this.item);
    }
    
    undoTransaction()  {
       
       this.deleteFunction();
    
    } 
} export default ListAddNewItemTransaction;
