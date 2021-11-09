<template>
  <a-form :form="form" class="login-form user-layout-login"
          @submit="handleSubmit">
    <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
             :message="isLoginErrorMessage"/>
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
    <a-form-item class="mb-2">
      <a-input-password
          :placeholder="$t('header.login.password')"
          v-decorator="[
                'password',
                {rules: [{ required: true, message: $t('header.login.passrequired') },{max: 20,message: $t('header.login.maximum',{msg: 20})},
                {min: 6,message: $t('header.login.minimum',{msg: 6})},]},
              ]"/>
    </a-form-item>
    <div class="w-100">
      <a-button type="primary" html-type="submit" class="reg-btn" size="large" :loading="state.loginBtn"
                :disabled="state.loginBtn">
        {{$t('header.login.signIn')}}
      </a-button>
    </div>
    <div class="mt-1">
      <span style="font-size: 12px">{{ $t('header.login.forgotPassword') }}?</span>
    </div>
  </a-form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: this.$form.createForm(this),
      isLoginError: false,
      isLoginErrorMessage: '',
      state: {
        loginBtn: false,
      }
    };
  },
  methods: {
    ...mapActions(['LOGIN']),
    handleSubmit: function (e) {
      e.preventDefault();
      const {state, verify, LOGIN} = this
      state.loginBtn = true
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          LOGIN(values)
              .then(() => this.loginSuccess())
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false
              })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      });
    },
    loginSuccess() {
      this.$store.dispatch('VERIFY_AUTH');
      this.$emit('closeModel')
    },
    requestFailed(err) {
      this.isLoginError = true
      this.isLoginErrorMessage = ((err.response || {}).data || {}).message || 'Invalid credentials';
    },
    handleReset() {
      this.form.resetFields();
    },
  }
}
</script>

<style scoped>
>>> .ant-form-explain {
  font-size: 12px;
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
