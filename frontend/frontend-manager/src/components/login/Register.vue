<script setup>
import {
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { ElNotification } from 'element-plus';

const store = useStore();
const router = useRouter();
const { t } = useI18n();

const formRef = ref(null);
const error = ref(false);
const form = ref({
  username: '',
  email: '',
  password: '',
  confirm: '',
});
const reg = ref(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/);

function validateEmail(rule, value, callback) {
  if (value === '') {
    callback(new Error(t('validation.email')));
  } else if (!reg.value.test(value)) {
    callback(new Error(t('validation.validEmail')));
  } else {
    callback();
  }
}

function validateConfirm(rule, value, callback) {
  if (value === '') {
    callback(new Error(t('validation.confirm')));
  } else if (value !== form.value.password) {
    callback(new Error(t('validation.match')));
  } else {
    callback();
  }
}

const rules = ref({
  username: [{
    required: true,
    message: t('validation.username'),
  }],
  email: [{
    required: true,
    validator: validateEmail,
  }],
  password: [{
    required: true,
    min: 4,
    message: t('validation.password'),
  }],
  confirm: [{
    required: true,
    validator: validateConfirm,
  }],
});

watch(() => form, () => {
  if (formRef.value) {
    formRef.value.validate((valid) => {
      error.value = valid;
    });
  }
}, { deep: true, immediate: true });

function authenticate(information) {
  store.dispatch('auth/authenticate', information);
}

function createUser() {
  formRef.value.validate((valid) => {
    if (valid) {
      axios.post(
        `${process.env.VUE_APP_URL}/register`,
        {
          username: form.value.username,
          email: form.value.email,
          password: form.value.password,
        },
        { withCredentials: true },
      ).then((response) => {
        authenticate({
          isAuthenticate: true,
          username: response.data.data,
        });
        router.push('Biovers');
      }).catch((err) => {
        authenticate({
          isAuthenticate: false,
          username: '',
        });
        let errorMessage = '';
        if (err.response.status === 400) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'The user cannot be create for unknow reason. Please contact an administator to solve the problem';
        }
        ElNotification({
          title: 'Authentication failure',
          message: errorMessage,
          type: 'error',
        });
      });
    }
  });
}
</script>

<template>
<el-row :gutter="20" :justify="'center'" :align="'middle'">
  <el-col :span="8">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="auto"
      @keyup.enter="createUser"
    >
      <el-form-item class="layout">
        <h3>{{ $t('title') }}</h3>
      </el-form-item>
      <el-form-item :label="$t('register.username')" prop="username">
      <el-input
        id="username"
        v-model="form.username"
      />
      </el-form-item>
      <el-form-item :label="$t('register.email')" prop="email">
      <el-input
        id="email"
        v-model="form.email"
      />
      </el-form-item>
      <el-form-item :label="$t('register.password')" prop="password">
      <el-input
        type="password"
        id="password"
        v-model="form.password"
      />
      </el-form-item>
      <el-form-item :label="$t('register.confirm')" prop="confirm">
      <el-input
        type="password"
        id="confirm"
        v-model="form.confirm"
      />
      </el-form-item>
      <el-form-item class="layout">
      <el-button :disabled="!error" type="primary" @click="createUser"
        >{{ $t('register.submit') }}</el-button
      >
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<style scoped>
.layout {
  display: inline-block;
  text-align: center;
  margin-top: 20px;
}
</style>
