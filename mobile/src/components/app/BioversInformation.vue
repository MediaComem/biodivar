<script setup>
  import BioverActions from './BioverActions.vue';
  import { useStore } from '../../composables/store.js';
  import { useRouter } from '../../composables/router.js';
  import { store } from '../../store/store.js';

  import { dateFormatter, hourFormatter } from '../../utils/formatter.js';

  const { isMobileOrTablet, section, selectedBiovers } = useStore();
  const { page, route } = useRouter();

  const emit = defineEmits(['visibility', 'editable', 'favori', 'pin'])

  const props = defineProps({
    biover: Object
  });

  function enterAR() {
    selectedBiovers.value = props.biover;
    section.value = 'ar';
  }

  function openInMap() {
    if (window.location.hash !== '#admin') {
      window.location.hash = '#admin';
    }
    store.dispatch('biovers/addBioverToDisplay', props.biover);
    store.dispatch('biovers/addPoiToDisplay', props.biover.id);
    store.dispatch('biovers/addPathToDisplay', props.biover.id);
    store.dispatch('biovers/addTraceToDisplay', props.biover.id);
    store.dispatch('biovers/addEventToDisplay', props.biover.id);
    emit('close');
  }
</script>

<template>
  <div class="layout-item">
    <div class="item">
        <BioverActions :biover="props.biover" @visibility="emit('visibility')" @editable="emit('editable')" @favori="emit('favori')" @pin="emit('pin')" />
    </div>
    <div>
        <div class="element">
            <p class="material-symbols-sharp text-margin">info</p>
            <p class="information-text">{{ props.biover.description }}</p>
        </div>
        <div class="element">
            <p class="material-symbols-sharp text-margin">my_location</p>
            <p class="information-text">{{ props.biover.location }}</p>
        </div>
        <!--div class="element">
            <p class="material-symbols-sharp text-margin">restore</p>
            <p class="information-text">{{ $t('TheMenu.Information.LastConnection') }} 31/03/2022, 8h51</p>
        </div-->
        <div class="element">
            <p class="material-symbols-sharp text-margin">architecture</p>
            <p class="information-text">{{ $t('TheMenu.Information.Create') }} {{ dateFormatter(props.biover.creation_date) }}, {{ hourFormatter(props.biover.creation_date) }} {{ $t('TheMenu.Information.By') }} {{ props.biover.User.username }}</p>
        </div>
        <div class="element">
            <p class="material-symbols-sharp text-margin">create</p>
            <p v-if="props.biover.update_date" class="information-text">{{ $t('TheMenu.Information.LastEdition') }} {{ dateFormatter(props.biover.update_date) }}, {{ hourFormatter(props.biover.update_date) }} </p>
            <p v-else class="information-text">{{ $t('TheMenu.Information.NoUpdate') }}</p>
        </div>
        <div class="element">
            <p class="material-symbols-sharp text-margin">pin_drop</p>
            <p class="information-text">{{ props.biover.Poi.length }} {{ $t('TheMenu.Information.POI') }}</p>
        </div>
        <div class="element">
            <p class="material-symbols-sharp text-margin">gesture</p>
            <p class="information-text">{{ props.biover.Path.length }} {{ $t('TheMenu.Information.Traces') }}</p>
        </div>
        <!--div class="element">
            <p class="material-symbols-sharp text-margin">gesture</p>
            <p class="information-text">7 espèces identifiées</p>
        </div>
        <div class="element">
            <p class="material-symbols-sharp text-margin">gesture</p>
            <p class="information-text">41 vues</p>
        </div-->
         <!--div class="element">
            <p class="material-symbols-sharp text-margin">storage</p>
            <p class="information-text">15.3 MB</p>
        </div-->
    </div>
    <div class="button-margin-top">
      <base-button class="enter-map" @click="openInMap()">
        <p class="material-symbols-sharp icon-margin">map</p><p class="button-text">Ouvrir sur la carte</p>
      </base-button>
    </div>
    <div class="button-margin-bottom">
      <base-button class="enter-admin" @click="enterAR()">
        <p class="material-symbols-sharp icon-margin">view_in_ar</p><p class="button-text">Ouvrir en RA</p>
      </base-button>
    </div>
  </div>
</template>

<style scoped>
  p {
    color: white;
  }

  .layout-item {
    margin-right: 0.8rem;
    margin-left: 0.8rem;
  }

  .item {
    width: 100%;
    display: flex;
  }

  .element {
    display: flex;
    text-align: start;
    margin: 0 0 0.3rem 0rem;
  }

  .information-text {
    color: #BDBDBD;
    margin: 0;
    margin-left: 10px;
    user-select: none;
    font-size: 12px;
    line-height: 14px;
    margin-top: 2px;
    font-variation-settings: "wght" 85, "ital" 0;
  }

  .button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 1.5px;
    font-variation-settings: "wght" 149, "ital" 0;
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
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    margin-left: 0rem !important;
    margin-right: 0rem !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    width: 100% !important;
  }

  .enter-map {
    --link-color: white;
    --highlight-color: #699A3F;
    --height: 38px;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    margin-left: 0rem !important;
    margin-right: 0rem !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    width: 100% !important;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 6px;
  }

  .text-margin {
    margin: 0;
    color: #BDBDBD;
    font-size: 18px;
  }

  .button-margin-top {
    margin-top: 0.8rem;
  }

  .button-margin-bottom {
    margin-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
</style>