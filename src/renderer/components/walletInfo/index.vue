<template>
  <div class="container">
    <p class="title">generated wallet</p>
    <p>address: {{wallet.address}}</p>
    <p>balance: {{balance}}</p>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>
