<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import axios from 'axios';
import { ElNotification } from 'element-plus';

const store = useStore();
const router = useRouter();
const { t } = useI18n();

const authenticateRef = ref(null);
const error = ref(false);
const form = ref({
  username: '',
  password: '',
});
const rules = ref({
  username: [{
    required: true,
    message: t('validation.username'),
  }],
  password: [{
    required: true,
    message: t('validation.password'),
  }],
});

watch(() => form, () => {
  if (authenticateRef.value) {
    authenticateRef.value.validate((valid) => {
      error.value = valid;
    });
  }
}, { deep: true, immediate: true });

function authenticate(information) {
  store.dispatch('auth/authenticate', information);
}

function login() {
  authenticateRef.value.validate((valid) => {
    if (valid) {
      axios.post(
        `${process.env.VUE_APP_URL}/login`,
        {
          username: form.value.username,
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
        if (err.response.data.statusCode === 400) {
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
}
</script>

<template>
  <el-row :gutter="20" :justify="'center'" :align="'middle'">
    <el-col :span="8">
      <el-form
        ref="authenticateRef"
        :model="form"
        :rules="rules"
        :label-position="'right'"
        label-width="auto"
        @keyup.enter="login"
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
            @click="login"
          >
          {{ $t('authentication.submit') }}
          </el-button>
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
