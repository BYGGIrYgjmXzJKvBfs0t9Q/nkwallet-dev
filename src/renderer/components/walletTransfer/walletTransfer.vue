<template>
  <div class="container">
    <p class='title'>transfer funds</p>
    <p>sending from address: {{address}}</p>
    <p>balance: {{balance}}</p>
    <p>to receiving address: {{receiveAddress}}</p>
    <p>balance: {{receiverBalance}}</p>
    <p>amount: {{amount}} NKN</p>
    <p>transaction fee: {{fee}} NKN</p>
    <button @click="transferFunds">click to transfer</button>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>