<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">派蒙永远的伙伴</h1>
      <h2 class="subtitle">原神数据分析系统</h2>
      <NuxtLink to="character">角色</NuxtLink>
      <NuxtLink to="weapon">武器</NuxtLink>
    </div>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.links a {
  margin-bottom: 8px;
}

.subtitle {
  font-weight: 400;
  font-size: 20px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

h2,
p {
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

h2 {
  padding: 20px;
}

a {
  color: #3b8070;
}
</style>
