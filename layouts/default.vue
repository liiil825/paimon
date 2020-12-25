<template>
  <div>
    <the-header></the-header>
    <div class="page-content">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Layout extends Vue {
  get envId() {
    return this.$cloudbase.config.env
  }

  isLoginSuccss: Boolean = false
  async beforeMount() {
    // 以匿名登录为例
    try {
      const auth = this.$cloudbase.auth({ persistence: "local" })
      if (!auth.hasLoginState()) {
        await auth.anonymousAuthProvider().signIn()
      }
      // console.log("用户id", auth.hasLoginState().user.uid);
      this.isLoginSuccss = true
    } catch (e) {
      this.isLoginSuccss = false
      console.error(e)
      console.log(e.code)
    }
  }
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
.bounce-enter-active {
  transform-origin: top;
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  transform-origin: top;
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(0);
  }
}
</style>