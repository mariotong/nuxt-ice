<template lang="pug">
.container
  .product
    .swiper(v-swiper:mySwiper='swiperConfig')
      .swiper-wrapper
        .swiper-slide(v-for='item in product.images')
          img(:src='item')
      .swiper-pagination.swiper-pagination-bullets

    .content
      .price(v-if='product.price')
        span.main-price {{Number(product.price).toFixed(2) - Number(product.price).toFixed(2).substr(-3)}}
        span.other-price {{Number(product.price).toFixed(2).substr(-3)}}

    .name {{product.title}}
    .intro {{product.intro}}
    .info
      cell(v-for='(item, index) in product.parameters' :key='index' :title='item.key' :content='Number(item.value)')
    .attentions
      .title 购买提示
      ol
        li(v-for='item in attentions') {{item}}

  .product-footer
    span(@click="buyProduct") 购买
</template>

<script>
import { mapState } from 'vuex'
import cell from '~/components/cell.vue'

export default {
  head () {
    return {
      title: '购买页面'
    }
  },
  computed: {
    ...mapState({
      'product': 'currentProduct'
    })
  },
  data () {
    return {
      swiperConfig: {
        autoplay: 4000,
        direction: 'horizontal',
        loop: true,
        pagination: '.swiper-pagination'
      },

      attentions: [
        '商品和服务的差异',
        '清关服务',
        '物流服务',
        '需要更多帮助，请联系管理员'
      ]
    }
  },
  methods: {
    buyProduct(item) {
      console.log(item)
    }
  },
  beforeCreate() {
    const id = this.$route.query.id
    this.$store.dispatch('showProduct', id)
  },
  components: {
    cell
  }
}
</script>

<style scoped lang="sass" src="~/static/sass/deal.sass">

</style>
