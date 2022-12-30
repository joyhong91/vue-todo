<template>
    <div>
        <p v-show="propsData.todo.length > 0">해야하는거야 게으르지마</p>
        <transition-group name="list" tag ="ul">
            <li v-for="todoItem, index in propsData.todo" class="shadow" :key="todoItem.item+index">
                <i class="fa-solid fa-check checkBtn" v-on:click="clickToggleItem('todo', index)"
                    v-bind:class="{ checkBtnCompleted: todoItem.completed }"></i>
                <span v-bind:class="{ textCompleted: todoItem.completed }">{{ todoItem.item }}</span>
                <span class="removeBtn" v-on:click="clickDeleteBtn('todo', todoItem.item, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </transition-group>

        <p v-show="propsData.completed.length > 0">다했어! 잘했어!</p>
        <transition-group name="list" tag ="ul">
            <li v-for="completedItem, index in propsData.completed" class="shadow" :key="completedItem.item+index">
                <i class="fa-solid fa-check checkBtn checkBtnCompleted"
                    v-on:click="clickToggleItem('completed', index)"></i>
                <span class="textCompleted">{{ completedItem.item }}</span>
                <span class="removeBtn" v-on:click="clickDeleteBtn('completed', completedItem.item, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
export default {
    props: ['propsData'],
    methods: {
        clickDeleteBtn: function (status, itemParam, index) {
            this.$emit('emitRemoveItem', status, itemParam, index);
        },
        clickToggleItem: function (status, index) {
            this.$emit('emitToggleItem', status, index);
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

/* list item transition 효과 구현 */
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from,
/* .list-enter, */
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>