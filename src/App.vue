<template>
  <div id="app">
    <section class="todoapp">
      <Header/>
      <Todo :todos="todos"/>
      <Footer/>
    </section>
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
          id: new Date(),
          text: "Vue 공부하기",
          isDone: true
        },
        {
          id: new Date(),
          text: "치킨 먹기",
          isDone: false
        }
      ]
    };
  }
};
</script>

<style>
</style>
