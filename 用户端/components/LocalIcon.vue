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

const normalizedName = computed(() => String(props.name || '').trim());

const iconSrc = computed(() => localIconMap[normalizedName.value] || '');
</script>

<style scoped>
.local-icon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
