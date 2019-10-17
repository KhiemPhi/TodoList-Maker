class ListNameChangeTransaction {

    constructor(initName, initNameToChange, initNameChangeFunction){
        
        this.newName = initNameToChange;
        this.oldName = initName;
        this.currentName = initName;
        this.nameChangeFunction = initNameChangeFunction;
    }

    setCurrent(newCurrent) {
        this.currentName = newCurrent;
    }

    doTransaction()  {
       this.currentName = this.setCurrent(this.newName);
       this.nameChangeFunction(this.newName);
    }

    undoTransaction()  {
       this.currentName = this.setCurrent(this.oldName); 
       this.nameChangeFunction(this.oldName);

    }
} export default ListNameChangeTransaction;