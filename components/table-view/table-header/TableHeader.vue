<template>
  <th>{{ header }}</th>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'TableHeader',
  props: {
    header: {
      type: String,
      required: true,
    },
  },
});
</script>