const addItem = (state, itemParam) => {
    const obj = { completed: false, item: itemParam };
    localStorage.setItem(itemParam, JSON.stringify(obj));
    state.todoItems.push(obj);
}

const removeItem = (state, {itemParam, index}) => {
    const targetItems = !itemParam.completed ? state.todoItems : state.completedItems;
    localStorage.removeItem(itemParam.item);
    targetItems.splice(index, 1);
}

const removeAllItems = (state) => {
    localStorage.clear();
    state.todoItems = [];
    state.completedItems = [];
}

const toggleItem = (state, {isDone, index}) => {
    const itemObj = !isDone ? state.todoItems[index] : state.completedItems[index];
    const item = itemObj.item;

    itemObj.completed = !itemObj.completed;

    localStorage.removeItem(item);
    localStorage.setItem(item, JSON.stringify(itemObj));

    //todo --> completed
    if (!isDone) {
      state.todoItems.splice(index, 1);
      state.completedItems.push(itemObj);
    } else {
      state.completedItems.splice(index, 1);
      state.todoItems.push(itemObj);
    }

  }

  export { addItem, removeItem, removeAllItems, toggleItem }