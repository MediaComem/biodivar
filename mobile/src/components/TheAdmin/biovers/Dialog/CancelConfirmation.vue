<template>
    <div class="overlay"></div>
    <div class="layout">
      <div class="header">
        <p class="material-symbols-sharp symbol-location">undo</p>
        <p class="title">{{ title }}</p>
        <p class="material-symbols-sharp symbol-close" @click="$emit('closeDialog')">close</p>
      </div>
      <base-input class="dialog-input-color">
        <base-button class="save" @click="$emit('validate')">
          <p class="material-symbols-sharp text-formatting">save</p><p class="button-text">Enregistrer</p>
        </base-button>
        <base-button class="delete" @click="$emit('close')">
          <p class="material-symbols-sharp text-formatting">delete</p><p class="button-text">Ne pas enregistrer</p>
        </base-button>
        <base-button class="cancel" @click="$emit('closeDialog')">
          <p class="material-symbols-sharp text-formatting">close</p><p class="button-text">Annuler</p>
        </base-button>
      </base-input>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    dialogVisible: Boolean,
  },
  emits: ['closeDialog', 'validate', 'close'],
}
</script>

<style scoped>
  .overlay {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100000000;
  }

  .layout {
    width: 50vw;
    height: fit-content;
    position: fixed;
    top: 40vh;
    left: 25vw;
    z-index: 1000000000;
    background-color: white;
    padding: 1rem;
  }

  .save {
    --link-color: white;
    --highlight-color: #2F80ED;
  }

  .delete {
    --link-color: white;
    --highlight-color: #FF0000;
  }

  .cancel {
    --link-color: white;
    --highlight-color: gray;
  }

  .header {
    display: grid;
    grid-template-columns: 20px auto 20px;
    grid-template-rows: 35px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    margin-bottom: 10px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.25rem;
}

.symbol-location {
    grid-area: 1 / 1 / 2 / 2;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.title {
    grid-area: 1 / 2 / 2 / 3;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    text-transform: uppercase;
}

@media screen and (max-width: 999px) {
  .title {
      font-size: 14px;
  }

  .layout {
      width: 70vw;
      left: 15vw;
    }
}

.symbol-close {
    grid-area: 1 / 3 / 2 / 4;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    cursor: pointer;
}

.text-formatting {
    margin: 0px;
    padding-right: 6px;
}

.button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 4px;
    font-variation-settings: "wght" 149, "ital" 0;
}
</style>