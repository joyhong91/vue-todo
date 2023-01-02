<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keypress.enter="clickAddBtn" />
        <span class="addContainer" v-on:click="clickAddBtn">
            <i class="fa-solid fa-plus addBtn"></i>
        </span>

        <Modal v-if="showModal" @close="showModal = false">
            <!--
      you can use custom content here to overwrite
      default content
    -->
            <h3 slot="header">
                경고
                <!-- v-on ==> @ 로 축약 가능-->
                <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
            </h3>

            <div slot="body">
                아무것도 입력하지 않으셨습니다.
            </div>
        </Modal>
    </div>
</template>

<script>
import Modal from './common/Modal.vue';

export default {
    data() {
        return {
            newTodoItem: "",
            showModal: false
        }
    },
    methods: {
        clickAddBtn() {
            if (this.newTodoItem !== '' && this.newTodoItem.trim().length > 0) {
                this.$store.commit('addItem', this.newTodoItem.trim());
                this.clearInputBox();
            } else {
                this.showModal = true;
            }
        },
        clearInputBox() {
            this.newTodoItem = "";
        }
    },
    components: {
        Modal
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

.closeModalBtn {
    color: #42b983;
}
</style>
