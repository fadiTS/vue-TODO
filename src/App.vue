<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <Header/>
    <MainContainer/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/header.vue'
import MainContainer from './components/main.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  components: {
    Header,
    MainContainer
  },
  // data() {
  //   return {
  //     myWorker: null
  //   }
  // },

  // created() {
  //   this.myWorker = this.$worker.create([
  //     {message: 'message1', func: (arg) => `Output 1 ${arg}`},
  //     {message: 'message2', func: () => 'Output 2'}
  //   ])

  //   this.myWorker.postMessage('message1', ['200'])
  //   .then(result => {
  //     console.log(result)
  //   })
  // }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
