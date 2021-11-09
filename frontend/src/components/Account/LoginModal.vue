<template>
  <a-modal
      title="" centered
      :visible="visible" :footer="null" :width="450"
      @cancel="cancelForm">
    <a-tabs @change="handleTabClick" :activeKey="customActiveKey"
            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
      <a-tab-pane key="tab1" :tab="$t('header.login.register')">
        <Register @closeModel="cancelForm"/>
      </a-tab-pane>
      <a-tab-pane key="tab2" :tab="$t('header.login.signIn')">
        <Login ref="loginAS" @closeModel="cancelForm"/>
      </a-tab-pane>
    </a-tabs>
    <Social/>
  </a-modal>
</template>

<script>
import Register from "@/components/Account/Register";
import Login from "@/components/Account/Login";
import Social from "@/components/Account/Social";

export default {
  name: "LoginModal",
  components: {Login, Social, Register},
  data() {
    return {
      visible: false,
      customActiveKey: 'tab1',
    };
  },
  methods: {
    modal(e) {
      this.customActiveKey = e;
      this.visible = true;
    },
    cancelForm() {
      this.visible = false;
    },
    handleTabClick(key) {
      this.customActiveKey = key
    },
  },
  created() {
    this.$root.$refs.login = this;
  },
}
</script>

<style scoped>

</style>
