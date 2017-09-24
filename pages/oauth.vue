<template lang="pug">
  .container
</template>
<script>
import { mapState } from 'vuex'

export default {
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head () {
    return {
      title: `认证页面`
    }
  },
  beforeMount() {
    const url = encodeURIComponent(window.location.href)

    this.$store.dispatch('getUserByOAuth', url).then(res => {
      if(res.data.success) {
        const params = res.data.params
        console.log(res.data)
      }
    })

  }
}
</script>

<style scoped>

</style>
