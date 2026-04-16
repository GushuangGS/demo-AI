<template>
  <image class="local-icon" :src="iconSrc" mode="aspectFit" />
</template>

<script setup>
import { computed } from 'vue';
import { localIconMap } from './local-icon-map';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const iconSrc = computed(() => localIconMap[props.name] || '');
</script>

<style scoped>
.local-icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
}
</style>
