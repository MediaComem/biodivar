<script setup>
  import BioverActions from './BioverActions.vue';
  import { useStore } from '../../composables/store.js';
  import { useRouter } from '../../composables/router.js';

  import { dateFormatter, hourFormatter } from '../../utils/formatter.js';

  const { isMobileOrTablet, section, selectedBiovers } = useStore();
  const { page, route } = useRouter();

  const emit = defineEmits(['visibility', 'editable', 'favori', 'pin', 'map'])

  const props = defineProps({
    biover: Object
  });


  function enterAR() {
    selectedBiovers.value = props.biover;
    section.value = 'ar';
  }
</script>

<template>
  <div>
    <div class="item">
        <BioverActions :biover="props.biover" @visibility="emit('visibility')" @editable="emit('editable')" @favori="emit('favori')" @pin="emit('pin')" />
    </div>
    <div>
        <div class="element">
            <img src="../../assets/shared/help.svg" alt="Help">
            <p class="information-text">{{ props.biover.description }}</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/my_location.svg" alt="Location">
            <p class="information-text">Yverdon-les-Bains, Suisse</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/restore.svg" alt="Restore">
            <p class="information-text">{{ $t('TheMenu.Information.LastConnection') }} 31/03/2022, 8h51</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/create.svg" alt="Create">
            <p v-if="props.biover.update_date" class="information-text">{{ $t('TheMenu.Information.LastEdition') }} {{ dateFormatter(props.biover.update_date) }}&#8239;: {{ hourFormatter(props.biover.update_date) }} </p>
            <p v-else class="information-text">{{ $t('TheMenu.Information.NoUpdate') }}</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/architecture.svg" alt="Architecture">
            <p class="information-text">{{ $t('TheMenu.Information.Create') }} {{ dateFormatter(props.biover.creation_date) }}&#8239;: {{ hourFormatter(props.biover.creation_date) }} {{ $t('TheMenu.Information.By') }} {{ props.biover.User.username }}</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/location_on.svg" alt="LocationOn">
            <p class="information-text">{{ props.biover.Poi.length }} {{ $t('TheMenu.Information.POI') }}</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/gesture.svg" alt="Gesture">
            <p class="information-text">{{ props.biover.Path.length }} {{ $t('TheMenu.Information.Traces') }}</p>
        </div>
        <!--div class="element">
            <img src="../../assets/shared/local_florist.svg" alt="Gesture">
            <p class="information-text">7 espèces identifiées</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/visibility.svg" alt="Gesture">
            <p class="information-text">41 vues</p>
        </div-->
         <div class="element">
            <img src="../../assets/shared/storage.svg" alt="Gesture">
            <p class="information-text">15.3 MB</p>
        </div>
    </div>
    <div class="button" v-if="route !== '#admin'">
        <base-button class="enter" @click="enterAR()">
          <img src="../../assets/shared/home.svg" />{{ $t('TheMenu.Information.Enter') }}
        </base-button>
    </div>
    <div class="button-admin" v-else>
        <base-button class="enter-admin" @click="enterAR()">
          <p class="material-symbols-sharp icon-margin">view_in_ar</p>{{ $t('TheMenu.Information.Enter') }}
        </base-button>
        <base-button class="enter-admin" @click="emit('map', props.biover)">
          <p class="material-symbols-sharp icon-margin">map</p>Ouvrir sur la carte
        </base-button>
    </div>
  </div>
</template>

<style scoped>
  p {
    color: white;
  }

  .item {
    display: flex;
    margin-bottom: 1rem;
  }

  .element {
    display: flex;
    text-align: start;
    margin: 0 0 0 2rem;
  }

  .information-text {
    color: #BDBDBD;
    margin: 0;
    margin-left: 4px;
    user-select: none;
    font-family: 'BiodivAR Book';
    font-size: 12px;
    line-height: 12px;
  }

  .button-admin {
    min-width: 240px;
    width: 100%;
    max-width: 500px;
    height: 38px;
    justify-items: center;
    display: flex;
    margin: auto;
    gap: 20px;
    margin-bottom: 20px;
  }

  .button {
    min-width: 240px;
    width: 100%;
    max-width: 310px;
    height: 38px;
    justify-items: center;
    display: inline-block;
  }

  .enter {
    --link-color: white;
    --highlight-color: #2F80ED;
  }

  .enter-admin {
    --link-color: white;
    --highlight-color: #2F80ED;
    --height: 38px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 6px;
  }
</style>