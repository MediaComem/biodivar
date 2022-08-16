<template>
<el-row :gutter="20" :justify="'center'" :align="'middle'">
  <el-col :span="8">
    <el-form
      ref="register"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="auto"
      @keyup.enter="authentication"
    >
      <el-form-item class="layout">
        <h3>{{ $t('title') }}</h3>
      </el-form-item>
      <el-form-item :label="$t('authentication.username')" prop="username">
        <el-input
          id="username"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item :label="$t('authentication.password')" prop="password">
        <el-input
          id="password"
          type="password"
          v-model="form.password"
        />
      </el-form-item>
      <!--el-form-item class="">
        <router-link to="/forgot">{{ $t('authentication.forgot') }}</router-link>
      </el-form-item-->
      <el-form-item class="layout">
        <el-button
          :disabled="!error"
          type="primary"
          @click="authentication"
        >
        {{ $t('authentication.submit') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { ElNotification } from 'element-plus';
import setupKeepAlive from '../../composable/keepAlive';

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
    authentication() {
      this.$refs.register.validate((valid) => {
        if (valid) {
          axios.post(
            `${process.env.VUE_APP_URL}/login`,
            {
              username: this.form.username,
              password: this.form.password,
            },
            { withCredentials: true },
          ).then((response) => {
            this.authenticate({
              isAuthenticate: true,
              username: response.data.data,
            });
            setupKeepAlive(this.authenticate, this.$router);
            this.$router.push('Biovers');
          }).catch((error) => {
            this.authenticate({
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
          });
        }
      });
    },
    ...mapActions('auth', ['authenticate']),
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
          message: this.$i18n.t('validation.username'),
        }],
        password: [{
          required: true,
          message: this.$i18n.t('validation.password'),
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
