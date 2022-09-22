<script setup>
  import { ref } from 'vue';
  import { store } from '../../store/store.js';
  import { useStore } from '../../composables/store.js';
  import { couldEdit } from '../../utils/authorization.js';

  const { isMobileOrTablet, section, username, isInFavori, isInPins } = useStore();

  const editableRight = ref(couldEdit(props.biover));

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
          <img src="../../assets/shared/cross.svg" alt="cross" @click="emit('close')">
        </div>
      </div>
      <ul>
        <li v-if="isMobileOrTablet" @click="section = 'ar'"><img alt="OpenAR" src="../../assets/shared/more/view_in_ar.svg"> {{ $t('TheMenu.More.AR') }}</li>
        <li @click="openInMap"><img alt="Map" src="../../assets/shared/more/map.svg"> {{ $t('TheMenu.More.Desktop') }}</li>
        <li :class="{'not-allowed': !editableRight}" @click="editableRight ? emit('edit') : ''"><img alt="Title" src="../../assets/shared/more/edit.svg"> {{ $t('TheMenu.More.Title') }}</li>
        <li @click="emit('duplicate')"><img alt="Copy" src="../../assets/shared/more/file_copy.svg"> {{ $t('TheMenu.More.Duplicate') }}</li>
        <li :class="{'not-allowed': !editableRight}" @click="editableRight ? emit('delete') : ''"><img alt="Delete" src="../../assets/shared/more/delete.svg"> {{ $t('TheMenu.More.Delete') }}</li>
        <li v-if="props.biover.is_public" :class="{'not-allowed': !editableRight}" @click="editableRight ? emit('visibility') : ''"><img alt="Visibility" src="../../assets/shared/more/remove_red_eye.svg"> {{ $t('TheMenu.More.Private') }}</li>
        <li v-if="!props.biover.is_public" :class="{'not-allowed': !editableRight}" @click="editableRight ? emit('visibility') : ''"><img alt="Visibility" src="../../assets/shared/more/visibility_off.svg"> {{ $t('TheMenu.More.Publique') }}</li>
        <li v-if="props.biover.is_editable" :class="{'not-allowed': !editableRight}" @click="editableRight ?emit('editable') : ''"><img alt="Edit" src="../../assets/shared/more/edit.svg"> {{ $t('TheMenu.More.ToUnEdit') }}</li>
        <li v-if="!props.biover.is_editable" :class="{'not-allowed': !editableRight}" @click="editableRight ?emit('editable') : ''"><img alt="Edit" src="../../assets/shared/more/edit_off.svg"> {{ $t('TheMenu.More.ToEdit') }}</li>
        <li v-if="isInFavori(props.biover.id)" @click="emit('favori')"><img alt="Star" src="../../assets/shared/more/star.svg"> {{ $t('TheMenu.More.ToFavorite') }}</li>
        <li v-if="!isInFavori(props.biover.id)" @click="emit('favori')"><img alt="Star" src="../../assets/shared/more/star_border.svg"> {{ $t('TheMenu.Dialog.FavoriAdd') }}</li>
        <li v-if="isInPins(props.biover.id)" @click="emit('pin')"><img alt="PushPin" src="../../assets/shared/more/push_pin_fill.svg"> {{ $t('TheMenu.More.ToPin') }}</li>
        <li v-if="!isInPins(props.biover.id)" @click="emit('pin')"><img alt="PushPin" src="../../assets/shared/more/push_pin.svg"> {{ $t('TheMenu.More.FromUnPin') }}</li>
        <!--li><img alt="Share" src="../../assets/shared/more/share.svg"> partager ce biovers</li-->
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
    font-family: 'BiodivAR Round Medium';
    font-size: 18px;
    line-height: 16px;
    margin-left: 1rem;
    padding-right: 1rem;
    display: block;
    text-align: start;
    width: 100%;
    user-select: none;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
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
    font-family: 'BiodivAR Medium';
    font-size: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #BDBDBD;
    height: 40px;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
  }

  img {
    padding-right: 10px;
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
</style>

