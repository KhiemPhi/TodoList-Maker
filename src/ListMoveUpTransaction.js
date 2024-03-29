class ListMoveUpTransaction {

    constructor(initIndex, initIndexToUp, initIndexUpFunction){
        
        this.newIndex = initIndexToUp;
        this.oldIndex = initIndex;
        this.currentIndex = initIndex;
        this.IndexUpFunction = initIndexUpFunction;
    }
    
    setCurrent(newCurrent) {
        this.currentIndex = newCurrent;
    }
    
    doTransaction()  {
       this.currentIndex = this.setCurrent(this.newIndex);
       this.IndexUpFunction(this.oldIndex, this.newIndex);
    }
    
    undoTransaction()  {
       this.currentIndex = this.setCurrent(this.oldIndex); 
       this.IndexUpFunction(this.newIndex, this.oldIndex);
    
    } 
} export default ListMoveUpTransaction;
