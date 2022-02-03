<template>
<el-row :gutter="20" :justify="'center'" :align="'middle'">
  <el-col :span="8">
    <el-form
      ref="register"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="auto"
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
import { ElNotification } from 'element-plus';

export default {
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler() {
        if (this.$refs && this.$refs.register) {
          this.$refs.register.validate((valid) => {
            this.error = valid;
          });
        }
      },
    },
  },
  methods: {
    async authenticate() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/login`,
          {
            username: this.form.username,
            password: this.form.password,
          },
          { withCredentials: true },
        );
        this.$store.dispatch('authenticate', {
          isAuthenticate: true,
          username: response.data.data,
        });
        this.$router.push('Home');
      } catch (error) {
        this.$store.dispatch('authenticate', {
          isAuthenticate: false,
          username: '',
        });
        let errorMessage = '';
        if (error.response.data.statusCode === 400) {
          errorMessage = 'Username or password is wrong';
        }
        ElNotification({
          title: 'Authentication failure',
          message: errorMessage,
          type: 'error',
        });
      }
    },
  },
  name: 'Login',
  data() {
    return {
      error: false,
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
