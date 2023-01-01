import Vue from 'vue';
import Vuex from 'vuex';

//Vue를 사용할때 글로벌 펑션을 추가할때 use를 쓴다.
Vue.use(Vuex);

const storage = {
    fetch() {
        //=fetch: function() {}
        
        const todoArr = [];
        const completedArr = [];

        let itemKey = "";
        let itemObj = {};
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                itemKey = localStorage.key(i);

                if (itemKey != "" && itemKey !== 'loglevel:webpack-dev-server') {
                    itemObj = JSON.parse(localStorage.getItem(itemKey));

                    if (itemObj.completed) {
                        completedArr.push(itemObj);
                    } else {
                        todoArr.push(itemObj);
                    }
                }
            }
        }

        return { todo: todoArr, completed: completedArr };
    },
};

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()['todo'],
        completedItems: storage.fetch()['completed'],
    },
    getters: {
        todoItems(state) {
            return state.todoItems;
        },
        completedItems(state) {
            return state.completedItems;
        }
    },
    mutations: {
        addItem(state, itemParam) {
            const obj = { completed: false, item: itemParam };
            localStorage.setItem(itemParam, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeItem(state, {itemParam, index}) {
            const targetItems = !itemParam.completed ? state.todoItems : state.completedItems;
            localStorage.removeItem(itemParam.item);
            targetItems.splice(index, 1);
        },
        removeAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
            state.completedItems = [];
        },
        toggleItem (state, {isDone, index}) {
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
    }
});