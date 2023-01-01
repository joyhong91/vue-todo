<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- v-on:하위컴포넌트에서 발생시킨 이벤트 이름="현재컴포넌트의 메서드명" -->
    <TodoInput v-on:emitAddItem="addItem"></TodoInput>
    <!-- v-bind: 내려보낼 프롭스 속성 이름 = "현재 위치의 컴포넌트 데이터 속성" -->
    <TodoList v-bind:propsData="{ todo: todoItems, completed: completedItems }" v-on:emitRemoveItem="removeItem"
      v-on:emitToggleItem="toggleItem"></TodoList>
    <TodoFooter v-on:emitRemoveAllItems="removeAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data() {
    return {
      todoItems: [],
      completedItems: []
    }
  },
  methods: {
    addItem(todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeItem(status, itemParam, index) {
      const targetItems = status == 'todo' ? this.todoItems : this.completedItems;
      localStorage.removeItem(itemParam);
      targetItems.splice(index, 1);
    },
    removeAllItems() {
      localStorage.clear();
      this.todoItems = [];
      this.completedItems = [];
    },
    toggleItem (status, index) {
      const isTodo = status === 'todo';
      const itemObj = isTodo ? this.todoItems[index] : this.completedItems[index];
      const item = itemObj.item;

      itemObj.completed = !itemObj.completed;

      localStorage.removeItem(item);
      localStorage.setItem(item, JSON.stringify(itemObj));

      //todo --> completed
      if (isTodo) {
        this.todoItems.splice(index, 1);
        this.completedItems.push(itemObj);
      } else {
        this.completedItems.splice(index, 1);
        this.todoItems.push(itemObj);
      }

    }
  },
  created () {
    let itemKey = "";
    let itemObj = {};
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        itemKey = localStorage.key(i);

        if (itemKey != "" && itemKey !== 'loglevel:webpack-dev-server') {
          itemObj = JSON.parse(localStorage.getItem(itemKey));
          if (itemObj.completed) {
            this.completedItems.push(itemObj);
          } else {
            this.todoItems.push(itemObj);
          }
        }
      }
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }

}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
