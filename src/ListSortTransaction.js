class ListSortTransaction {
  constructor(initUnsorted, initSortFunction, initDefaultList, initRestoreUnSorted, initRestoreSorted) {
    this.unSorted = initUnsorted;
    this.sortFunction = initSortFunction;
    this.defaultList = initDefaultList;
    this.restoreUnSorted = initRestoreUnSorted;
    this.restoreSorted = initRestoreSorted;
  }

  doTransaction() {
    this.sortFunction();
  }

  undoTransaction() {
    if (this.unSorted){
        this.restoreUnSorted(this.defaultList);
    }else{
        this.restoreSorted(this.defaultList);
    }
  }
}
export default ListSortTransaction;
