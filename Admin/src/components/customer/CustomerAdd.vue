<template>
  <a-modal
      :title="modalAdd? 'Add new customer':'Customer information edit'"
      :okText="modalAdd? 'Submit':'Update'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="modalAdd? submitForm() : updateForm()"
      @cancel="cancelForm">
    <a-form-model ref="ruleForm" :model="form" :rules="rules"
                  @keydown="form.onKeydown($event)" :layout="'vertical'">

      <a-row :gutter="16">
        <a-col :md="24" :lg="12">
          <a-form-model-item ref="name" has-feedback="" prop="name"
                             label="First and Last Name:">
            <a-input v-model="form.name" placeholder="Enter your first and last name"
                     @blur="() => {$refs.name.onFieldBlur();}"/>
          </a-form-model-item>
        </a-col>
        <a-col :md="24" :lg="12">
          <a-form-model-item ref="email" has-feedback="" prop="email"
                             label="Email Id:">
            <a-input v-model="form.email" placeholder="Enter your email id"
                     @blur="() => {$refs.email.onFieldBlur();}" type="email"/>
          </a-form-model-item>
        </a-col>
        <a-col :md="24" :lg="12">
          <a-form-model-item ref="mobile" has-feedback="" prop="mobile"
                             label="Phone Number:">
            <a-input v-model="form.mobile" placeholder="Enter your phone number"
                     @blur="() => {$refs.mobile.onFieldBlur();}"/>
          </a-form-model-item>
        </a-col>
        <a-col :md="24" :lg="12">
          <a-form-model-item ref="password" has-feedback="" prop="password"
                             label="Password:">
            <a-input v-model="form.password" placeholder="Enter your password"
                     @blur="() => {$refs.password.onFieldBlur();}" type="password"/>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CustomerAdd",
  data() {
    return {
      visible: false,
      modalAdd: true,
      confirmLoading: false,
      form: new Form({
        id: '',
        name: '',
        email: '',
        password: '',
        mobile: '',
        reg_type: 0,
      }),
      rules: {
        name: [
          {required: true, message: 'Please enter your first and last name', trigger: 'blur'},
          {max: 50, message: 'Maximum length was 50 character', trigger: 'change'},
        ],
        email: [
          {required: true, message: 'Please enter your email address.', trigger: 'blur'},
          {max: 50, message: 'Maximum length was 50 character', trigger: 'change'},
          {type: 'email', message: 'The input is not valid E-mail!', trigger: 'change'},
        ],
        password: [
          {required: true, message: 'Please enter your password!', trigger: 'blur'},
          {max: 20, message: 'Maximum length was 20 character', trigger: 'change'},
          {min: 6, message: 'Minimum length was 6 character', trigger: 'change'},
        ],
        mobile: [
          {required: true, message: 'Please enter the mobile number', trigger: 'blur'},
          {pattern: /^(?:\+88|01)?\d{11}\r?$/, message: 'Enter the valid mobile number', trigger: 'change'},
        ],
      }
    };
  },
  methods: {
    modal(e) {
      if (!e) {
        this.modalAdd = true;
      } else {
        this.form.fill(e);
        this.form.banner = this.showImage(e.banner)
        this.form.icon = this.showImage(e.icon)
        this.modalAdd = false;
      }
      this.visible = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.visible = false;
          this.form.post('user-entry')
              .then(({data}) => {
                this.$store.commit('CUSTOMER_ADD', data);
                this.$refs.ruleForm.resetFields();
                this.$notification['success']({
                  message: 'Congratulations',
                  description: 'Customer add successfully.',
                  style: {marginTop: '41px'},
                  duration: 4
                });
              })
              .catch(err => {
                this.$notification['error']({
                  message: 'Warning',
                  description: ((err.response || {}).data || {}).message || 'Something Wrong',
                  style: {marginTop: '41px'},
                  duration: 4
                })
              })
        } else {
          return false;
        }
      });
    },
    updateForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.visible = false;
          this.form.put('category/' + this.form.id)
              .then(({data}) => {
                this.$store.commit('CATEGORY_MODIFY', data);
                this.$refs.ruleForm.resetFields();
                this.$notification['success']({
                  message: 'Congratulations',
                  description: 'Category update successfully.',
                  style: {marginTop: '41px'},
                  duration: 4
                });
              })
              .catch(err => {
                this.$notification['error']({
                  message: 'Warning',
                  description: ((err.response || {}).data || {}).message || 'Something Wrong',
                  style: {marginTop: '41px'},
                  duration: 4
                })
              })
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      this.$refs.ruleForm.resetFields();
      this.visible = false;
    },
  },
  computed: {
    ...mapGetters(["isBangla"])
  },
}
</script>

<style scoped>

</style>
