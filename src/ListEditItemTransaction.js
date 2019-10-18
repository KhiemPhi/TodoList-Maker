class ListEditItemTransaction {

    constructor(initOldItem, initNewItem, initMakeChangesFunction, initRevertChangesFunction){
        
        this.oldItem = initOldItem; 
        this.newItem = initNewItem;      
        this.makeChangesFunction = initMakeChangesFunction;
        this.revertChangesFunction = initRevertChangesFunction;
    }
    
       
    doTransaction()  {
      
      this.makeChangesFunction(this.newItem);
    }
    
    undoTransaction()  {
       
       this.revertChangesFunction(this.oldItem);
    
    } 
} export default ListEditItemTransaction;
