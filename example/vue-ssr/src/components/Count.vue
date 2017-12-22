<template>
  <div>
    <h3> Count page</h3>
    <div>
      <p>{{ mode }}</p>
      <p>count: {{ count }}</p>
      <p>
        <button @click="count ++">click +1</button>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mode: process.env.VUE_ENV === 'server' ? 'server' : 'client',
        count: 0
      }
    }
  }
</script>

