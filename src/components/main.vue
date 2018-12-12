<template>
  <div class="container">
    <h1 class="mt-5">{{transitions[lang].title}}</h1>
    <b-input-group prepend="TODO:" class="mb-4 mt-5">
      <b-form-input class="todo-input" :placeholder="transitions[lang].placeholder" v-model="newTodo" ></b-form-input>
      <b-input-group-append>
        <b-btn variant="success" @click="addTodo">{{transitions[lang].add}}</b-btn>
      </b-input-group-append>
    </b-input-group>
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
      <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
        <div class="todo-item-left">
          <input type="checkbox" :id="todo.id" v-model="todo.completed" @change="saveTodo">
          <div
            v-if="!todo.editing" 
            @dblclick="editTodo(todo)" 
            class="todo-item-label" 
            :class="{ completed : todo.completed }"><label class="taskLabel" :for="todo.id">{{ todo.title }}</label></div>
          <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
        </div>
        <div class="remove-item" @click="removeTodo(index)">
          <i class="fa fa-times"></i>
        </div>
      </div>
    </transition-group>
    <div class="extra-container">
      <div><input type="checkbox" id="checkall" :checked="!anyRemaining" @change="checkAllTodos"> <label for="checkall" class="todo-item-label">{{transitions[lang].checkAll}}</label></div>
      <div>{{ remaining }} {{transitions[lang].itemsLeft}}</div>
    </div>
    <div class="extra-container">
      <b-button-group size="sm">
        <b-button :class="{ active: filter == 'all' }" @click="filter = 'all'">{{transitions[lang].all}}</b-button>
        <b-button :class="{ active: filter == 'active' }" @click="filter = 'active'">{{transitions[lang].active}}</b-button>
        <b-button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">{{transitions[lang].completed}}</b-button>
      </b-button-group>
      <div>
        <transition name="fade">
          <b-button size="sm" v-if="showClearCompletedButton" @click="clearCompleted">{{transitions[lang].clear}}</b-button>
        </transition>
      </div>
    </div>
    <div class="extra-container">
      <div>
        <transition name="fade">
          <b-button size="sm" @click="clearCache">Reset / Clear Cache</b-button>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>


import { serverBus } from '../main';


export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      idForTodo: 4,
      beforeEditCache: '',
      filter: 'all',
      todos: [],
      lang: 'EN',
      transitions : {
        'EN':{
            'add': 'Add',
            'placeholder': 'Add a task here',
            'all': 'All',
            'active': 'Active',
            'completed': 'Completed',
            'clear': 'Clear Completed',
            'home': 'Home',
            'itemsLeft': 'items left',
            'checkAll': 'Check All',
            'title': 'TODO list App'
          },
        'ES':{
            'add': 'Añadir',
            'placeholder': 'Agrega una tarea aquí',
            'all': 'Todos',
            'active': 'Activo',
            'completed': 'Terminado',
            'clear': 'Despejado completo',
            'home': 'En casa',
            'itemsLeft': 'artículos dejados',
            'checkAll': 'Comprobar todo',
            'title': 'TODO Aplicación'
          },
        'RU':{
            'add': 'добавлять',
            'placeholder': 'Добавьте задачу здесь',
            'all': 'Все',
            'active': 'активный',
            'completed': 'Завершенный',
            'clear': 'Очистить завершено',
            'home': 'Homeed',
            'itemsLeft': 'оставленные товары',
            'checkAll': 'Проверить все',
            'title': 'Приложение TODO'
          }
      },
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      if (this.filter == 'all') {
        return this.todos
      } else if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo: function() {
      if (this.newTodo.trim().length == 0) {
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      });
      this.saveTodo();
      this.newTodo = '';
      this.idForTodo++;
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
      this.saveTodo();
    },
    doneEdit(todo) {
      if (todo.title.trim() == '') {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
      this.saveTodo();
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
      this.saveTodo();
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodo();
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked);
      this.saveTodo();
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodo();
    },
    clearCache(){
      localStorage.removeItem('todos');
      this.setTodod();
    },
    setTodod(){
            this.todos = [{
              'id': 1,
              'title': 'Save TODO date to persistent local storage. ',
              'completed': true,
              'editing': false,
          },
          {
              'id': 2,
              'title': 'Finish TODO Application',
              'completed': false,
              'editing': false,
          },
          {
              'id': 3,
              'title': 'Take over world',
              'completed': false,
              'editing': false,
          },
      ];
    },
    saveTodo(){
      const todosParsed = JSON.stringify(this.todos);
      localStorage.setItem('todos', todosParsed);
    }
  },
  created() {
    // Using the service bus
    serverBus.$on('lang', (lang) => {
      this.lang = lang;
    });
  },
  mounted() {
    let app = this;
    window.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        app.addTodo();
      }
    });
    if(localStorage.lang){
      this.lang = localStorage.lang;
    }else{
      this.lang = 'EN';
    }
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      } catch(e) {
        localStorage.removeItem('todos');
      }
    }else{
      this.setTodod();
    }
  },
  watch: {
    lang(newLang) {
      localStorage.lang = newLang;
    }
  }
}
</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  .todo-input {
    border-radius: 4px;
    border:1px solid rgb(160, 160, 160);
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    // margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
    padding:0 3%;
    border-bottom:1px solid #eee;
    &:nth-of-type(even) {
      background: #ffffed
    }
    &:nth-of-type(odd) {
      background: #eef8ffba
    }
    &:last-child{
      border-bottom:none;
    }
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .todo-item-left { // later
    display: flex;
    align-items: center;
    width: 100%;
  }
  .todo-item-label {
    padding: 10px;
    border: 0px solid white;
    margin-left: 12px;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        width: calc(100% - 18px);
        height: 2px;
        bottom: calc(50% - 1px);
        left: 0;
        right:0;
        background-color: grey;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
        margin: 0 auto;
    }

  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }
  .completed{
    text-decoration: none;
    &:before {
      visibility: visible;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding:14px 3%;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    &:hover {
      background: lightgreen;
    }
    &:focus {
      outline: none;
    }
  }
  .active {
    background: lightgreen;
  }
  // CSS Transitions
  .fade-enter-active, .fade-leave-active{
    transition: opacity 0.2s ease-in-out ;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fas {
    -webkit-transition: -webkit-transform .6s ease-in-out, color .6s ease-in-out;
    transition: transform .6s ease-in-out, color .6s ease-in-out;
  }
  .remove-item:hover .fas {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    color:rgb(201, 21, 21);
  }
  .taskLabel{
    line-height: 1em;
    text-align: left;
  }
</style>