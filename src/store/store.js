import Vue from 'vue';
import Vuex from 'vuex';
import todoApp from './modules/todoApp'

//Vue를 사용할때 글로벌 펑션을 추가할때 use를 쓴다.
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        todoApp
    }
});