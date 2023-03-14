<script setup>
  import { ref } from 'vue';
  import { store } from '../../store/store.js';
  import { useStore } from '../../composables/store.js';
  import { couldEdit, isCurrentOwner } from '../../utils/authorization.js';

  const { isMobileOrTablet, section, username, isInFavori, isInPins } = useStore();

  const editableRight = ref(couldEdit(props.biover));
  const isOwner = ref(isCurrentOwner(props.biover));

  const props = defineProps({
    enabled: Boolean,
    biover: Object ,
  });

  const emit = defineEmits(['edit', 'duplicate', 'delete', 'visibility', 'editable', 'favori', 'pin', 'close'])

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
  <div>
    <div data-role="menu" class="transition" :class="{enable: props.enabled, disable: !props.enabled}" >
      <div data-role="header">
        <p data-role="header-text">{{ props.biover.name }}</p>
        <div data-role="header-cross">
          <p class="material-symbols-sharp icon-margin icon-font fill-font" style="margin-top: 10px; margin-right: 0.5rem; padding-right: 0px;" @click="emit('close')">close</p>
        </div>
      </div>
      <ul>
        <li @click="openInMap"><p class="material-symbols-sharp icon-margin icon-font">map</p> {{ $t('TheMenu.More.Desktop') }}</li>
        <li @click="section = 'ar'"><p class="material-symbols-sharp icon-margin icon-font">view_in_ar</p> {{ $t('TheMenu.More.AR') }}</li>
        <li v-if="isInPins(props.biover.id)" @click="emit('pin')"><p class="material-symbols-sharp icon-margin icon-font fill-font">push_pin</p> {{ $t('TheMenu.More.ToPin') }}</li>
        <li v-if="!isInPins(props.biover.id)" @click="emit('pin')"><p class="material-symbols-sharp icon-margin icon-font">push_pin</p> {{ $t('TheMenu.More.FromUnPin') }}</li>
        <li v-if="isInFavori(props.biover.id)" @click="emit('favori')"><p class="material-symbols-sharp icon-margin icon-font fill-font">star</p> {{ $t('TheMenu.More.ToFavorite') }}</li>
        <li v-if="!isInFavori(props.biover.id)" @click="emit('favori')"><p class="material-symbols-sharp icon-margin icon-font">star</p> {{ $t('TheMenu.Dialog.FavoriAdd') }}</li>
        <li v-if="props.biover.is_public" :class="{'not-allowed': !isOwner}" @click="isOwner ? emit('visibility') : ''"><p class="material-symbols-sharp icon-margin icon-font fill-font">remove_red_eye</p> {{ $t('TheMenu.More.Private') }}</li>
        <li v-if="!props.biover.is_public" :class="{'not-allowed': !isOwner}" @click="isOwner ? emit('visibility') : ''"><p class="material-symbols-sharp icon-margin icon-font fill-font">visibility_off</p> {{ $t('TheMenu.More.Publique') }}</li>
        <li v-if="props.biover.is_editable" :class="{'not-allowed': !isOwner}" @click="isOwner ?emit('editable') : ''"><p class="material-symbols-sharp icon-margin icon-font fill-font">edit</p> {{ $t('TheMenu.More.ToUnEdit') }}</li>
        <li v-if="!props.biover.is_editable" :class="{'not-allowed': !isOwner}" @click="isOwner ?emit('editable') : ''"><p class="material-symbols-sharp icon-margin icon-font fill-font">edit_off</p> {{ $t('TheMenu.More.ToEdit') }}</li>
        <li :class="{'not-allowed': !editableRight}" @click="editableRight ? emit('edit') : ''"><p class="material-symbols-sharp icon-margin icon-font fill-font">tune</p> {{ $t('TheMenu.More.Title') }}</li>
        <li @click="emit('duplicate')"><p class="material-symbols-sharp icon-margin icon-font">file_copy</p> {{ $t('TheMenu.More.Duplicate') }}</li>
        <li :class="{'not-allowed': !editableRight}" @click="editableRight ? emit('delete') : ''"><p class="material-symbols-sharp icon-margin icon-font">delete</p> {{ $t('TheMenu.More.Delete') }}</li>
      </ul>
    </div>
    <div v-if="props.enabled" class="outside" @click="emit('close')"/>  
  </div>
</template>

<style scoped>
  @media only screen and (max-width: 499px) {
    [data-role="menu"] {
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 10000;
        background-color: #F2F2F2;
    }
  }

  @media only screen and (min-width: 500px) {
    [data-role="menu"] {
        height: 100vh;
        width: 500px;
        position: fixed;
        top: 0;
        z-index: 10000;
        background-color: #F2F2F2;
    }

    .outside {
      height: 100vh;
      width: calc(100% - 500px);
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  [data-role="header"] {
    display: flex;
    border-bottom: solid 1px #BDBDBD;
  }

  [data-role="header-text"] {
    font-family: 'BiodivAR Title';
    font-variation-settings: "wdth" 60, "wght" 90;
    font-size: 18px;
    line-height: 18px;
    margin-left: 0.5rem;
    padding-right: 1rem;
    display: block;
    text-align: start;
    width: 100%;
    user-select: none;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    height: 25px;
    padding-left: 3px;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  [data-role="header-cross"] {
    display: contents;
    width: 20%;
  }

  ul {
      list-style: none;
      padding: 0;
      margin: 0
  }

  li {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 110, "ital" 0;
    font-size: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #BDBDBD;
    height: 40px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    cursor: pointer;
  }

  li:hover {
    background-color: #8DC26F;
    mix-blend-mode: multiply;
  }

 .enable {
    right: 0; 
 }

 .disable {
    right: -100vw;
 }

 .transition {
    transition: right 0.4s ease;
 }

 .not-allowed {
   cursor: not-allowed;
   opacity: 0.5;
 }

 .not-allowed:hover {
    background-color: #F2F2F2;
 }

 .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    padding-right: 10px;
    margin: 0px;
  }

  .fill-font {
    font-variation-settings: "FILL" 0;
  }
</style>

