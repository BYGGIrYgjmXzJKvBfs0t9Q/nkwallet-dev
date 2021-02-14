<template>
  <div class="container">
    <p class='title'>transfer funds</p>
    <p>sending from address: {{wallet.address}}</p>
    <p>balance: {{balance}}</p>
    <p>to receiving address: {{receiveAddress}}</p>
    <p>amount: {{amount}}</p>
    <p>transaction fee: {{fee}}</p>
    <button @click="transferFunds">click to transfer</button>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>