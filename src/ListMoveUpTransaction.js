class ListMoveUpTransaction {

    constructor(initIndex, initIndexToChange, initIndexChangeFunction){
        
        this.newIndex = initIndexToChange;
        this.oldIndex = initIndex;
        this.currentIndex = initIndex;
        this.IndexChangeFunction = initIndexChangeFunction;
    }
    
    setCurrent(newCurrent) {
        this.currentIndex = newCurrent;
    }
    
    doTransaction()  {
       this.currentIndex = this.setCurrent(this.newIndex);
       this.IndexChangeFunction(this.newIndex);
    }
    
    undoTransaction()  {
       this.currentIndex = this.setCurrent(this.oldIndex); 
       this.IndexChangeFunction(this.oldIndex);
    
    } 
} export default ListMoveUpTransaction;
