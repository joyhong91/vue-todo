<template>
    <div>
        <p v-show="this.todoItems.length > 0">해야하는거야 게으르지마</p>
        <ul>
            <li v-for="todoItem, index in this.todoItems" class="shadow" :key="todoItem.item + index">
                <i class="fa-solid fa-check checkBtn" v-on:click="toggleItem({isDone: todoItem.completed, index})"
                    v-bind:class="{ checkBtnCompleted: todoItem.completed }"></i>
                <span v-bind:class="{ textCompleted: todoItem.completed }">{{ todoItem.item }}</span>
                <span class="removeBtn" v-on:click="removeItem({itemParam: todoItem, index})">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>

        <p v-show="this.completedItems.length > 0">다했어! 잘했어!</p>
        <ul>
            <li v-for="completedItem, index in this.completedItems" class="shadow" :key="completedItem.item + index">
                <i class="fa-solid fa-check checkBtn checkBtnCompleted"
                    v-on:click="toggleItem({isDone: completedItem.completed, index})"></i>
                <span class="textCompleted">{{ completedItem.item }}</span>
                <span class="removeBtn" v-on:click="removeItem({itemParam: completedItem, index})">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations(['removeItem','toggleItem'])
        // clickDeleteBtn(status, item, index) {
        //     console.log(mapMutations);
        //     this.$store.commit('removeItem', { status, item, index });
        //     // this.$emit('emitRemoveItem', status, itemParam, index);
        // },
        // clickToggleItem(status, index) {
        //     this.$store.commit('toggleItem', { status, index });
        //     // this.$emit('emitToggleItem', status, index);
        // }
    },
    computed: {
        todoItems() {
            return this.$store.getters.items.todoItems;
        },
        completedItems() {
            return this.$store.getters.items.completedItems;
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
/* .list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from,
.list-enter,
.list-leave-to, 
.list-leave{
    opacity: 0;
    transform: translateX(3px);
} */
</style>