<template>
    <div>
        <dl>
            <dt v-show="propsData.todo.length > 0">해야하는거야 게으르지마</dt>
            <!-- TODO v-if로  section나누기 -->
            <dd v-for="todoItem, index in propsData.todo" class="shadow" v-bind:key="todoItem.key">
                <i class="fa-solid fa-check checkBtn" v-on:click="clickToggleItem('todo', index)" v-bind:class="{checkBtnCompleted: todoItem.completed}"></i>
                <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
                <span class="removeBtn" v-on:click="clickDeleteBtn(todoItem.item, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </dd>
        </dl>
        
        <dl>
            <dt v-show="propsData.completed.length > 0">다했어! 잘했어!</dt>
            <dd v-for="completedItem, index in propsData.completed" class="shadow" v-bind:key="completedItem.key">
                <i class="fa-solid fa-check checkBtn checkBtnCompleted" v-on:click="clickToggleItem('completed', index)"></i>
                <span class="textCompleted">{{ completedItem.item }}</span>
                <span class="removeBtn" v-on:click="clickDeleteBtn(completedItem.item, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    props: ['propsData'],
    methods: {
        clickDeleteBtn: function(itemParam, index) {
            this.$emit('emitRemoveItem', itemParam, index);
        },
        clickToggleItem: function(status, index) {
            this.$emit('emitToggleItem', status, index);
        }
    }
}
</script>

<style scoped>
dl {
    padding-left: 0;
}
dd {
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