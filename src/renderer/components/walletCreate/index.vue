<template>
  <div>
    <input v-model="displayName" type="text" placeholder="display name" />
    <br />
    <input v-model="password" type="text" placeholder="password" />
    <br />
    <button @click="createWallet(password)">create wallet</button>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>