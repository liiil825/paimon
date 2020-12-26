<template>
  <el-header class="header">
    <div class="title"></div>
    <div class="nav">
      <NuxtLink to="character">角色</NuxtLink>
      <NuxtLink to="weapon">武器</NuxtLink>
    </div>
  </el-header>
</template>

<style lang="sass" scoped>
.header
  height: 80px
  background: $--color-primary
  color: $--color-white
  display: flex
  align-items: center
  color: $--color-white
  margin: 0 auto
.title
  flex: 1
  height: 32px
  line-height: 32px
.nav
  margin-right: 40px
  a
    color: $--color-white
</style>