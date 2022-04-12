<template>
<el-row :gutter="20" :justify="'center'" :align="'middle'">
  <el-col :span="8">
    <el-form
      v-if="!send"
      ref="form"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="auto"
      @keyup.enter="sendRequest"
    >
      <el-form-item class="layout">
        <h3>{{ $t('title') }}</h3>
      </el-form-item>
      <el-form-item :label="$t('forgotPassword.email')" prop="email">
      <el-input
        id="email"
        v-model="form.email"
      />
      </el-form-item>
      <el-form-item class="layout">
      <el-button :disabled="!error" type="primary" @click="sendRequest"
        >{{ $t('authentication.submit') }}</el-button
      >
      </el-form-item>
    </el-form>
    <h2 v-if="send">{{ $t('forgotPassword.sent') }}</h2>
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
  methods: {
    validateEmail(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input email'));
      } else if (!this.reg.test(value)) {
        callback(new Error('Please input a valid email address'));
      } else {
        callback();
      }
    },
    sendRequest() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post(
            `${process.env.VUE_APP_URL}/forgot-password`,
            {
              email: this.form.email,
            },
            { withCredentials: true },
          ).then(() => {
            this.send = true;
          }).catch((error) => {
            let errorMessage = '';
            if (error.response.data.statusCode === 400) {
              errorMessage = 'Email is wrong';
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
  name: 'ForgotPassword',
  data() {
    return {
      send: false,
      error: false,
      form: {
        email: '',
      },
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      rules: {
        email: [{
          required: true,
          validator: this.validateEmail,
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
