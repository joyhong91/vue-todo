<template>
    <div>
        <ul>
            <li v-for="todoItem, index in todoItems" class="shadow" v-bind:key="todoItem.key">
                <i class="fa-solid fa-check checkBtn" v-on:click="toggleComplete(todoItem,index)" v-bind:class="{checkBtnCompleted: todoItem.completed}"></i>
                <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
                <span class="removeBtn" v-on:click="removeTodo(todoItem.item, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    //로컬스토리지에서 꺼내서 담을 데이터선언
    data: function() {
        return {
            todoItems: []
        }
    },
    methods: {
        removeTodo: function(itemParam, index) {
            console.log("Here");
            localStorage.removeItem(itemParam);
            this.todoItems.splice(index, 1);
        },
        toggleComplete: function(itemObj, index) {
            var itemParam = itemObj.item;

            itemObj.completed = !itemObj.completed;
            localStorage.removeItem(itemParam);
            localStorage.setItem(itemParam, JSON.stringify(itemObj));
        }
    },
    created: function() {
        var localStorageItem = "";
        if(localStorage.length > 0 ) {
            for(var i = 0; i < localStorage.length; i++) {
                localStorageItem = localStorage.key(i);
                if(localStorageItem != "" && localStorageItem !== 'loglevel:webpack-dev-server') {
                    this.todoItems.push(JSON.parse(localStorage.getItem(localStorageItem)));
                }
            }
        }

    }
    
}
</script>

<style scoped>
ul {
    padding-left: 0;
}
li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: #fff;
    border-radius: 5px;
}
.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}
.checkBtnCompleted {
    color: #b3adad;
}

.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}

.removeBtn {
    margin-left: auto;
    color: #de4343;
}
</style>