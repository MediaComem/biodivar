<template>
    <div class="table-layout" v-if="biovers && (biovers.biover.is_editable || ownOrPublic(biovers.biover.id) === 'own' )">
        <template v-if="saveDone">
            <el-alert class="alert-layout" title="Le biovers a été mis à jour avec succès" type="success" />
        </template>
        <template v-if="error">
            <el-alert class="alert-layout" title="Une erreur s'est produite durant la mise à jour du biovers" type="error" />
        </template>
        <p class="parameter-name">titre du biovers</p>
        <base-input class="title">
            <input type="text" v-model="biovers.biover.name" placeholder="Nom du biovers">
        </base-input>
        <p class="parameter-name">sous-titre du biovers</p>
        <base-input class="subtitle">
            <input type="text" v-model="biovers.biover.description" placeholder="Sous-titre du biovers">
        </base-input>
        <p class="parameter-name">emplacement du biovers</p>
        <base-input class="location">
            <input type="text" v-model="biovers.biover.location" placeholder="Emplacement du biovers">
        </base-input>
        <div class="item">
            <BioverActions :biover="biovers.biover" @visibility="visibilityDialog = true" @editable="editableDialog = true" @favori="favoriDialog = true" @pin="pinDialog = true" />
        </div>
        <BioverVisibilityDialog v-if="visibilityDialog" :biover="biovers.biover" :current-visibility="biovers.biover.is_public" @close="visibilityDialog = false" @visibility="changeVisibility"/>
        <BioverEditableDialog v-if="editableDialog" :biover="biovers.biover" :current-editable="biovers.biover.is_editable" @close="editableDialog = false" @editable="changeEdition"/>
        <BioverFavoriDialog v-if="favoriDialog" :biover="biovers.biover" :favori-state="isInFavori(biovers.biover.id)" @close="favoriDialog = false" @favori-action="favoriEdition" />
        <BioverPinDialog v-if="pinDialog" :biover="biovers.biover" :pin-state="isInPins(biovers.biover.id)" @close="pinDialog = false" @pin-action="pinEdition" />
         <base-button class="save" @click="save">
            <p class="material-symbols-sharp text-formatting">done</p> Sauvegarder les modifications
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
            const result = await updateBiovers(this.biovers.biover);
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
    --icon-link: url("../../../../assets/tables/title_icon.svg");
    --bg-color: none;
    --color: white;
    --border-color: #FFFFFF;
}

.subtitle {
    --icon-link: url("../../../../assets/tables/subtitle_icon.svg");
    --bg-color: none;
    --color: white;
    --border-color: #FFFFFF;
}

.location {
    --icon-link: url("../../../../assets/tables/location_icon.svg");
    --bg-color: none;
    --color: white;
    --border-color: #FFFFFF;
}

.item {
    display: flex;
}

.save {
    --link-color: white;
    --highlight-color: #009FE3;
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
    margin-bottom: 3px;
}
</style>