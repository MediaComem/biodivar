<script setup>
  import { ref } from '@vue/reactivity';

  import PushPin from '../../assets/vue-svg/PushPin.vue';
  import Stars from '../../assets/vue-svg/Stars.vue';
  import RedEye from '../../assets/vue-svg/RedEye.vue';
  import Edit from '../../assets/vue-svg/Edit.vue';

  const pushPin = ref(false);
  const stars = ref(false);
  const redEye = ref(false);
  const edit = ref(false);

  function closeAll() {
    pushPin.value = false;
    stars.value = false;
    redEye.value = false;
    edit.value = false;
  }

  function openAction(action) {
    let newVal = false;
    switch (action) {
      case 'pin':     newVal = !pushPin.value;
                      closeAll();
                      pushPin.value = newVal;
                      break;
      case 'stars':   newVal = !stars.value;
                      closeAll();
                      stars.value = newVal;
                      break;
      case 'redEye':  newVal = !redEye.value;
                      closeAll();
                      redEye.value = newVal;
                      break;
      case 'edit':    newVal = !edit.value;
                      closeAll();
                      edit.value = newVal;
                      break;
    }
  }

  function pushPinAction() {
    pushPin.value = false;
  }

  function starsAction() {
    stars.value = false;
  }

  function redEyeAction() {
    redEye.value = false;
  }

  function editAction() {
    edit.value = false;
  }
</script>

<template>
  <div data-role="actions">
    <div data-role="action">
      <div data-role="action-element" @click="openAction('pin')">
        <PushPin :color="'black'" />
        <p style="width:80%">épinglé</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
      <div v-if="pushPin" class="element-menu" @click="pushPinAction()">
        <PushPin :color="'black'" />
        <span>détacher</span>
      </div>
    </div>
    <div data-role="action">
      <div data-role="action-element" @click="openAction('stars')">
        <Stars :color="'black'" />
        <p>favori</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
      <div v-if="stars" class="element-menu" @click="starsAction()">
        <Stars :color="'black'" />
        <span>retirer des favoris</span>
      </div>
    </div>
    <div data-role="action">
      <div data-role="action-element" @click="openAction('redEye')">
        <RedEye :color="'black'" />
        <p>public</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
      <div v-if="redEye" class="element-menu" @click="redEyeAction()">
        <RedEye :color="'black'" />
        <span>rendre public</span>
      </div>
    </div>
    <div data-role="action">
      <div data-role="action-element" @click="openAction('edit')">
        <Edit :color="'black'" />
        <p>éditable</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
      <div v-if="edit" class="element-menu" @click="editAction()">
        <Edit :color="'black'" />
        <span>rendre éditable</span>
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
    display: flex;
    flex-wrap: wrap;
    background-color: #8DC26F;
    border: solid 1px #8DC26F;
    border-radius: 2rem;
    margin: 1rem 1rem 0 1rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    align-items: center;
    width: 120px;
    height: 36px;
  }

  [data-role="action-element"] {
    display: flex;
    align-items: center;
  }

  p {
    padding-left: 0.3rem;
    margin: 0;
    text-align: center;
  }

  .element-menu {
    display: flex;
    background-color: #F2F2F2;
    margin-top: 8px;
    min-width: 120px;
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
</style>