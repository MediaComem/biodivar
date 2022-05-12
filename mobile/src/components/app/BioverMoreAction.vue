<script setup>

  import { useStore } from '../../composables/store.js';

  const { isMobileOrTablet, isWebXRAvailable, section } = useStore();

 const props = defineProps({
    enabled: Boolean,
    biover: Object,
 });

 const emit = defineEmits(['edit', 'duplicate', 'delete', 'visibility', 'editable'])

</script>


<template>
    <div data-role="menu" class="transition" :class="{enable: props.enabled, disable: !props.enabled}">
        <p>{{ props.biover.name }}</p>
        <ul>
            <li v-if="isMobileOrTablet && isWebXRAvailable" @click="section = 'ar'"><img alt="OpenAR" src="../../assets/shared/more/view_in_ar.svg"> ouvrir dans la RA [mobile]</li>
            <li><img alt="Map" src="../../assets/shared/more/map.svg"> ouvrir dans la carte [desktop]</li>
            <li @click="emit('edit')"><img alt="Title" src="../../assets/shared/more/edit.svg"> modifier titre</li>
            <li @click="emit('duplicate')"><img alt="Copy" src="../../assets/shared/more/file_copy.svg"> dupliquer ce biovers</li>
            <li @click="emit('delete')"><img alt="Delete" src="../../assets/shared/more/delete.svg"> supprimer ce biovers</li>
            <li v-if="props.biover.is_public" @click="emit('visibility')"><img alt="Visibility" src="../../assets/shared/more/remove_red_eye.svg"> rendre privé</li>
            <li v-if="!props.biover.is_public" @click="emit('visibility')"><img alt="Visibility" src="../../assets/shared/more/visibility_off.svg"> rendre public</li>
            <li v-if="props.biover.is_editable" @click="emit('editable')"><img alt="Edit" src="../../assets/shared/more/edit.svg"> rendre non-éditable</li>
            <li v-if="!props.biover.is_editable" @click="emit('editable')"><img alt="Edit" src="../../assets/shared/more/edit_off.svg"> rendre éditable</li>
            <li><img alt="Star" src="../../assets/shared/more/star_border.svg"> retirer des favoris</li>
            <li><img alt="PushPin" src="../../assets/shared/more/push_pin.svg"> retirer l'épingle</li>
            <!--li><img alt="Share" src="../../assets/shared/more/share.svg"> partager ce biovers</li-->
        </ul>
    </div>
</template>

<style scoped>
  [data-role="menu"] {
      height: 100vh;
      position: absolute;
      top: 0;
      z-index: 100;
      background-color: #F2F2F2;
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

