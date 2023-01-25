<script setup>
  import { ref } from '@vue/reactivity';
  import { couldEdit, isCurrentOwner } from '../../utils/authorization.js';
  import { useStore } from '../../composables/store.js';

  const { isInFavori, favori, isInPins } = useStore();

  const props = defineProps({
    biover: Object,
  })

  const pushPin = ref(false);

  const editableRight = ref(couldEdit(props.biover));
  const isOwner = ref(isCurrentOwner(props.biover));

  const emit = defineEmits(['visibility', 'editable', 'favori', 'pin'])
</script>

<template>
  <!-- Pin -->
  <div data-role="actions">
    <div v-if="isInPins(props.biover.id)" data-role="action">
      <div data-role="action-element" @click="emit('pin')">
        <p class="material-symbols-sharp icon-margin icon-font fill-font" style="color: black">push_pin</p>
        <p class="font" style="width:80%">épinglé</p>
        <p class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
    <div v-else data-role="action-remove">
      <div data-role="action-element" @click="emit('pin')">
        <p class="material-symbols-sharp icon-margin icon-font" style="color: black">push_pin</p>
        <p class="font" style="width:80%">non-épinglé</p>
        <p class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
    <!-- Favori -->
    <div v-if="isInFavori(props.biover.id)" data-role="action">
      <div data-role="action-element" @click="emit('favori')">
        <p class="material-symbols-sharp icon-margin icon-font fill-font" style="color: black">star</p>
        <p class="font">favori</p>
        <p class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
    <div v-else data-role="action-remove">
      <div ref="star" data-role="action-element" @click="emit('favori')">
        <p class="material-symbols-sharp icon-margin icon-font" style="color: black">star</p>
        <p class="font">non-favori</p>
        <p class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
    <!-- Visibility -->
    <div v-if="props.biover.is_public" data-role="action" :class="{'not-allowed': !isOwner}">
      <div data-role="action-element" @click="isOwner ? emit('visibility') : ''">
        <p class="material-symbols-sharp icon-margin icon-font fill-font" style="color: black">remove_red_eye</p>
        <p class="font">public</p>
        <p v-if="isOwner" class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
    <div v-else data-role="action-remove" :class="{'not-allowed': !isOwner}">
      <div data-role="action-element" @click="isOwner ? emit('visibility') : ''">
        <p class="material-symbols-sharp icon-margin icon-font fill-font" style="color: black">visibility_off</p>
        <p class="font">privé</p>
        <p v-if="isOwner" class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
    <!-- Edition -->
    <div v-if="!props.biover.is_editable" data-role="action-remove" :class="{'not-allowed': !isOwner}">
      <div data-role="action-element" @click="isOwner ? emit('editable') : ''">
        <p class="material-symbols-sharp icon-margin icon-font fill-font" style="color: black">edit_off</p>
        <p class="font">non-modifiable</p>
        <p v-if="isOwner" class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
    <div v-else data-role="action" :class="{'not-allowed': !isOwner}">
      <div data-role="action-element" @click="isOwner ? emit('editable') : ''">
        <p class="material-symbols-sharp icon-margin icon-font fill-font" style="color: black">edit</p>
        <p class="font">modifiable</p>
        <p v-if="isOwner" class="material-symbols-sharp icon-font arrow-margin" style="color: black">arrow_drop_down</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  [data-role="actions"] {
    display: inline-flex;
    flex-wrap: wrap;
  }

  [data-role="action"] {
    background-color: #8DC26F;
    border: solid 1px #8DC26F;
    border-radius: 2rem;
    margin: 0rem 0.8rem 0.8rem 0rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    height: 36px;
    cursor: pointer;
  }

  [data-role="action-remove"] {
    background-color: #BDBDBD;
    border: solid 1px #BDBDBD;
    border-radius: 2rem;
    margin: 0rem 0.8rem 0.8rem 0rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    height: 36px;
    cursor: pointer;
  }

  [data-role="action-element"] {
    display: flex;
    align-items: center;
  }

  .not-allowed {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .font {
    font-family: 'BiodivAR Roman';
    font-size: 14px;
    line-height: 14px;
    padding-left: 0.3rem;
    margin: 0;
    text-align: center;
    font-variation-settings: "wght" 110, "ital" 0;
    margin-top: 1px;
  }

  .element-menu {
    display: flex;
    background-color: #F2F2F2;
    margin-top: 8px;
    min-width: 180px;
    min-height: 36px;
    z-index: 100;
    border: solid 1px #F2F2F2;
    border-radius: 0.25rem;
    align-items: center;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  }

  span {
    padding-left: 0.3rem;
    margin: 0;
    align-items: center;
    display: flex;
    font-size: 14px;
  }

  .icon-font {
    font-size: 18px;
  }

  .icon-margin {
    margin: 0px;
    margin-top: -1px;
    padding-right: 6px;
    margin-left: -8px;
    margin-right: -4px;
  }

  .arrow-margin {
    margin: 0px;
    margin-top: -2px;
    margin-right: -8px;
  }

  .fill-font {
    font-variation-settings: "FILL" 1;
  }
</style>