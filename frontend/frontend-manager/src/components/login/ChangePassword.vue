<template>
  <el-row :gutter="20" :justify="'center'" :align="'middle'">
  <el-col :span="8">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="auto"
      @keyup.enter="createUser"
    >
      <el-form-item class="layout">
        <h3>{{ $t('title') }}</h3>
      </el-form-item>
      <el-form-item :label="$t('authentication.password')" prop="password">
      <el-input
        type="password"
        id="password"
        v-model="form.password"
      />
      </el-form-item>
      <el-form-item :label="$t('changePassword.confirm')" prop="confirm">
      <el-input
        type="password"
        id="confirm"
        v-model="form.confirm"
      />
      </el-form-item>
      <el-form-item class="layout">
      <el-button :disabled="!error" type="primary" @click="changePassword"
        >{{ $t('authentication.submit') }}</el-button
      >
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
        if (this.$refs && this.$refs.form) {
          this.$refs.form.validate((valid) => {
            this.error = valid;
          });
        }
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.token = decodeURIComponent(to.params.token);
    });
  },
  methods: {
    validateConfirm(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    },
    changePassword() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post(
            `${process.env.VUE_APP_URL}/change-password`,
            {
              password: this.form.password,
              token: this.token,
            },
            { withCredentials: true },
          ).then(() => {
            this.$router.push('/login');
          }).catch((error) => {
            let errorMessage = '';
            if (error.response.status === 400) {
              errorMessage = error.response.data.message;
            } else {
              errorMessage = 'The password cannot be changed for unknow reason. Please contact an administator to solve the problem';
            }
            ElNotification({
              title: 'Authentication failure',
              message: errorMessage,
              type: 'error',
            });
          });
        }
      });
    },
  },
  name: 'Register',
  data() {
    return {
      error: false,
      token: '',
      form: {
        password: '',
        confirm: '',
      },
      rules: {
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
