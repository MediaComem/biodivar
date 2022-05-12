<script setup>
  import { ref, onMounted } from 'vue'

  import TheHomeItem from '../components/TheHome/TheHomeItem.vue';
  import BioversItem from '../components/app/BioversItem.vue';
  import { useStore } from '../composables/store.js';

  import { getBiovers } from '../utils/api.js';

  const { isIOS } = useStore();
  const biovers = ref([]);

  onMounted(() => {
    getBiovers().then((resp) => {
      resp.data.forEach((biover) => {
        biovers.value.push(biover);
      })
    })
  });
</script>

<template>
<div v-if="!isIOS">
  <div v-for="(biover, index) in biovers" :key="index">
    <BioversItem :biover="biover" />
  </div>
  <div data-role="item">
    <the-home-item :src="'/assets/symbol-biovers.svg'" :link="'#biovers'" :title="'Biovers'" :description="'accéder à vos environnements virtuels partagés'"></the-home-item>
    <the-home-item :src="'/assets/symbol_visualisation.svg'" :title="'VISUALISATION [desktop]'" :description="'gestion des données géographiques [application desktop]'"></the-home-item>
    <the-home-item :src="'/assets/container.svg'" :title="'Nouveau Biovers'" :description="'créer un nouvel environnement virtuel partagé'"></the-home-item>
    <the-home-item :src="'/assets/symbol_profil.svg'" :title="'Profile'" :description="'gestion du nom d\'utilisateur, courriel et mot de passe'"></the-home-item>
    <the-home-item :src="'/assets/symbol_settings.svg'" :title="'Réglages'" :description="'affichage, localisation, utilisation des données...'"></the-home-item>
    <the-home-item :src="'/assets/symbol_help.svg'" :title="'Aide / A propos'" :description="'à propos du projet BiodivAR'"></the-home-item>
  </div>
</div>

<div v-else>
 <p>Cet appareil ne supportant pas webXR, vous ne pouvez l'utiliser avec cette application</p>
</div>
</template>

<style scoped>

 [data-role="item"] {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}


</style>