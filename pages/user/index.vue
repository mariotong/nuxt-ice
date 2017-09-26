<template lang="pug">
  .container
    .user(v-if="user")
      .user-header
        .text {{user.nickname}}
        img(:src="user.avatar")
      .user-address
        cell(title="收货地址")
        .user-content {{user.address}}
      .user-phone
        cell(title="电话")
        .user-content {{user.phoneNumber}}
      .user-name
        cell(title="姓名")
        .user-content {{user.nickname}}
      .user-order(v-if="user.orders && user.orders.length > 0")
        cell(title="我的订单")
        .user-order-items(v-for="item in user.orders")
          img(:src="item.images")
          .user-order-intro
            .title {{item.title}}
            .content {{item.intro}}
          .user-order-price
            span ${{item.price}}
</template>

<script>
import cell from '~/components/cell.vue'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '个人账户'
    }
  },
  // data() {
  //   return {
  //     user: {
  //       nickname: '二丫',
  //       address: '北京市朝阳区钟情大厦',
  //       phoneNumber: 18811742903,
  //       name: 'ZhengLei',
  //       avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507012004&di=364966bbeffa918b32f3b49063280889&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F20170916%2FueM9-fykymwm9327285.jpg'
  //     },
  //     productImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507012004&di=364966bbeffa918b32f3b49063280889&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F20170916%2FueM9-fykymwm9327285.jpg'
  //   }
  // },
  computed: {
    ...mapState([
      'user'
    ])
  },
  beforeCreate() {
    this.$store.dispatch('fetchUserAndOrders')
  },
  methods: {
  },
  components: {
    cell
  }
}

</script>

<style scoped lang="sass" src="~/static/sass/user.sass"></style>
