<template>
  <div>
    <div class="layout">
      <h3>BiodivAR</h3>
      <input
        id="username"
        class="input-size"
        :class="{ error: v$.form.username.$errors.length }"
        v-model="v$.form.username.$model"
        placeholder="Login"
      />
      <input
        id="password"
        class="input-size"
        :class="{ error: v$.form.password.$errors.length }"
        type="password"
        v-model="v$.form.password.$model"
        placeholder="Password"
      />
      <el-button
        :disabled="v$.form.$invalid"
        type="primary" class="button-size"
        @click="authenticate"
      >
      Submit
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    async authenticate() {
      try {
        await axios.post(
          'http://localhost:3000/login',
          {
            username: this.form.username,
            password: this.form.password,
          },
          { withCredentials: true },
        );
        this.$store.dispatch('authenticate', {
          isAuthenticate: true,
          username: this.form.username,
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
      form: {
        username: '',
        password: '',
      },
    };
  },
  validations() {
    return {
      form: {
        username: {
          required,
        },
        password: {
          required,
          min: minLength(4),
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
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

.error {
  outline: 2px solid red;
}
</style>
