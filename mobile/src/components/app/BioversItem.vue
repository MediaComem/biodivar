<script setup>
  import { ref } from '@vue/reactivity';

  import { useStore } from '../../composables/store';
  
  import PushPin from '../../assets/vue-svg/PushPin.vue';
  import Stars from '../../assets/vue-svg/Stars.vue';
  import Architecture from '../../assets/vue-svg/Architecture.vue';
  import RedEye from '../../assets/vue-svg/RedEye.vue';
  import Edit from '../../assets/vue-svg/Edit.vue';
  import More from '../../assets/vue-svg/More.vue';

  import BioversInformation from './BioversInformation.vue';
  import BioverMoreAction from './BioverMoreAction.vue';
  import BioverTitleDialog from './Dialog/BioverTitleDialog.vue';
  import BioverDuplicateDialog from './Dialog/BioverDuplicateDialog.vue';
  import BioverDeleteDialog from './Dialog/BioverDeleteDialog.vue';
  import BioverVisibilityDialog from './Dialog/BioverVisibilityDialog.vue';
  import BioverEditableDialog from './Dialog/BioverEditableDialog.vue';
  import BioverFavoriDialog from './Dialog/BioverFavoriDialog.vue';

  const { username, isInFavori, favori } = useStore();

  const isOpen = ref(false);

  const pushPin = ref(false);
  const stars = ref(false);
  const architecture = ref(false);

  const more = ref(false);

  const editTitleDialog = ref(false);
  const duplicateBioverDialog = ref(false);
  const deleteBioverDialog = ref(false);
  const visibilityDialog = ref(false);
  const editableDialog = ref(false);
  const favoriDialog = ref(false);

  const props = defineProps({
    biover: Object,
  })

  function closeAllDialog() {
    editTitleDialog.value = false;
    duplicateBioverDialog.value = false;
    deleteBioverDialog.value = false;
    visibilityDialog.value = false;
    editableDialog.value = false;
    favoriDialog.value = false;
  }

  function openDialog(dialog) {
    closeAllDialog();
    switch (dialog) {
      case 'title':       editTitleDialog.value = true;
                          break;
      case 'duplicate':   duplicateBioverDialog.value = true;
                          break;
      case 'delete':      deleteBioverDialog.value = true;
                          break;      
      case 'visibility':  visibilityDialog.value = true;
                          break;
      case 'edition':     editableDialog.value = true;
                          break;      
      case 'favori':      favoriDialog.value = true;
                          break;                              
    }
    more.value = false;
  }

  function saveTitle(modification) {
    props.biover.name = modification.title;
    props.biover.description = modification.description;
    editTitleDialog.value = false;
  }

  function duplicate(newTitle) {
    console.log(newTitle)
    duplicateBioverDialog.value = false;
  }

  function deleteBiover() {
    console.log('DELETE');
    deleteBioverDialog.value = false;
  }

  function changeVisibility(state) {
    props.biover.is_public = state;
    visibilityDialog.value = false;
  }

  function changeEdition(state) {
    props.biover.is_editable = state;
    editableDialog.value = false;
  }

  function favoriEdition(state) {
    if (state) {
      const index = favori.value.findIndex((f) => f === props.biover.id);
      if (index === -1) favori.value.push(props.biover.id);  
    }
    else {
      const index = favori.value.findIndex((f) => f === props.biover.id);
      if (index > -1) favori.value.splice(index, 1);
    }
    favoriDialog.value = false;
  }
</script>

<template>
  <div :class="{'menu-open': isOpen, 'menu-close': !isOpen}" class="menu menu-transition" style="display: inline-block">
    <div data-role="item">
        <div data-role="left" @click="isOpen = !isOpen">
            <img :class="{rotate: isOpen}" class="img-transition" src="../../assets/shared/language.svg" alt="Language">
            <div class="align text">
                <p>{{ props.biover.name }}</p>
            </div>
        </div>
        <div data-role="right">
            <div class="align">
              <PushPin :stroke="pushPin ? 'white' : '#666666'" :color="pushPin ? 'white' : 'none'"/>
            </div>
            <div class="align">
                <Stars :stroke="isInFavori(props.biover.id) ? 'white' : '#666666'" :color="isInFavori(props.biover.id) ? 'white' : 'none'"/>
            </div>
            <div class="align">
                <Architecture :color="username === props.biover.User.username ? 'white' : '#666666'"/>
            </div>
            <div class="align">
                <RedEye :fill="props.biover.is_public" />
            </div>
            <div class="align">
                <Edit :fill="props.biover.is_editable"/>
            </div>
            <div class="align more">
                <More :color="'white'" @click="more = !more"/>
            </div>
        </div>
    </div>
  <BioversInformation v-if="isOpen" :biover="props.biover" @visibility="openDialog('visibility')" @editable="openDialog('edition')" @favori="openDialog('favori')"/>
  <BioverMoreAction :enabled="more" :biover="props.biover" @edit="openDialog('title')" @duplicate="openDialog('duplicate')" @delete="openDialog('delete')" @visibility="openDialog('visibility')" @editable="openDialog('edition')" @favori="openDialog('favori')" @close="more = false"/>
  <BioverTitleDialog v-if="editTitleDialog" :biover="props.biover" @close="editTitleDialog = false" @save="saveTitle" />
  <BioverDuplicateDialog v-if="duplicateBioverDialog" :biover="props.biover" @close="duplicateBioverDialog = false" @duplicate="duplicate" />
  <BioverDeleteDialog v-if="deleteBioverDialog" :biover="props.biover" @close="deleteBioverDialog = false" @delete="deleteBiover()" />
  <BioverVisibilityDialog v-if="visibilityDialog" :biover="props.biover" :current-visibility="props.biover.is_public" @close="visibilityDialog = false" @visibility="changeVisibility"/>
  <BioverEditableDialog v-if="editableDialog" :biover="props.biover" :current-editable="props.biover.is_editable" @close="editableDialog = false" @editable="changeEdition"/>
  <BioverFavoriDialog v-if="favoriDialog" :biover="props.biover" :favori-state="isInFavori(props.biover.id)" @close="favoriDialog = false" @favori-action="favoriEdition" />
  <div v-if="editTitleDialog || duplicateBioverDialog || deleteBioverDialog || visibilityDialog || editableDialog || favoriDialog" class="dialog-overlay" @click="closeAllDialog()" />
  </div>
</template>

<style scoped>
  [data-role="item"] {
    width: 100%;
    height: 48px;
    background-color: #323232;
    border: solid 1px #323232;
    border-radius: 2rem;
    display: inline-flex;
  }

  [data-role="left"] {
    width: calc(100% - 140px);
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  [data-role="right"] {
    width: 125px;
    display: inline-flex;
    justify-content: flex-end;
  }

  .align {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }

  .more {
    cursor: pointer;
  }

  .text {
    width: calc(100% - 20px);
  }

  .menu {
    width: 100%;
    background-color: #323232;
    border: solid 1px #323232;
    border-radius: 2rem;
    display: inline-flex;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .menu-open {
    max-height: 1000px;
    height: auto;
  }

  .menu-close {
    max-height: 48px;
    height: 48px;
  }

  .menu-transition {
    transition: max-height 0.25s ease;
  }

  .rotate {
    transform: rotate(90deg);
  }

  .img-transition {
    transition: transform 0.25s ease;
  }

  p {
    user-select: none;
    color: white;
    margin: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
  }

  img {
    width: 18px;
    height: 18px;
    margin-left: 1rem;
  }

  .dialog-overlay {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #8DC26F;
    opacity: 0.5;
  }
</style>