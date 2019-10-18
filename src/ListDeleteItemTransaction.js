class ListDeleteItemTransaction {

    constructor(initIndex, initItem, initDeleteFunction, initRestoreFunction){
        
        this.currentIndex = initIndex;
        this.item = initItem;        
        this.deleteFunction = initDeleteFunction;
        this.restoreFunction = initRestoreFunction;
    }
    
    setCurrent(newCurrent) {
        this.currentIndex = newCurrent;
    }
    
    doTransaction()  {
      
       this.deleteFunction(this.currentIndex);
    }
    
    undoTransaction()  {
       
       this.restoreFunction(this.currentIndex, this.item);
    
    } 
} export default ListDeleteItemTransaction;
