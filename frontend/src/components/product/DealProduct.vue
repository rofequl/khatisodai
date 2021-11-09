<template>
  <div class="deal">
    <span>{{deal.deal_name}}</span>
  </div>
</template>

<script>
export default {
  props: ['deal'],
  name: "DealProduct"
}
</script>

<style scoped lang="scss">
.deal {
  border: 2px solid #28a745;
  border-radius: 10px;
  height: 30px;
  padding-left: 0;
  margin-bottom: 5px;

  span:first-child {
    background-image: linear-gradient(to right, #28a745, #ff4d4f);
    padding: 7px 30px;
    height: 30px;
    margin-top: 2px;
    color: white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 25px 30px;
  }
}

.deal {
  padding-top: 2px;
}
</style>
