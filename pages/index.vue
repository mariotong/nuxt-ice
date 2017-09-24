<template lang="pug">
  .container
    .house(ref="house")
      .items(v-for="(item, index) in houses" :key="index" @click="focusHouse(item)")
        .desc
          .words {{item.words}}
          .cname {{item.name}}
          .name {{item.cname}}

    .characters
      .title 主要人物
      .section
        .content(v-for="(item, index) in characters" :key="index" @click="showCharacter(item)")
          img(:src="item.profile")
          .desc
            .cname {{item.name}}
            .name {{item.cname}}
            .playerBy {{item.playedBy}}
            .profile {{item.profile}}

    .city
      .city-title 维斯特洛
      .intro 在售卖弹框也价格税率提醒在售卖弹框也价格税率提醒在售卖弹框也价格税率提醒在售卖弹框
      .items(v-for="(item, index) in cities" :key="index")
        .title {{item.title}}
        .body {{item.body}}
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '冰火脸谱'
    }
  },
  computed: {
    ...mapState([
      'houses',
      'characters',
      'cities'
    ])
  },
  beforeCreate() {
    this.$store.dispatch('fetchHouses')
    this.$store.dispatch('fetchCharacters')
    this.$store.dispatch('fetchCities')
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

<style scoped lang="sass" src="~static/sass/index.sass"></style>
