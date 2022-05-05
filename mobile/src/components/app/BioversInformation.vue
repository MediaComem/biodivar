<script setup>
  import BioverActions from './BioverActions.vue';
</script>

<template>
  <div>
    <div class="item">
        <BioverActions />
    </div>
    <div>
        <div class="element">
            <img src="../../assets/shared/help.svg" alt="Help">
            <p class="information-text">Biovers proche de la HEIG-VD, site de St-Roch. Ouvert et visible par tous·tes. </p>
        </div>
        <div class="element">
            <img src="../../assets/shared/my_location.svg" alt="Location">
            <p class="information-text">Yverdon-les-Bains, Suisse</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/restore.svg" alt="Restore">
            <p class="information-text">Dernière connection le 31/03/2022 à 8h51</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/create.svg" alt="Create">
            <p class="information-text">Dernière édition le 31/03/2022 à 8h51</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/architecture.svg" alt="Architecture">
            <p class="information-text">créé le 05/03/2022 à 16h12 par julien.mercier</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/location_on.svg" alt="LocationOn">
            <p class="information-text">15 points d'intérêts</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/gesture.svg" alt="Gesture">
            <p class="information-text">3 traces</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/local_florist.svg" alt="Gesture">
            <p class="information-text">7 espèces identifiées</p>
        </div>
        <div class="element">
            <img src="../../assets/shared/visibility.svg" alt="Gesture">
            <p class="information-text">41 vues</p>
        </div>
         <div class="element">
            <img src="../../assets/shared/storage.svg" alt="Gesture">
            <p class="information-text">15.3 MB</p>
        </div>
    </div>
    <div class="button">
        <base-button class="enter">
          <img src="../../assets/shared/home.svg" />ENTRER
        </base-button>
    </div>
  </div>
</template>

<style scoped>
  p {
      color: white;
      font-size: 12px;
  }

  .item {
      display: flex;
      margin-bottom: 1rem;
  }

  .element {
      display: flex;
      text-align: start;
      margin: 0 0 0 2rem;
  }

  .information-text {
      color: #BDBDBD;
      margin: 0;
      margin-left: 4px;
      user-select: none;
  }

  .button {
    width: 310px;
    height: 38px;
    justify-items: center;
    display: inline-block;
  }

  .enter {
    --link-color: white;
    --highlight-color: #2F80ED;
  }
</style>