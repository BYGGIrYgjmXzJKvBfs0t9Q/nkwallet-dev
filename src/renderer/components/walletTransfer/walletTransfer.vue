<template>
  <div class="create-modal">
    <p class='title'>transfer {{amount}} NKN to {{receiveAddress}}</p>
    <button @click="transferFunds">click to transfer</button>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>