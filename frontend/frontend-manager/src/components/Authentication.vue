<template>
  <div>
    <h3>Please Log In</h3>
    <label for="username">username: </label>
    <input id="username" v-model="username" placeholder="edit me" />
    <label for="password">password: </label>
    <input type="password" id="password" v-model="password" placeholder="edit me" />
    <button v-on:click="authenticate">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async authenticate() {
      const res = await axios.post('localhost:3000/login', {
        username: this.username,
        password: this.password,
      });
      console.log(res);
    },
  },
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
};
</script>

<style scoped></style>
