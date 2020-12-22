<template>
  <div class="el-page-header page-header">
    <div class="el-page-header__left" @click="goBack">
      <i class="el-icon-back"></i>
      <div class="el-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="el-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
    <ol class="links" v-if="!!links">
      <li v-for="link in links" v-bind:key="link.name">
        <el-button :type="link.type || 'primary'" @click="goTo(link.to)">
          {{ link.name }}
        </el-button>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '~/interfaces/cloudbase'
import linkType from '~/interfaces/view/link'

@Component
export default class ThePageHeader extends Vue {
  @Prop(String) readonly content: string | ''
  @Prop(String) readonly title: string | ''
  @Prop(Array) readonly links: linkType[]
  
  goBack() {
    this.$router.back()
  }
  goTo(to: string) {
    this.$router.push(to)
  }
}
</script>

<style lang="sass" scoped>
.page-header
  margin: 20px 0
  align-items: center
.el-page-header__content
  flex: 1
.links
  float: right
</style>