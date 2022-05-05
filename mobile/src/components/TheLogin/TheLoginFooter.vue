<template>
    <div data-role="footer">
      <div class="heig">
        <img class="image" src="../../assets/login/Logo_HEIG-VD_MEI.svg" alt="heig">
      </div>
      <div class="hes">
        <img class="image" src="../../assets/login/Logo_HES-SO_Couleurs.svg" alt="hes">
      </div>
    </div>
</template>

<style scoped>
  [data-role="footer"] {
    height: 70px;
    max-width: var(--max-width);
    width: 100%;
    display: inline-flex;
  }

  .heig {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .hes {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .image {
    height: 50px;
  }
</style>