<script setup>
  import TheHomeItem from '../components/TheHome/TheHomeItem.vue';
  import { useStore } from '../composables/store.js';

  const { isIOS, isMobileOrTablet } = useStore();
</script>

<template>
<div style="text-align: center" v-if="!isIOS">
  <the-home-item v-if="isMobileOrTablet" :src="'/assets/symbol-biovers.svg'" :title="'Biovers'" :description="'accéder à vos environnements virtuels partagés'"></the-home-item>
  <the-home-item :src="'/assets/symbol_visualisation.svg'" :title="'VISUALISATION [desktop]'" :description="'gestion des données géographiques [application desktop]'"></the-home-item>
  <the-home-item :src="'/assets/container.svg'" :title="'Nouveau Biovers'" :description="'créer un nouvel environnement virtuel partagé'"></the-home-item>
  <the-home-item :src="'/assets/symbol_profil.svg'" :title="'Profil'" :description="'gestion du nom d\'utilisateur, courriel et mot de passe'"></the-home-item>
  <the-home-item :src="'/assets/symbol_settings.svg'" :title="'Biovers'" :description="'affichage, localisation, utilisation des données...'"></the-home-item>
  <the-home-item :src="'/assets/symbol_help.svg'" :title="'Biovers'" :description="'à propos du projet BiodivAR'"></the-home-item>
</div>
<div v-else>
 <p>Cet appareil ne supportant pas webXR, vous ne pouvez l'utiliser avec cette application</p>
</div>
</template>

<style scoped>
div {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}


</style>