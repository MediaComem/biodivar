<script setup>
  import { ref } from '@vue/reactivity';

  import PushPin from '../../assets/vue-svg/PushPin.vue';
  import Stars from '../../assets/vue-svg/Stars.vue';
  import RedEye from '../../assets/vue-svg/RedEye.vue';
  import Edit from '../../assets/vue-svg/Edit.vue';

  import { couldEdit } from '../../utils/authorization.js';
  import { useStore } from '../../composables/store.js';


  const { isInFavori, favori, isInPins } = useStore();

  const props = defineProps({
    biover: Object,
  })

  const pushPin = ref(false);

  const editableRight = ref(couldEdit(props.biover));

  const emit = defineEmits(['visibility', 'editable', 'favori', 'pin'])
</script>

<template>
  <!-- Pin -->
  <div data-role="actions">
    <div v-if="isInPins(props.biover.id)" data-role="action">
      <div data-role="action-element" @click="emit('pin')">
        <PushPin :color="'black'" />
        <p style="width:80%">épinglé</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
    </div>
    <div v-else data-role="action">
      <div data-role="action-element" @click="emit('pin')">
        <PushPin :stroke="'black'" :color="'none'" />
        <p style="width:80%">non-épinglé</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
    </div>
    <!-- Favori -->
    <div v-if="isInFavori(props.biover.id)" data-role="action">
      <div data-role="action-element" @click="emit('favori')">
        <img src="../../assets/shared/more/star.svg" alt="Arrow">
        <p>{{ $t('TheMenu.Action.Star') }}</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
    </div>
    <div v-else data-role="action">
      <div ref="star" data-role="action-element" @click="emit('favori')">
        <img src="../../assets/shared/more/star_border.svg" alt="Arrow">
        <p>Non-Favori</p>
        <img src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
    </div>
    <!-- Visibility -->
    <div v-if="props.biover.is_public" data-role="action" :class="{'not-allowed': !editableRight}">
      <div data-role="action-element" @click="editableRight ? emit('visibility') : ''">
        <img alt="Visibility" src="../../assets/shared/more/remove_red_eye.svg">
        <p>{{ $t('TheMenu.Shared.Public') }}</p>
        <img v-if="editableRight" src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
    </div>
    <div v-else data-role="action" :class="{'not-allowed': !editableRight}">
      <div data-role="action-element" @click="editableRight ? emit('visibility') : ''">
        <img alt="Visibility" src="../../assets/shared/more/visibility_off.svg">
        <p>{{ $t('TheMenu.Shared.Private') }}</p>
        <img v-if="editableRight" src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
    </div>
    <!-- Edition -->
    <div v-if="!props.biover.is_editable" data-role="action" :class="{'not-allowed': !editableRight}">
      <div data-role="action-element" @click="editableRight ? emit('editable') : ''">
        <img alt="Edit" src="../../assets/shared/more/edit_off.svg">
        <p>{{ $t('TheMenu.Action.Unedit') }}</p>
        <img v-if="editableRight" src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
      </div>
    </div>
    <div v-else data-role="action" :class="{'not-allowed': !editableRight}">
      <div data-role="action-element" @click="editableRight ? emit('editable') : ''">
        <img alt="Edit" src="../../assets/shared/more/edit.svg">
        <p>{{ $t('TheMenu.Action.Edit') }}</p>
        <img v-if="editableRight" src="../../assets/shared/arrow_drop_down.svg" alt="Arrow">
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
    margin: 1rem 1rem 0 1rem;
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

  p {
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
    padding-left: 0.3rem;
    margin: 0;
    text-align: center;
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
</style>