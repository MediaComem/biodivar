<script setup>
  import {ref, computed} from '@vue/reactivity';

  import Accordeon from '../app/UIElement/Accordeon.vue';
  import BioversItem from '../app/BioversItem.vue';

  import BioverCreator from '../TheAdmin/biovers/Dialog/BioverCreator.vue';

  import { useStore } from '../../composables/store';

  const { username, favori } = useStore();

  const props = defineProps({
      biovers: Array,
  });

  const search = ref('');
  const bioversCreator = ref(false);
  const ownOpen = ref(false);
  const publicOpen = ref(false);
  const favoriOpen = ref(false);

  const own = computed(() => {
    const result = props.biovers.filter((b) => b.User.username.toLowerCase() === username.value.toLowerCase() && b.name.toLowerCase().includes(search.value.toLowerCase()));
    ownOpen.value = search.value !== '' && result.length > 0;
    return result;
  })

  const publicBiovers = computed(() => {
    const result = props.biovers.filter((b) => b.is_public && b.name.toLowerCase().includes(search.value.toLowerCase()));
    publicOpen.value = search.value !== '' && result.length > 0;
    return result;
  })

  const favoriBiovers = computed(() => {
    const biovers = [];
    favori.value.forEach(f => {
        const element = props.biovers.find((b) => b.id === f && b.name.toLowerCase().includes(search.value.toLowerCase()));
        if (element) {
            biovers.push(element);
        }
    })
    favoriOpen.value = search.value !== '' && biovers.length > 0;
    return biovers;
  })

  function openBioversCreator() {
    bioversCreator.value = true;
  }

  function closeBioversCreator() {
    bioversCreator.value = false;
  }
</script>


<template>
    <div data-role="layout">
      <base-input class="search">
        <p class="material-symbols-sharp icon-margin icon-font fill-font">search</p>
        <input type="text" v-model="search">
      </base-input>
      <base-button class="button" @click="openBioversCreator">
        <p class="material-symbols-sharp icon-button-margin icon-font">add_circle</p><p class="button-text">Créer un nouveau biovers</p>
      </base-button>
      <hr>
      <Accordeon class="own margin-accordeon" :header="`mes biovers (${own.length})`" :could-update-header="false" :length="own.length" :should-be-open="ownOpen" :image="'architecture'">
          <div v-for="(item, index) in own" :key="index" class="margin">
              <BioversItem :biover="item"/>
          </div>
      </Accordeon>
      <hr>
      <Accordeon class="favori margin-accordeon" :header="`favoris (${favoriBiovers.length})`" :could-update-header="false" :length="favoriBiovers.length" :should-be-open="favoriOpen" :image="'star'">
          <div v-for="(item, index) in favoriBiovers" :key="index" class="margin">
              <BioversItem :biover="item"/>
          </div>
      </Accordeon>
      <hr>
      <Accordeon class="public margin-accordeon" :header="`publiques (${publicBiovers.length})`" :could-update-header="false" :length="publicBiovers.length" :should-be-open="publicOpen" :image="'remove_red_eye'">
          <div v-for="(item, index) in publicBiovers" :key="index" class="margin">
              <BioversItem :biover="item"/>
          </div>
      </Accordeon>
    </div>
    <BioverCreator :showDialog="bioversCreator" @closeDialog="closeBioversCreator"/> 
</template>

<style scoped>
  [data-role="layout"] {
      width: 100%;
      height: auto;
      background-color: white;
      border-radius: 0;
  }

  hr {
    border: none;
    border-top: 1px solid #BDBDBD;
    margin: 0 1rem 0 1rem;
  }

  .margin {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .search {
      padding-top: 0.8rem;
      --bg-color: #E0E0E0;
      --border-color: #000000;
      margin-bottom: -2px;
  }

  .search input {
    border-color: #E0E0E0 !important;
  }

  .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 6px;
    position: absolute;
    top: 18px;
    left: 21px;
  }

  .icon-button-margin {
    margin: 0px;
    padding-right: 6px;
  }

  .button {
    --link-color: white;
    --highlight-color: #2F80ED;
    margin-top: 0px !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
  }

  .button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 1.5px;
    font-variation-settings: "wght" 149, "ital" 0;
  }

  .margin-accordeon {
    --left-margin: 1rem;
  }
</style>