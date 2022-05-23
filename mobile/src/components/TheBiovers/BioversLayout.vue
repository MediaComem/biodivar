<script setup>
  import {ref, computed} from '@vue/reactivity';

  import Accordeon from '../app/Accordeon.vue';
  import BioversItem from '../app/BioversItem.vue';

  import { useStore } from '../../composables/store';

  const { username, favori } = useStore();

  const props = defineProps({
      biovers: Object,
  });

  const search = ref('');

  const own = computed(() => {
    return props.biovers.filter((b) => b.User.username === username.value && b.name.toLowerCase().includes(search.value.toLowerCase()));
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
</script>


<template>
    <div data-role="layout">
      <base-input class="search">
        <input type="text" v-model="search">
      </base-input>
      <hr>
      <Accordeon class="own" :header="`mes biovers (${own.length})`">
          <div v-for="(item, index) in own" :key="index">
              <BioversItem :biover="item" />
          </div>
      </Accordeon>
      <hr>
      <Accordeon class="favori" :header="`favoris (${favoriBiovers.length})`">
          <div v-for="(item, index) in favoriBiovers" :key="index">
              <BioversItem :biover="item" />
          </div>
      </Accordeon>
      <hr>
      <Accordeon class="public" :header="`publiques (${publicBiovers.length})`">
          <div v-for="(item, index) in publicBiovers" :key="index">
              <BioversItem :biover="item" />
          </div>
      </Accordeon>
    </div>
</template>

<style scoped>
  [data-role="layout"] {
      width: 100%;
      height: auto;
      background-color: white;
      border-radius: 2rem;
  }

  hr {
      border-top: 1px solid #BDBDBD;
      margin: 0 1rem 0 1rem;
  }

  .search {
      --icon-link: url("../../assets/biovers/search.svg");
      padding-top: 1rem;
      --bg-color: #E0E0E0;
      
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