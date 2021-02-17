<template>
  <div class="container">
    <p class="title">restore wallet from seed</p>
    <p>example: 911d8ba935fc26abb50dc96a6624a8ad32c00378426e78c1bf769504d7764fa5</p>
    <input v-model="seed" type="text" placeholder="seed" />
    <input v-model="password" type="text" placeholder="new password" />
    <button @click="openFromSeed">click to restore</button>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>
