<template lang="pug">
.container
  .house-media
    img(v-if="house.name" :src="imageCDN + house.name + '.jpeg'")
    .desc
      .words {{house.word}}
      .name {{house.name}}
  .house-body
    .title {{house.cname}}
    .body {{house.intro}}
    .title 主要角色
    .body(v-for='(item, index) in house.swornMembers')
      .members(v-if="item.character")
        img(:src="imageCDN + item.character.profile + detailImgApi" @click="showCharacter(item.character)")
        .desc
          .cname {{item.character.cname}}
          .intro {{item.text}}

    .house-history(v-for="(item, index) in house.sections" :key="index")
      .title {{item.title}}
      .content(v-for="text in item.content") {{text}}
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '家族详情'
    }
  },
  computed: {
    ...mapState({
      house: 'currentHouse',
      imageCDN: 'imageCDN',
      detailImgApi: 'detailImgApi'
    })
  },
  beforeCreate() {
    let id = this.$route.query.id

    this.$store.dispatch("showHouse", id)
  },
  methods: {
    showCharacter(item) {
      this.$router.push({
        path: '/character',
        query: {
          id: item._id
        }
      })
    }
  }
}
</script>

<style scoped lang="sass" src="~/static/sass/house.sass">

</style>
