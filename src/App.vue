<template>
  <div id="app">
    <section class="todoapp">
      <Header @insertTodo="insertTodo"/>
      <Todo 
        :todos="filteredList" 
        @removeTodo="removeTodo" 
        @updateDone="updateDone"
        @updateTodo="updateTodo"
      />
      <Footer 
        :filterType="filterType" 
        :size="filteredList.length" 
        @onFilterType="handleFilterType"
      />
    </section>
    <!-- <button @click="saveList">Save List</button> -->
  </div>
</template>

<script>
import "./assets/css/main.css";

import Header from "./components/Header";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Todo,
    Footer
  },

  data() {
    return {
      todos: [
        {
          id: 0,
          text: "sample - Vue 공부하기",
          isDone: true
        },
      ],
      filterType: 'All'
    };
  },

  mounted() {
    this.loadList()
  },
  
  beforeUpdate() {
    // this.loadList()
  },

  methods: {
    loadList() {
      this.$axios.get('/todo-list/item/all')
        .then((res) =>  {
          this.todos = res.data;
          this.todos.forEach((todo) => {
            console.log(todo);
          });
          console.log("todos loaded");
        })
        .catch((err) => {
          console.log('err : ' + err.message)
        })
    },

    insertTodo(text) {
      const newItem = {
        text,
        isDone: 0
      };

      this.$axios.post('/todo-list/item/save', newItem)
          .then((res) => {
            console.log('insert success : ' + res.data)
            this.loadList();
          })
          .catch((err) => {
            console.log('err : ' + err.message);
          });

      // this.todos = [
      //   ...this.todos,
      //   {
      //     id: new Date().getTime(),
      //     text,
      //     isDone: false
      //   }
      // ];
    },

    removeTodo(id) {
      console.log('id = ' + id);
      this.$axios.post('/todo-list/item/remove', {id})
          .then((res) => {
            console.log('delete success : ' + res.data);
            this.loadList();
          })
          .catch((err) => {
            console.log('err : ' + err.message);
          });
      
      // this.todos = this.todos.filter(todo => todo.id !== id);
    },

    updateDone(id) {
      const todos = [...this.todos];
      const todo = todos.find(todo => todo.id === id);

      if (todo) {
        todo.isDone = todo.isDone ? 0 : 1;
        console.log('todo.id : ' + todo.id);
        console.log('todo.isDone : ' + todo.isDone);
        // this.todos = todos;

        this.requestUpdateItem(todo);
      }
    },

    updateTodo({ id, text }) {
      const todos = [...this.todos];
      const todo = todos.find(todo => todo.id === id);

      if (todo) {
        todo.text = text;
        // this.todos = todos;
        
        this.requestUpdateItem(todo);
      }
    },

    handleFilterType(type) {
      this.filterType = type;
    },

    requestUpdateItem(todoItem) {
      console.log('rq update item - id : ' + todoItem.id);
      console.log('rq update item - isDone : ' + todoItem.isDone);
      this.$axios.post('/todo-list/item/update', todoItem)
            .then((res) => {
              console.log("update success : " + res.data);
              this.loadList();
            })
            .catch((err) => {
              console.log("err : " + err.message);
            });
    },

    saveList() {
      const requestBody = this.todos;

      this.$axios.post('/todo-list/save', requestBody)
          .then((res) => {
            alert("저장되었습니다.")
            console.log('saved : ' + res.data)
          })
          .catch((err) => {
            console.log('err' + err.message)
          })
    }
  },

  computed: {
    filteredList() {
      switch(this.filterType) {
        case "All": {
          return this.todos;
        }
        case "Active": {
          return this.todos.filter((todo) => !todo.isDone);
        }
        case "Completed": {
          return this.todos.filter((todo) => todo.isDone);
        }

        default: {
          return [];
        }
      }
    }
  },
};
</script>

<style>
</style>
