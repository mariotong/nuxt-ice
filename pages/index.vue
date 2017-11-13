<template lang="pug">
  .container
    .house(ref="house")
      .items(v-for="(item, index) in houses" :key="index" @click="showHouse(item)")
        .desc
          .words {{item.words}}
          .name {{item.name}}
          .cname {{item.cname}}
        .house-flag
          img(:src='imageCDN + item.name + ".jpeg"' )

    .character
      .title 主要人物
      .section
        .items(v-for="(item, index) in characters" :key="index" @click="showCharacter(item)")
          img(:src="imageCDN + item.profile + detailImgApi")
          .desc
            .cname {{item.name}}
            .name {{item.cname}}
            .playerBy {{item.playedBy}}

    .city
       .city-title 维斯特洛
       .intro 坐落于已知世界的最西端，狭长的维斯特洛大陆由北部的极地冰盖起向南延绵约 3,000 英里。绝境长城是一座巍峨挺立的不可逾越之物，横跨 300 英里，将最北的塞外地区与七大王国相互分离。一个统一的政治实体领导着南方的广阔土地，并形成九块相互联系又相互割据的区域。
       .items(v-for='(item, index) in cities' :key='index')
         .title {{item.title}}
         .body {{item.body}}
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'wechat-auth',

  head() {
    return {
      title: '冰火脸谱'
    }
  },
  computed: {
    ...mapState([
      'houses',
      'characters',
      'cities',
      'imageCDN',
      'detailImgApi'
    ])
  },
  beforeCreate() {
    this.$store.dispatch('fetchHouses')
    this.$store.dispatch('fetchCharacters')
  },
  methods: {
    showHouse(item) {
      this.$router.push({
        path: '/house',
        query: {
          id: item._id
        }
      })
    },
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

<style scoped lang="sass" src="~/static/sass/index.sass"></style>
