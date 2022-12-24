<template>
    <div>
        <ul>
            <li v-for="todoItem, index in propsData" class="shadow" v-bind:key="todoItem.key">
                <i class="fa-solid fa-check checkBtn" v-on:click="clickToggleItem(index)" v-bind:class="{checkBtnCompleted: todoItem.completed}"></i>
                <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
                <span class="removeBtn" v-on:click="clickDeleteBtn(todoItem.item, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['propsData'],
    methods: {
        clickDeleteBtn: function(itemParam, index) {
            this.$emit('emitRemoveItem', itemParam, index);
        },
        clickToggleItem: function(index) {
            this.$emit('emitToggleItem', index);
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