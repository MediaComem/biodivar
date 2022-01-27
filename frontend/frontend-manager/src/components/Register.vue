<template>
  <div class="layout">
    <h3>BiodivAR</h3>
    <input id="username" class="input-size" v-model="username" placeholder="Username" />
    <input id="email" class="input-size" v-model="email" placeholder="Email" />
    <input type="password" class="input-size"
    id="password" v-model="password" placeholder="Password" />
    <el-button type="primary" class="button-size" @click="createUser">Submit</el-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async createUser() {
      try {
        await axios.post('http://localhost:3000/user/create', {
          username: this.username,
          email: this.email,
          password: this.password,
        }, { withCredentials: true });
        this.$store.dispatch('authenticate', {
          isAuthenticate: true,
          username: this.username,
        });
        this.$router.push('Home');
      } catch (error) {
        this.$store.dispatch('authenticate', {
          isAuthenticate: false,
          username: '',
        });
        console.log(error);
      }
    },
  },
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
};
</script>

<style scoped>

.layout {
  display: flex;
  flex-direction: column;
  height: 90vh;
  align-items: center;
}

.input-size {
  width: 350px;
  height: 30px;
  margin-top: 5vh;
}

.button-size {
  width: 203px;
  height: 30px;
  margin-top: 5vh;
}

</style>
