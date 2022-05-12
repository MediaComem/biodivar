<script setup>
  import { ref } from '@vue/reactivity';
  
  import PushPin from '../../assets/vue-svg/PushPin.vue';
  import Stars from '../../assets/vue-svg/Stars.vue';
  import Architecture from '../../assets/vue-svg/Architecture.vue';
  import RedEye from '../../assets/vue-svg/RedEye.vue';
  import Edit from '../../assets/vue-svg/Edit.vue';
  import More from '../../assets/vue-svg/More.vue';

  import BioversInformation from './BioversInformation.vue';
  import BioverMoreAction from './BioverMoreAction.vue';

  const isOpen = ref(false);

  const pushPin = ref(false);
  const stars = ref(false);
  const architecture = ref(false);

  const more = ref(false);

  const props = defineProps({
      biover: Object,
  }) 
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
              <PushPin :color="pushPin ? 'white' : '#666666'"/>
            </div>
            <div class="align">
                <Stars :color="stars ? 'white' : '#666666'"/>
            </div>
            <div class="align">
                <Architecture :color="architecture ? 'white' : '#666666'"/>
            </div>
            <div class="align">
                <RedEye :color="props.biover.is_public ? 'white' : '#666666'" />
            </div>
            <div class="align">
                <Edit :color="props.biover.isEditable ? 'white' : '#666666'" />
            </div>
            <div class="align wrap">
                <More :color="'white'" @click="more = !more"/>
            </div>
        </div>
    </div>
  <BioversInformation v-if="isOpen" :biover="props.biover" />
  <BioverMoreAction :enabled="more" :biover="props.biover" />
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

  .wrap {
    flex-wrap: wrap;
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
    transform: rotate(-90deg);
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
</style>