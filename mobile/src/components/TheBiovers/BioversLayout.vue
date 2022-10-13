<script setup>
  import {ref, computed} from '@vue/reactivity';

  import Accordeon from '../app/UIElement/Accordeon.vue';
  import BioversItem from '../app/BioversItem.vue';

  import { useStore } from '../../composables/store';

  const { username, favori } = useStore();

  const props = defineProps({
      biovers: Object,
  });

  const emit = defineEmits(['map'])

  const search = ref('');

  const own = computed(() => {
    return props.biovers.filter((b) => b.User.username.toLowerCase() === username.value.toLowerCase() && b.name.toLowerCase().includes(search.value.toLowerCase()));
  })

  const publicBiovers = computed(() => {
    return props.biovers.filter((b) => b.is_public && b.name.toLowerCase().includes(search.value.toLowerCase()));
  })

  const favoriBiovers = computed(() => {
    const biovers = [];
    favori.value.forEach(f => {
        const element = props.biovers.find((b) => b.id === f && b.name.toLowerCase().includes(search.value.toLowerCase()));
        if (element) {
            biovers.push(element);
        }
    })
    return biovers;
  })

  function mapAction(event) {
    emit('map', event);
  }
</script>


<template>
    <div data-role="layout">
      <base-input class="search">
        <input type="text" v-model="search">
      </base-input>
      <hr>
      <Accordeon class="own" :header="`mes biovers (${own.length})`" :length="own.length" :should-be-open="false">
          <div v-for="(item, index) in own" :key="index">
              <BioversItem :biover="item" @map="mapAction"/>
          </div>
      </Accordeon>
      <hr>
      <Accordeon class="favori" :header="`favoris (${favoriBiovers.length})`" :length="favoriBiovers.length" :should-be-open="false">
          <div v-for="(item, index) in favoriBiovers" :key="index">
              <BioversItem :biover="item" @map="mapAction"/>
          </div>
      </Accordeon>
      <hr>
      <Accordeon class="public" :header="`publiques (${publicBiovers.length})`" :length="publicBiovers.length" :should-be-open="false">
          <div v-for="(item, index) in publicBiovers" :key="index">
              <BioversItem :biover="item" @map="mapAction"/>
          </div>
      </Accordeon>
    </div>
</template>

<style scoped>
  [data-role="layout"] {
      width: 100%;
      height: auto;
      background-color: white;
      border-radius: var(--border-radius);
  }

  hr {
      border-top: 1px solid #BDBDBD;
      margin: 0 1rem 0 1rem;
  }

  .search {
      --icon-link: url("../../assets/biovers/search.svg");
      padding-top: 1rem;
      --bg-color: #E0E0E0;
      --border-color: #000000;
  }

  .search input {
    border-color: #E0E0E0 !important;
  }

  .own {
      --icon-link: url("../../assets/biovers/architecture.svg");
  }

  .public {
      --icon-link: url("../../assets/biovers/visibility.svg");
  }

  .favori {
      --icon-link: url("../../assets/biovers/grade.svg");
  }
</style>