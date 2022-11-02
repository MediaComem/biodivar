<script setup>
  import { computed } from 'vue'

  import TheHomeItem from '../components/TheHome/TheHomeItem.vue';
  import BioversItem from '../components/app/BioversItem.vue';
  import { useStore } from '../composables/store.js';

  const { isIOS, biovers, getPinsBiovers } = useStore();

  const pins = computed(() => {
    return getPinsBiovers();
  })
</script>

<template>
<div v-if="!isIOS">
  <p v-if="pins.length > 0" class="font-pin" style="text-align: start">{{ $t('TheMenu.Pin') }}</p>
  <div v-for="(biover, index) in pins" :key="index">
    <BioversItem :biover="biover"/>
  </div>
  <div data-role="item">
    <the-home-item :src="'./assets/symbol-biovers.svg'" :link="'#biovers'" :title="$t('TheMenu.Item.BioverTitle')" :description="$t('TheMenu.Item.BioverDescription')"></the-home-item>
    <the-home-item :src="'./assets/symbol_visualisation.svg'" :link="'#admin'" :title="$t('TheMenu.Item.VisualizationTitle')" :description="$t('TheMenu.Item.VisualizationDescription')"></the-home-item>
    <!--the-home-item :src="'./assets/container.svg'" :title="$t('TheMenu.Item.NewTitle')" :description="$t('TheMenu.Item.NewDescription')"></the-home-item-->
    <the-home-item :src="'./assets/symbol_profil.svg'" :title="$t('TheMenu.Item.ProfilTitle')" :description="$t('TheMenu.Item.ProfilDescription')"></the-home-item>
    <the-home-item :src="'./assets/symbol_settings.svg'" :title="$t('TheMenu.Item.SettingTitle')" :description="$t('TheMenu.Item.SettingDescription')"></the-home-item>
    <the-home-item :src="'./assets/symbol_help.svg'" :title="$t('TheMenu.Item.HelpTitle')" :description="$t('TheMenu.Item.HelpDescription')"></the-home-item>
  </div>
</div>

<div v-else>
 <p>{{ $t('TheMenu.Unsuported') }}</p>
</div>
</template>

<style scoped>

 [data-role="item"] {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.font-pin {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 85, "ital" 0;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.04em;
  }

</style>