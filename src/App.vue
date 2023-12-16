<template>
  <div v-for="item in userList">
    <div>{{ item.username }}</div>
    <div>{{ item.password }}</div>
    <div>{{ item.role }}</div>
    <div>{{ item.average }}</div>
  </div>
  姓名<input type="text" v-model="userForm.username" /> 密码<input
    type="text"
    v-model="userForm.password"
  />
  身份<input type="text" v-model="userForm.role" /> 头像<input
    type="text"
    v-model="userForm.average"
  />
  <button @click="addUser">添加</button>
  <router-view />
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
const userList = ref([])
const userForm = reactive({
  username: '',
  password: '',
  role: '',
  average: '',
})
const addUser = () => {
  const { username, password } = userForm
  axios.post('/api/addUser', userForm).then((res) => {
    if ((res.data.code = 200)) {
      axios.get('/api/add').then(
        (res) => {
          console.log(res)
          if (res.data.code == 200) {
            userList.value = res.data.message
            console.log(userList.value)
          }
        },
        (err) => {
          console.log(err)
        }
      )
    }
    console.log(res)
  })
  // console.log(userForm)
}
onMounted(() => {
  axios.get('/api/add').then(
    (res) => {
      console.log(res)
      if (res.data.code == 200) {
        userList.value = res.data.message
        console.log(userList.value)
      }
    },
    (err) => {
      console.log(err)
    }
  )
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
