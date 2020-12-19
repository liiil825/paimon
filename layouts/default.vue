<template>
  <div>
    <the-header></the-header>
    <div class="page-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  async beforeMount() {
    this.envId = this.$cloudbase.config.env;
    // 以匿名登录为例
    try {
      const auth = this.$cloudbase.auth({ persistence: "local" });

      if (!auth.hasLoginState()) {
        await auth.anonymousAuthProvider().signIn();
      }

      // console.log("用户id", auth.hasLoginState().user.uid);
      this.isLoginSuccss = true;
    } catch (e) {
      this.isLoginSuccss = false;
      console.error(e);
      console.log(e.code);
    }
  },
}
</script>