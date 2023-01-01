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

        return {todo: todoArr, completed: completedArr};
    },
};

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()['todo'],
        completedItems: storage.fetch()['completed'],
    }
});