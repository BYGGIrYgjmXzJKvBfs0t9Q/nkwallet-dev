<template>
  <div class="container">
    <p class='title'>transfer funds</p>
    <input v-model="recipient" type="text" placeholder="enter recipient address" />
    <input v-model="amount" type="text" placeholder="enter amount" />
    <input v-model="fee" type="text" placeholder="enter fee" />
    <p class='title'>review and submit</p>
    <p>sending from address: {{address}}</p>
    <p>to receiving address: {{displayRecipient}}</p>
    <p>balance: {{displayBalance}}</p>
    <p>amount: {{displayAmount}}</p>
    <p>transaction fee: {{displayFee}}</p>
    <button @click="transferFunds">click to transfer</button>
  </div>
</template>

<script src="./scripts"></script>

<style scoped lang="scss">
  @import "./styles";
</style>