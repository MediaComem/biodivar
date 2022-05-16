<script setup>

  import { useStore } from '../../composables/store.js';

  const { isMobileOrTablet, isWebXRAvailable, section } = useStore();

 const props = defineProps({
    enabled: Boolean,
    biover: Object,
 });

 const emit = defineEmits(['edit', 'duplicate', 'delete', 'visibility', 'editable', 'close'])

</script>


<template>
    <div data-role="menu" class="transition" :class="{enable: props.enabled, disable: !props.enabled}">
        <div data-role="header">
          <p data-role="header-text">{{ props.biover.name }}</p>
          <div data-role="header-cross">
            <img src="../../assets/shared/cross.svg" alt="cross" @click="emit('close')">
          </div>
        </div>
        <ul>
          <li v-if="isMobileOrTablet && isWebXRAvailable" @click="section = 'ar'"><img alt="OpenAR" src="../../assets/shared/more/view_in_ar.svg"> {{ $t('TheMenu.More.AR') }}</li>
          <li><img alt="Map" src="../../assets/shared/more/map.svg"> {{ $t('TheMenu.More.Desktop') }}</li>
          <li @click="emit('edit')"><img alt="Title" src="../../assets/shared/more/edit.svg"> {{ $t('TheMenu.More.Title') }}</li>
          <li @click="emit('duplicate')"><img alt="Copy" src="../../assets/shared/more/file_copy.svg"> {{ $t('TheMenu.More.Duplicate') }}</li>
          <li @click="emit('delete')"><img alt="Delete" src="../../assets/shared/more/delete.svg"> {{ $t('TheMenu.More.Delete') }}</li>
          <li v-if="props.biover.is_public" @click="emit('visibility')"><img alt="Visibility" src="../../assets/shared/more/remove_red_eye.svg"> {{ $t('TheMenu.More.Private') }}</li>
          <li v-if="!props.biover.is_public" @click="emit('visibility')"><img alt="Visibility" src="../../assets/shared/more/visibility_off.svg"> {{ $t('TheMenu.More.Publique') }}</li>
          <li v-if="props.biover.is_editable" @click="emit('editable')"><img alt="Edit" src="../../assets/shared/more/edit.svg"> {{ $t('TheMenu.More.ToUnEdit') }}</li>
          <li v-if="!props.biover.is_editable" @click="emit('editable')"><img alt="Edit" src="../../assets/shared/more/edit_off.svg"> {{ $t('TheMenu.More.ToEdit') }}</li>
          <li><img alt="Star" src="../../assets/shared/more/star_border.svg"> {{ $t('TheMenu.More.ToFavorite') }}</li>
          <li><img alt="PushPin" src="../../assets/shared/more/push_pin.svg"> {{ $t('TheMenu.More.ToPin') }}</li>
          <!--li><img alt="Share" src="../../assets/shared/more/share.svg"> partager ce biovers</li-->
        </ul>
    </div>
</template>

<style scoped>
  @media only screen and (max-width: 499px) {
    [data-role="menu"] {
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 100;
        background-color: #F2F2F2;
    }
  }

  @media only screen and (min-width: 500px) {
    [data-role="menu"] {
        height: 100vh;
        width: 500px;
        position: fixed;
        top: 0;
        z-index: 100;
        background-color: #F2F2F2;
    }
  }

  [data-role="header"] {
    display: flex;
  }

  [data-role="header-text"] {
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
    display: flex;
    align-items: center;
    border: #F2F2F2 solid 1px;
    height: 40px;
    padding-left: 1rem;
    padding-right: 1rem;
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
</style>

