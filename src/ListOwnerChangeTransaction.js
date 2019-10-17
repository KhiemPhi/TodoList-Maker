class ListOwnerChangeTransaction {

    constructor(initOwner, initOwnerToChange, initOwnerChangeFunction){
        
        this.newOwner = initOwnerToChange;
        this.oldOwner = initOwner;
        this.currentOwner = initOwner;
        this.ownerChangeFunction = initOwnerChangeFunction;
    }

    setCurrent(newCurrent) {
        this.currentOwner = newCurrent;
    }

    doTransaction()  {
       this.currentOwner = this.setCurrent(this.newOwner);
       this.ownerChangeFunction(this.newOwner);
    }

    undoTransaction()  {
       this.currentOwner = this.setCurrent(this.oldOwner); 
       this.ownerChangeFunction(this.oldOwner);

    }
} export default ListOwnerChangeTransaction;