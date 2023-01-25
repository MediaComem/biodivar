<template>
    <div class="table-layout" v-if="biovers && (biovers.biover.is_editable || ownOrPublic(biovers.biover.id) === 'own' )">
        <template v-if="saveDone">
            <el-alert class="alert-layout" title="Le biovers a été mis à jour avec succès" type="success" />
        </template>
        <template v-if="error">
            <el-alert class="alert-layout" title="Une erreur s'est produite durant la mise à jour du biovers" type="error" />
        </template>
        <div class="item">
            <BioverActions :biover="biovers.biover" @visibility="visibilityDialog = true" @editable="editableDialog = true" @favori="favoriDialog = true" @pin="pinDialog = true" />
        </div>
        <p class="parameter-name">Nom</p>
        <base-input class="title">
            <p class="material-symbols-sharp icon-position" style="top: -9px" >short_text</p>
            <input style="padding-top: 6px;" type="text" v-model="biovers.biover.name" placeholder="nom du biovers">
        </base-input>
        <p class="parameter-name">Description</p>
        <base-input class="subtitle">
            <p class="material-symbols-sharp icon-position description-transform" style="top: -9px" >short_text</p>
            <input style="padding-top: 6px;" type="text" v-model="biovers.biover.description" placeholder="sous-titre du biovers">
        </base-input>
        <p class="parameter-name">Emplacement</p>
        <base-input class="location">
            <p class="material-symbols-sharp icon-position" style="top: -8px" >my_location</p>
            <input style="padding-top: 6px;" type="text" v-model="biovers.biover.location" placeholder="emplacement du biovers">
        </base-input>
        <BioverVisibilityDialog v-if="visibilityDialog" :biover="biovers.biover" :current-visibility="biovers.biover.is_public" @close="visibilityDialog = false" @visibility="changeVisibility"/>
        <BioverEditableDialog v-if="editableDialog" :biover="biovers.biover" :current-editable="biovers.biover.is_editable" @close="editableDialog = false" @editable="changeEdition"/>
        <BioverFavoriDialog v-if="favoriDialog" :biover="biovers.biover" :favori-state="isInFavori(biovers.biover.id)" @close="favoriDialog = false" @favori-action="favoriEdition" />
        <BioverPinDialog v-if="pinDialog" :biover="biovers.biover" :pin-state="isInPins(biovers.biover.id)" @close="pinDialog = false" @pin-action="pinEdition" />
         <base-button class="save" @click="save">
            <p class="material-symbols-sharp icon-margin icon-font">done</p><p class="button-text">Sauvegarder les modifications</p>
        </base-button>
    </div>
    <div v-else>
        <h1 class="error-layout">Vous n'êtes pas autorisé à modifier ce biovers</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BioverActions from '../../../app/BioverActions.vue';
import BioverVisibilityDialog from '../../../app/Dialog/BioverVisibilityDialog.vue';
import BioverEditableDialog from '../../../app/Dialog/BioverEditableDialog.vue';
import BioverFavoriDialog from '../../../app/Dialog/BioverFavoriDialog.vue';
import BioverPinDialog from '../../../app/Dialog/BioverPinDialog.vue';

import { useStore } from '../../../../composables/store.js';
import { updateBiovers } from '../../../../utils/api.js';
import Biovers from '../../../../types/biovers.js';

export default {
    components: { 
        BioverActions, 
        BioverVisibilityDialog,
        BioverEditableDialog,
        BioverFavoriDialog,
        BioverPinDialog,
    },
    props: {
        bioverId: Number,
    },
    data() {
        return {
            visibilityDialog: false,
            editableDialog: false,
            favoriDialog: false,
            pinDialog: false,
            saveDone: false,
            error: false,
            biovers: null,
            isInFavori: null,
            isInPins: null,
        }
    },
    methods: {
        changeVisibility(state) {
            this.biovers.biover.is_public = state;
            this.visibilityDialog = false;
        },
        changeEdition(state) {
            this.biovers.biover.is_editable = state;
            this.editableDialog = false;
        },
        favoriEdition(state) {
            const { favori } = useStore();
            if (state) {
                const index = favori.value.findIndex((f) => f === this.biovers.biover.id);
                if (index === -1) favori.value.push(this.biovers.biover.id);  
            } else {
                const index = favori.value.findIndex((f) => f === this.biovers.biover.id);
                if (index > -1) favori.value.splice(index, 1);
            }
            this.favoriDialog = false;
        },
        pinEdition(state) {
            const { pins } = useStore();
            if (state) {
                const index = pins.value.findIndex((p) => p === this.biovers.biover.id);
                if (index === -1) pins.value.push(this.biovers.biover.id);  
            } else {
                const index = pins.value.findIndex((p) => p === this.biovers.biover.id);
                if (index > -1) pins.value.splice(index, 1);
            }
            this.pinDialog = false;
        },
        async save() {
            const result = await updateBiovers(new Biovers(this.biovers.biover.id, this.biovers.biover.name, this.biovers.biover.description, this.biovers.biover.location, this.biovers.biover.is_public, this.biovers.biover.is_editable));
            if (result.statusCode === 200) {
                this.saveDone = true;
                setTimeout(() => {
                    this.saveDone = false;
                }, 2000)
            } else {
                this.error = true;
                setTimeout(() => {
                    this.error = false;
                }, 2000)
            }
        }
    },
    computed: {
        ...mapGetters('biovers', ['getDisplayedBioversById', 'ownOrPublic']),
    },
    mounted() {
        const { isInFavori, isInPins } = useStore();
        this.isInFavori = isInFavori;
        this.isInPins = isInPins;
        this.biovers = this.getDisplayedBioversById(this.bioverId);
    }
}
</script>

<style scoped>
@import './table.css';

.title {
    --bg-color: none;
    --color: white;
    --border-color: #FFFFFF;
        margin-left: 0.8rem;
    margin-right: 0.8rem;
}

.subtitle {
    --bg-color: none;
    --color: white;
    --border-color: #FFFFFF;
        margin-left: 0.8rem;
    margin-right: 0.8rem;
}

.location {
    --bg-color: none;
    --color: white;
    --border-color: #FFFFFF;    
    margin-left: 0.8rem;
    margin-right: 0.8rem;
}

.item {
    display: flex;
    margin-left: 0.8rem;
    margin-right: 0.8rem;
    margin-bottom: 4px;
    margin-top: 4px;
}

.save {
    --link-color: white;
    --highlight-color: #009FE3;
    margin-left: 0.8rem !important;
    margin-bottom: 0.8rem !important;
    width: calc(100% - 1.6rem) !important;
    margin-top: 0rem !important;
}

.alert-layout {
    margin-left: 16px;
    width: calc(100% - 32px);
}

.text-formatting {
    margin: 0px;
    height: 29px;
}

.error-layout {
    color: white;
}

.parameter-name {
    color: white;
    margin: 0px;
    text-align: left;
    padding-left: 16px;
    margin-bottom: 4px;
    font-variation-settings: "wght" 85, "ital" 0;
    font-size: 12px;
    line-height: 14px;
}

.icon-font {
    font-size: 20px;
}

.icon-margin {
    margin: 0px;
    padding-right: 6px;
}

.button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 1.5px;
    font-variation-settings: "wght" 149, "ital" 0;
}

.icon-position {
    color: white;
    position: absolute;
    left: 8px;
}

.description-transform {
    transform: scaleY(-1);
  }
</style>