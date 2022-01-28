<template>
  <div class="layout">
    <h3>BiodivAR</h3>
    <input
      :class="{ error: v$.form.username.$errors.length }"
      id="username"
      class="input-size"
      v-model="v$.form.username.$model"
      placeholder="Username"
    />
    <input
      :class="{ error: v$.form.email.$errors.length }"
      id="email"
      class="input-size"
      v-model="v$.form.email.$model"
      placeholder="Email"
    />
    <input
      :class="{ error: v$.form.password.$errors.length }"
      type="password"
      class="input-size"
      id="password"
      v-model="v$.form.password.$model"
      placeholder="Password"
    />
    <input
      :class="{ error: v$.form.confirmPassword.$errors.length }"
      type="password"
      class="input-size"
      id="confirm"
      v-model="v$.form.confirmPassword.$model"
      placeholder="Confirm password"
    />
    <el-button :disabled="v$.form.$invalid" type="primary" class="button-size" @click="createUser"
      >Submit</el-button
    >
  </div>
</template>

<script>
import axios from 'axios';

import useVuelidate from '@vuelidate/core';
import {
  required, minLength, email, sameAs,
} from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    async createUser() {
      try {
        await axios.post(
          'http://localhost:3000/user/create',
          {
            username: this.form.username,
            email: this.form.email,
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
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  validations() {
    return {
      form: {
        username: {
          required,
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(4),
        },
        confirmPassword: {
          required,
          min: minLength(4),
          sameAs: sameAs(this.form.password),
        },
      },
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

.error {
  outline: 2px solid red;
}
</style>
