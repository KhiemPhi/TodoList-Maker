class ListEditItemTransaction {

    constructor(initOldItem, initMakeChangesFunction, initRevertChangesFunction){
        
        this.item = initOldItem;        
        this.makeChangesFunction = initMakeChangesFunction;
        this.revertChangesFunction = initRevertChangesFunction;
    }
    
       
    doTransaction()  {
      
      this.makeChangesFunction();
    }
    
    undoTransaction()  {
       
       this.revertChangesFunction(this.item);
    
    } 
} export default ListEditItemTransaction;
