<template>
<el-row :gutter="20" :justify="'center'" :align="'middle'">
  <el-col :span="8">
    <el-form
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
      <el-form-item label="Password" prop="password">
        <el-input
          id="password"
          type="password"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item class="layout">
        <el-button
          :disabled="!error"
          type="primary"
          @click="authenticate"
        >
        Submit
        </el-button>
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
    async authenticate() {
      try {
        const response = await axios.post(
          'http://localhost:3000/login',
          {
            username: this.form.username,
            password: this.form.password,
          },
          { withCredentials: true },
        );
        this.$store.dispatch('authenticate', {
          isAuthenticate: true,
          username: response.data.user,
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
      error: true,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{
          required: true,
          message: 'Please input username',
        }],
        password: [{
          required: true,
          message: 'Please input password',
        }],
      },
    };
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
