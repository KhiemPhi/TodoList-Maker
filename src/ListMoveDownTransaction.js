class ListMoveDownTransaction {

    constructor(initIndex, initIndexToDown, initIndexDownFunction){
        
        this.newIndex = initIndexToDown;
        this.oldIndex = initIndex;
        this.currentIndex = initIndex;
        this.IndexDownFunction = initIndexDownFunction;
    }
    
    setCurrent(newCurrent) {
        this.currentIndex = newCurrent;
    }
    
    doTransaction()  {
       this.currentIndex = this.setCurrent(this.newIndex);
       this.IndexDownFunction(this.oldIndex, this.newIndex);
    }
    
    undoTransaction()  {
       this.currentIndex = this.setCurrent(this.oldIndex); 
       this.IndexDownFunction(this.newIndex, this.oldIndex);
    
    } 
} export default ListMoveDownTransaction;
