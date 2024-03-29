<script setup>
  import { ref } from '@vue/reactivity';

  import { useStore } from '../../composables/store';
  import vuex from 'vuex';

  import { duplicateBiovers, updateBiovers, deleteBiovers } from '../../utils/api.js';
  
  import World from '../../assets/shared/world.vue';

  import BioversInformation from './BioversInformation.vue';
  import BioverMoreAction from './BioverMoreAction.vue';
  import BioverTitleDialog from './Dialog/BioverTitleDialog.vue';
  import BioverDuplicateDialog from './Dialog/BioverDuplicateDialog.vue';
  import BioverDeleteDialog from './Dialog/BioverDeleteDialog.vue';
  import BioverVisibilityDialog from './Dialog/BioverVisibilityDialog.vue';
  import BioverEditableDialog from './Dialog/BioverEditableDialog.vue';
  import BioverFavoriDialog from './Dialog/BioverFavoriDialog.vue';
  import BioverPinDialog from './Dialog/BioverPinDialog.vue';

  import Notification from './UIElement/Notification.vue';

  import Biovers from '../../types/biovers.js';

  import { deepClone } from '../../utils/duplicate.js';

  const { username, isInFavori, isInPins, favori, pins, biovers } = useStore();
  const store = vuex.useStore();

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
  const pinDialog = ref(false);

  const notificationMessage = ref('');
  const shouldDisplayNotification = ref(false);
  const notificationType = ref('');

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
      case 'pin':         pinDialog.value = true;
                          break;                            
    }
    more.value = false;
  }

  function setupNotification(text, type) {
    notificationMessage.value = text;
    notificationType.value = type;
    shouldDisplayNotification.value = true;
    setTimeout(() => {
      notificationMessage.value = '';
      notificationType.value = '';
      shouldDisplayNotification.value = false;
    }, 2000)
  }

  async function saveTitle(modification) {
    props.biover.name = modification.title;
    props.biover.description = modification.description;
    props.biover.location = modification.location;
    const resp = await updateBiovers(new Biovers(props.biover.id, props.biover.name, props.biover.description, props.biover.location, props.biover.is_public, props.biover.is_editable));
    if (resp?.statusCode === 200) {
      setupNotification(`Le biovers ${props.biover.name} a été mis à jour avec succès`, 'success')
    } else {
      setupNotification(`Une erreur s'est produite durant la mise à jour du biovers ${props.biover.name}`, 'error')
    }
    editTitleDialog.value = false;
  }

  async function duplicate(newTitle) {
    const newBiovers = deepClone(props.biover);
    newBiovers.name = newTitle;
    newBiovers.owner = -1;
    const resp = await duplicateBiovers(newBiovers);
    if (resp?.statusCode === 200) {
      setupNotification(`Le biovers ${props.biover.name} a été dupliqué avec succès`, 'success')
      biovers.value.push(resp.data);
      store.dispatch('biovers/addNewBiover', resp.data);
    } else {
      setupNotification(`Une erreur s'est produite durant la dupplication du biovers ${props.biover.name}`, 'error')
    }
    duplicateBioverDialog.value = false;
  }

  async function deleteBiover() {
    const resp = await deleteBiovers(props.biover);
    if (resp?.statusCode === 200) {
      setupNotification(`Le biovers ${props.biover.name} a été supprimé avec succès`, 'success')
      const index = biovers.value.findIndex((b) => b.id === props.biover.id);
      store.dispatch('biovers/deleteBiovers', props.biover.id);
      biovers.value.splice(index, 1);
    } else {
      setupNotification(`Une erreur s'est produite durant la suppréssion du biovers ${props.biover.name}`, 'error')
    }
    deleteBioverDialog.value = false;
  }

  async function changeVisibility(state) {
    props.biover.is_public = state;
    const resp = await updateBiovers(new Biovers(props.biover.id, props.biover.title, props.biover.description, props.biover.location, props.biover.is_public, props.biover.is_editable));
    if (resp?.statusCode === 200) {
      setupNotification(`Le biovers ${props.biover.name} a été mis à jour avec succès`, 'success')
    } else {
      setupNotification(`Une erreur s'est produite durant la mise à jour du biovers ${props.biover.name}`, 'error')
    }
    visibilityDialog.value = false;
  }

  async function changeEdition(state) {
    props.biover.is_editable = state;
    const resp = await updateBiovers(new Biovers(props.biover.id, props.biover.title, props.biover.description, props.biover.location, props.biover.is_public, props.biover.is_editable));
    if (resp?.statusCode === 200) {
      setupNotification(`Le biovers ${props.biover.name} a été mis à jour avec succès`, 'success')
    } else {
      setupNotification(`Une erreur s'est produite durant la mise à jour du biovers ${props.biover.name}`, 'error')
    }
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

  function pinEdition(state) {
    if (state) {
      const index = pins.value.findIndex((p) => p === props.biover.id);
      if (index === -1) pins.value.push(props.biover.id);  
    }
    else {
      const index = pins.value.findIndex((p) => p === props.biover.id);
      if (index > -1) pins.value.splice(index, 1);
    }
    pinDialog.value = false;
  }
</script>

<template>
  <div :class="{'menu-open': isOpen, 'menu-close': !isOpen}" class="menu menu-transition" style="display: inline-block">
    <div data-role="item">
        <div data-role="left" @click="isOpen = !isOpen">
            <World :animate="isOpen"/>
            <div class="align text">
                <p class="font" :class="{'animation': isOpen}">{{ props.biover.name }}</p>
            </div>
        </div>
        <div data-role="right">
            <div class="align">
              <p class="material-symbols-sharp icon-margin icon-font" :class="{'fill-font': isInPins(props.biover.id)}" :style="{color: isInPins(props.biover.id) ? 'white' : '#666666'}">push_pin</p>
            </div>
            <div class="align">
              <p class="material-symbols-sharp icon-margin icon-font" :class="{'fill-font': isInFavori(props.biover.id)}" :style="{color: isInFavori(props.biover.id) ? 'white' : '#666666'}">star</p>
            </div>
            <div class="align">
              <p class="material-symbols-sharp icon-margin icon-font" :style="{color: username === props.biover.User.username ? 'white' : '#666666'}">architecture</p>
            </div>
            <div class="align">
              <p v-if="props.biover.is_public" class="material-symbols-sharp icon-margin icon-font fill-font" style="color: white;">remove_red_eye</p>
              <p v-else class="material-symbols-sharp icon-margin icon-font" style="color: #666666;">visibility_off</p>
            </div>
            <div class="align">
              <p v-if="props.biover.is_editable" class="material-symbols-sharp icon-margin icon-font fill-font" style="color: white;">edit</p>
              <p v-else class="material-symbols-sharp icon-margin icon-font" style="color: #666666;">edit_off</p>
            </div>
            <div class="align more">
              <p class="material-symbols-sharp icon-margin icon-font icon-more" style="color: white;" @click="more = !more">more_vert</p>
            </div>
        </div>
    </div>
  <BioversInformation v-if="isOpen" :biover="props.biover" @visibility="openDialog('visibility')" @editable="openDialog('edition')" @favori="openDialog('favori')" @pin="openDialog('pin')"/>
  <BioverMoreAction :enabled="more" :biover="props.biover" @edit="openDialog('title')" @duplicate="openDialog('duplicate')" @delete="openDialog('delete')" @visibility="openDialog('visibility')" @editable="openDialog('edition')" @favori="openDialog('favori')" @pin="openDialog('pin')" @close="more = false"/>
  <BioverTitleDialog v-if="editTitleDialog" :biover="props.biover" @close="editTitleDialog = false" @save="saveTitle" />
  <BioverDuplicateDialog v-if="duplicateBioverDialog" :biover="props.biover" @close="duplicateBioverDialog = false" @duplicate="duplicate" />
  <BioverDeleteDialog v-if="deleteBioverDialog" :biover="props.biover" @close="deleteBioverDialog = false" @delete="deleteBiover()" />
  <BioverVisibilityDialog v-if="visibilityDialog" :biover="props.biover" :current-visibility="props.biover.is_public" @close="visibilityDialog = false" @visibility="changeVisibility"/>
  <BioverEditableDialog v-if="editableDialog" :biover="props.biover" :current-editable="props.biover.is_editable" @close="editableDialog = false" @editable="changeEdition"/>
  <BioverFavoriDialog v-if="favoriDialog" :biover="props.biover" :favori-state="isInFavori(props.biover.id)" @close="favoriDialog = false" @favori-action="favoriEdition" />
  <BioverPinDialog v-if="pinDialog" :biover="props.biover" :pin-state="isInPins(props.biover.id)" @close="pinDialog = false" @pin-action="pinEdition" />
  <div v-if="editTitleDialog || duplicateBioverDialog || deleteBioverDialog || visibilityDialog || editableDialog || favoriDialog || pinDialog" class="dialog-overlay" @click="closeAllDialog()" />
  <Notification v-if="shouldDisplayNotification" :data-type="notificationType">
    {{ notificationMessage }}
  </Notification>
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
    font-family: 'BiodivAR Title';
    font-size: 18px;
    line-height: 16px;
    width: calc(100% - 50px);
    margin-bottom: 0.5rem;
    margin-top: -4px;
  }

  .menu {
    width: 100%;
    background-color: #323232;
    border: solid 1px #323232;
    display: inline-flex;
    margin-bottom: 0.8rem;
  }

  .menu-open {
    max-height: 1000px;
    height: auto;
    border-radius: 24px;
  }

  .menu-close {
    max-height: 48px;
    height: 48px;
    border-radius: 24px;
  }

  .menu-transition {
    transition: max-height 0.25s ease;
  }

  .rotate {
    transform: rotate(90deg);
  }

  .font {
    font-family: 'BiodivAR Title';
    font-variation-settings: "wdth" 40, "wght" 90;
    user-select: none;
    color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 0.04em;
    width: inherit;
    text-align: start;
    text-overflow: ellipsis;
    overflow-x: hidden;
    height: 30px;
    margin: 0px;
    margin-top: 15px;
  }

  .fill-font {
    font-variation-settings: "FILL" 0;
  }
  
  .animation {
    animation: variable 6000ms infinite both;
    animation-delay: 800ms;
  }

  @keyframes variable {
    0% {font-variation-settings: 'wght' 60, 'wdth' 10}
    25% {font-variation-settings: 'wght' 90, 'wdth' 40}
    50% {font-variation-settings: 'wght' 60, 'wdth' 60}
    75% {font-variation-settings: 'wght' 80, 'wdth' 40}
    100% {font-variation-settings: 'wght' 60, 'wdth' 10}
  }

  .dialog-overlay {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
  }

  .icon-font {
    font-size: 18px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 2px;
  }

  .icon-more {
    padding-right: 0px;
    margin-right: -8px;
  }
</style>