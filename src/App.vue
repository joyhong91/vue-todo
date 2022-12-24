<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- v-on:하위컴포넌트에서 발생시킨 이벤트 이름="현재컴포넌트의 메서드명" -->
    <TodoInput v-on:emitAddItem="addItem"></TodoInput>
    <!-- v-bind: 내려보낼 프롭스 속성 이름 = "현재 위치의 컴포넌트 데이터 속성" -->
    <TodoList v-bind:propsData="todoItems" v-on:emitRemoveItem="removeItem" v-on:emitToggleItem="toggleItem"></TodoList>
    <TodoFooter v-on:emitRemoveAllItems="removeAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
export default {
  data: function () {
    return {
      todoItems: []
    }
  },
  methods: {
    addItem: function (todoItem) {
      var obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeItem: function (itemParam, index) {
      localStorage.removeItem(itemParam);
      this.todoItems.splice(index, 1);
    },
    removeAllItems: function() {
      localStorage.clear();
      this.todoItems = [];
    },
    toggleItem: function (index) {
      var itemObj = this.todoItems[index];
      var itemParam = itemObj.item;

      itemObj.completed = !itemObj.completed;
      localStorage.removeItem(itemParam);
      localStorage.setItem(itemParam, JSON.stringify(itemObj));
    }
  },
  created: function () {
    var localStorageItem = "";
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        localStorageItem = localStorage.key(i);
        if (localStorageItem != "" && localStorageItem !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorageItem)));
        }
      }
    }

  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
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
