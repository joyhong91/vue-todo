<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="clickAddBtn" />
        <span class="addContainer" v-on:click="clickAddBtn">
            <i class="fa-solid fa-plus addBtn"></i>
        </span>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            newTodoItem: ""
        }
    },
    methods: {
        clickAddBtn: function () {
            if (this.newTodoItem !== '') {
                // emit은 상위 vue에 이벤트 전달 한다. this.$emit('이벤트 이름', 인자1, 인자2 ...);
                this.$emit('emitAddItem', this.newTodoItem);
                this.clearInputBox();
            }
        },
        clearInputBox: function () {
            this.newTodoItem = "";
        }
    }
}
</script>

<style scoped>
input:focus {
    outline: none;
}

.inputBox {
    background: #fff;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}

.inputBox input {
    border-style: none;
    font-size: 0.9rem;
    width: 80%;
    min-height: 40px;
}

.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}

.addBtn {
    color: #fff;
    vertical-align: middle;
}
</style>
