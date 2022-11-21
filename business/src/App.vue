<script setup>
  import { delay, version } from '@okey573/awesome-fe-utils'

  const testF = async () => {
    await delay(300)
    console.log(version)
  }
</script>

<template>
  <div>
    <button @click="testF">test</button>
  </div>
</template>

<style scoped>
  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
