<template>
  <div>
    <el-page-header class="page-header" @back="goBack" v-bind:content="content">
    </el-page-header>
    <!-- <ol v-if="!!actions">
      <li v-for="action in actions" v-on:click="action.fn" v-bind:key="action.name">{{ action.name }}</li>
    </ol> -->
    <ol class="links" v-if="!!links">
      <li v-for="link in links" v-bind:key="link.name">
        <NuxtLink :to="link.to">{{ link.name }}</NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    props: {
      content: String,
      actions: Array,
      links: Array,
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="sass" scoped>
.page-header
  margin: 20px
  float: left
.links
  float: right
</style>