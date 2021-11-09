<template>
  <a-form :form="form" class="login-form user-layout-login"
          @submit="handleSubmit">
    <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
             :message="isLoginErrorMessage"/>
    <a-form-item class="mb-2">
      <a-input
          :placeholder="$t('header.login.name')"
          v-decorator="[
                'name',
                {rules: [{ required: true, message: $t('header.login.empty') },{max: 50,message: $t('header.login.maximum',{msg: 50})}]},
              ]">
        <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
      </a-input>
    </a-form-item>
    <a-form-item class="mb-2">
      <a-input
          :placeholder="$t('header.login.emailOrPhone')"
          v-decorator="[
                'emailOrMobile',
                {rules: [{ required: true, message: $t('header.login.empty') },{max: 50,message: $t('header.login.maximum',{msg: 50})}]},
              ]">
        <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
      </a-input>
    </a-form-item>
    <a-row :gutter="16" v-if="verify">
      <a-col class="gutter-row" :span="16">
        <a-form-item class="mb-2">
          <a-input type="text" placeholder="Verification code"
                   v-decorator="['otp', {rules: [{ required: true, message: 'Enter the verification code!' }], validateTrigger: 'blur'}]">
            <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-button
            class="getCaptcha"
            tabindex="-1"
            v-text="!state.smsSendBtn && 'Get code' || (state.time+' s')"
            :disabled="state.smsSendBtn" @click.stop.prevent="getOTP"
        ></a-button>
      </a-col>
    </a-row>
    <b-row>
      <b-col md="6">
        <a-form-item class="mb-2">
          <a-input-password
              :placeholder="$t('header.login.password')"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: $t('header.login.passrequired') },{max: 20,message: $t('header.login.maximum',{msg: 20})},
                {min: 6,message: 'Minimum length was 6 character'},{validator: validateToNextPassword},]},
              ]"/>
        </a-form-item>
      </b-col>
      <b-col md="6">
        <a-form-item class="mb-2">
          <a-input-password
              :placeholder="$t('header.login.conPassword')"
              @blur="handleConfirmBlur"
              v-decorator="[
                'confirm',
                {rules: [{ required: true, message: 'Please confirm your password!' },{validator: compareToFirstPassword}]},
              ]"/>
        </a-form-item>
      </b-col>
    </b-row>
    <div class="w-100">
      <a-button type="primary" html-type="submit" class="reg-btn" size="large" :loading="state.loginBtn"
                :disabled="state.loginBtn">
        CREATE ACCOUNT
      </a-button>
    </div>
    <div class="form-row justify-content-center mt-2">
        <span class="text-center"
              style="font-size: 12px">By creating an account, you agree to the <br> {{
            $store.getters.generalSettings.app_name
          }}
          <router-link to="/terms-conditions">Terms & Condition</router-link> and <router-link to="/privacy-policy">Privacy Policy</router-link></span>
    </div>
  </a-form>
</template>

<script>
import ApiService from "@/core/services/api.service";
import {mapActions} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      confirmDirty: false,
      form: this.$form.createForm(this),
      verify: false,
      isLoginError: false,
      isLoginErrorMessage: '',
      state: {
        time: 120,
        loginBtn: false,
        smsSendBtn: false
      }
    };
  },
  methods: {
    ...mapActions(['REGISTER']),
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], {force: true});
      }
      callback();
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    handleSubmit: function (e) {
      e.preventDefault();
      const {state, verify, REGISTER} = this
      state.loginBtn = true
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (!verify) {
            this.getOTP(null);
          } else {
            REGISTER(values)
                .then(() => this.loginSuccess())
                .catch(err => this.requestFailed(err))
                .finally(() => {
                  state.loginBtn = false
                })
          }
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      });
    },
    getOTP(e) {
      if (e) e.preventDefault()
      const {form: {validateFields}, state, requestFailed} = this
      setTimeout(() => {
        state.loginBtn = false
      }, 600)
      validateFields(['emailOrMobile', 'name'], {force: true}, (err, values) => {
        if (!err) {
          this.isLoginError = false
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 120
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
          const hide = this.$message.loading('OTP Sending...', 0)
          ApiService.post('user/send-otp', {emailOrMobile: values.emailOrMobile, name: values.name}).then(() => {
            this.verify = true;
            setTimeout(hide, 2500)
          }).catch(err => {
            requestFailed(err)
            this.verify = false;
            setTimeout(hide, 1)
            clearInterval(interval)
            state.time = 120
            state.smsSendBtn = false
          })
        }
      })
    },
    loginSuccess() {
      this.$store.dispatch('VERIFY_AUTH');
      this.$emit('closeModel')
    },
    requestFailed(err) {
      this.isLoginError = true
      this.isLoginErrorMessage = ((err.response || {}).data || {}).message || 'Invalid credentials';
    }
  }
}
</script>

<style scoped>
>>> .ant-form-explain {
  font-size: 12px;
}

.getCaptcha {
  display: block;
  width: 100%;
  margin-top: 4px;
}

.reg-btn {
  width: 100%;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  color: #fff;
  background-color: #f05a28;
}
</style>
