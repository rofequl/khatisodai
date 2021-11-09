<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h3 style="color: #5b5555">Edit Profile</h3>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <a-card style="width: 100%">
          <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical" @submit.prevent="onSubmit()"
                        @keydown="form.onKeydown($event)" :hideRequiredMark="true">
            <div class="row">
              <div class="col-12 col-md-4">
                <a-form-model-item label="Full name" ref="name" has-feedback="" prop="name">
                  <a-input v-model="form.name" placeholder="Enter your first and last name"/>
                </a-form-model-item>
              </div>
              <div class="col-12 col-md-4">
                <p style="color: black">Email Address |
                  <a href="#" style="font-size: 12px" @click.prevent="emailModel = true">
                    {{ user.email ? "Change" : "Add" }}
                  </a>
                </p>
                <span class="ant-form-text">
                      {{ user.email }}
                    </span>

              </div>
              <div class="col-12 col-md-4">
                <p style="color: black">Mobile|
                  <a href="#" style="font-size: 12px">
                    {{ user.mobile ? "Change" : "Add" }}
                  </a>
                </p>
                <span class="ant-form-text">{{ user.mobile }}</span>
              </div>
              <div class="col-12 col-md-4">
                <a-form-model-item label="Gender">
                  <a-select v-model="form.gender" placeholder="please select gender">
                    <a-select-option value="male">
                      male
                    </a-select-option>
                    <a-select-option value="women">
                      women
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </div>
              <div class="col-12 col-md-4">
                <a-form-model-item label="Birthday">
                  <a-date-picker :default-value="form.birthday" format="YYYY-MM-DD"
                                 @change="dateSelect"
                                 placeholder="Pick a date"/>
                </a-form-model-item>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <a-button htmlType="submit" class="float-right px-5 text-white" size="large" :loading="form.busy"
                          style="background-color: #4ca846"
                          :disabled="form.busy">Update Profile
                </a-button>
              </div>
            </div>
          </a-form-model>
        </a-card>
      </div>
    </div>
    <Email :modelOpen="emailModel" :is-update="!!user.email" @closeModel="emailModel = false" :name="form.name"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
import Email from "@/components/profile/Email";

export default {
  name: "Profile",
  components: {Email},
  data() {
    return {
      emailModel: false,
      form: new Form({
        name: '',
        gender: undefined,
        birthday: null,
      }),
      rules: {
        name: [
          {required: true, message: 'Please enter your name', trigger: 'blur'},
          {max: 100, message: 'Name maximum length 100 character', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    dateSelect(date) {
      this.form.birthday = moment(date).format('YYYY-MM-DD');
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.post('profile-update')
              .then(() => {
                this.$notification['success']({
                  message: 'congratulations',
                  description: 'Profile update successfully.',
                  style: {marginTop: '47px'},
                });
              })
              .catch(err => {
                this.$notification['error']({
                  message: 'Warning',
                  description: ((err.response || {}).data || {}).message || 'Something Wrong',
                  style: {marginTop: '47px'},
                  duration: 4
                })
              })
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.form.fill(this.user);
  },
  watch: {
    user: function () {
      this.form.fill(this.user);
    }
  },
  computed: {
    ...mapGetters({user: "currentUser"})
  }
}
</script>

<style scoped>

</style>
