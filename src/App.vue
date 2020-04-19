y<template>
  <div id="app">
    <HeadBar></HeadBar>
    <router-view/>
  </div>
</template>

<script>

import HeadBar from './components/HeadBar'
import BottomBar from './components/BottomBar'

export default {
  components: {
     HeadBar,
     BottomBar
  }
}
</script>

<style>

</style>
