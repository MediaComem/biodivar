<template>
<el-row :gutter="20" :justify="'center'" :align="'middle'">
  <el-col :span="8">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="auto"
      @validate="validateForm"
    >
      <el-form-item class="layout">
        <h3>BiodivAR</h3>
      </el-form-item>
      <el-form-item label="Username" prop="username">
      <el-input
        id="username"
        v-model="form.username"
      />
      </el-form-item>
      <el-form-item label="Email" prop="email">
      <el-input
        id="email"
        v-model="form.email"
      />
      </el-form-item>
      <el-form-item label="Password" prop="password">
      <el-input
        type="password"
        id="password"
        v-model="form.password"
      />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirm">
      <el-input
        type="password"
        id="confirm"
        v-model="form.confirm"
      />
      </el-form-item>
      <el-form-item class="layout">
      <el-button :disabled="!error" type="primary" @click="createUser"
        >Submit</el-button
      >
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    validateForm(item, error) {
      this.error = error;
    },
    validateEmail(rule, value, callback) {
      console.log('fdsfsdfdsa');
      if (value === '') {
        callback(new Error('Please input email'));
      } else if (!this.reg.test(value)) {
        console.log(this.reg);
        callback(new Error('Please input a valid email address'));
      } else {
        callback();
      }
    },
    validateConfirm(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    },
    async createUser() {
      try {
        const response = await axios.post(
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
          username: response.data,
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
  name: 'Register',
  data() {
    return {
      error: true,
      form: {
        username: '',
        email: '',
        password: '',
        confirm: '',
      },
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      rules: {
        username: [{
          required: true,
          message: 'Please input username',
        }],
        email: [{
          required: true,
          validator: this.validateEmail,
        }],
        password: [{
          required: true,
          min: 4,
          message: 'Please input password',
        }],
        confirm: [{
          required: true,
          validator: this.validateConfirm,
        }],
      },
    };
  },
  mounted() {
    this.$refs.form.validate();
  },
};
</script>

<style scoped>
.layout {
  display: inline-block;
  text-align: center;
  margin-top: 20px;
}
</style>
