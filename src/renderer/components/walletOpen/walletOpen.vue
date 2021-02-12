<template>
  <div class="container">
    <p class="title">open saved wallet</p>
    <p>type "pw" then click the button</p>
    <input v-model="password" type="text" placeholder="password" />
    <button @click="openFromFile">click to open</button>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>
