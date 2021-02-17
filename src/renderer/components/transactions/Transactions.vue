<template>
  <div class="container">
    <p class="title">transactions</p>
    <div v-for="tx in history" :key="tx.hash">
      <p>hash: {{tx.hash}}
        sender: {{tx.sender}}
        recipient: {{tx.recipient}}
        type: {{tx.type}}
        time: {{tx.time}}
        amount: {{tx.amount}}
        url: {{tx.url}}</p>
    </div>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>