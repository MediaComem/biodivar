<template>
  <div v-if="dialogVisible" class="overlay" @click="cancelDialog = true"></div>
  <div v-if="dialogVisible" class="modal-edition">
    <DialogHeader :title="isEdit ? 'éditer point dintérêt' : 'nouveau point dintérêt'" :logo="'add_location_alt'" @close="cancelDialog = true" />
    <div class="embedded">
      <the-aframe-editor
        :showSymbol="tab === 0"

        :symbol="symbolFileAr.url"
        :symbolType="form.symbol.media_type_ar"

        :symbolAudio="symbolFileAudio.url"
        :symbolLoop="form.symbol.audio_loop"

        :scale="form.symbol.scale"
        :positionX="form.symbol.position.distance"
        :positionY="form.symbol.position.elevation"
        :positionRotation="form.symbol.position.rotation"
        :visible="form.symbol.is_visible_ar"
        :facing="form.symbol.is_facing_user"
        :amplitude="form.symbol.amplitude"

        :visibilityScope="form.scope"

        :audioScope="form.symbol.audio_distance"
        :audioScopeEnabled="form.symbol.audio_autoplay"

        :shapeType="form.style_type"
        :shapeRadius="form.radius"
        :shapeX="form.position.distance"
        :shapeY="form.position.elevation"
        :shapeRotation="form.position.rotation"
        :shapeColor="form.fill_color"
        :shapeOpacity="form.fill_opacity"
        :shapeStrokeColor="form.stroke_color"
        :shapeStrokeWidth="form.style_stroke_width"
        :shapeStrokeOpacity="form.stroke_opacity"
        :shapeWireframe="form.wireframe"
        :shapeExtrusion="form.extrusion"
        :shapeAmplitude="form.amplitude"
      >
        <aframe-media v-for="(m, index) in form.media" :key="index"
          :showMedia="tab == 1 || !m.is_visible_in_radius"
          :media="m.display_url"
          :mediaType="m.media_type"
          :mediaLoop="m.loop"
          :scale="m.scale"
          :positionX="m.position.distance"
          :positionY="m.position.elevation"
          :positionRotation="m.position.rotation"
          :isVisibleInRadius="m.is_visible_in_radius"
          :facing="m.is_facing"
          :text="m.text"
        ></aframe-media>
      </the-aframe-editor>
    </div>
    <div class="edition-layout">
    <div class="selection-layout">
      <button @click="tab = 0" class="style-button style-button-border" :class="{'style-button-active': tab === 0}">
        <p class="material-symbols-sharp">pin_drop</p><p>Style</p>
      </button>
      <div style="width: 2%;"></div>
      <button @click="tab = 1" class="style-button style-button-border" :class="{'style-button-active': tab === 1}">
        <p class="material-symbols-sharp">newspaper</p><p>Galerie</p>
      </button>
    </div>
    <div v-show="tab === 0" class="collapse">
      <div class="container-layout">
        <Accordeon :header="'Général'" :length="6 + form.metadata.length" :should-be-open="true">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">location_searching</p><p>coordonnées</p>
              <p ref="coordinate" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'coordinate')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'coordinate'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'coordinate'"  @mouseleave="tooltipElement = null">Les coordonnées WGS84 ou se situe le centre du point d’intérêt.</p>
              </div>
            </div>
            <div class="col4 border"><label for="long">longitude</label><input id="long" class="input-full-size-element" type="number" v-model="form.coordinate.long" min="-180" max="180" @change="longitudeValidation()"></div>
            <div class="col4 border"><label for="lat">latitude</label><input id="lat" class="input-full-size-element" type="number" v-model="form.coordinate.lat" min="-90" max="90" @change="latitudeValidation()"></div>
            <div class="col4 border end-border"><label for="alt">altitude</label><input id="alt" class="input-full-size-element" type="number" v-model="form.coordinate.alt"></div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">short_text</p><p>titre</p>
              <p ref="title" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'title')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'title'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'title'"  @mouseleave="tooltipElement = null"> le titre du point d’intérêt et ses paramètres d’affichage. </p>
              </div>
            </div>
            <div class="col2 border end-border"><input id="title" type="text" class="input-margin" v-model="form.title"></div>
            <!--div class="col3 border end-border"><input id="title_vis" type="checkbox" v-model="form.title_is_visible"><label for="title_vis">visible</label>
              <el-tooltip placement="top">
                <template #content> Si ce paramètre est sélectionné, le titre sera visible au dessus du symbole.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div-->
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp description-transform">short_text</p><p>description</p>
              <p ref="description" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'description')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'description'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'description'"  @mouseleave="tooltipElement = null">sous-titre ou description du point d’intérêt.</p>
              </div>
            </div>
            <div class="col2 border end-border"><input id="description" type="text" class="input-margin" v-model="form.subtitle"></div>
            <!--div class="col3 border end-border"><input id="description_vis" type="checkbox" v-model="form.subtitle_is_visible"><label for="description_vis">visible</label>
              <el-tooltip placement="top">
                <template #content> Si ce paramètre est sélectionné, la description sera visible au dessus du symbole.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div-->
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">visibility</p><p>porté</p>
              <p ref="visibility" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'visibility')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'visibility'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'visibility'"  @mouseleave="tooltipElement = null"> Lorsque la distance entre la position de l’utilisateur et celle d’un point/trace est inférieur à cette valeur, celui-ci est affiché dans la scene A-Frame. La lecture de certains médias (son, vidéo, gltf animés) peuvent également</p>
              </div>
            </div>
            <div class="col2 border end-border">
              <input id="scope" type="number" step="0.5" v-model="form.scope" class="input-margin" style="width: 50px;">
              <label for="scope">m</label>
              <el-slider class="slider-width" v-model="form.scope" :max="1000" :step="0.5"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">touch_app</p><p>Déclencheur</p>
              <p ref="touch_app" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'touch_app')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'touch_app'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'touch_app'"  @mouseleave="tooltipElement = null">Ce paramètre définit si les événements d’un point d'intérêt (ouverture de la galerie de médias, lecture de médias vidéo ou son) sont déclenchés par la position de l’utilisateur (emplacement = lorsqu’il ou elle entre dans le rayon) ou si il ou elle doit en plus cliquer sur l’interface qui s’affiche à l’écran. </p>
              </div>
            </div>
            <div class="col2 border end-border">
              <select v-model="form.trigger_mode" class="input-margin input-full-size-element">
                <option
                  v-for="item in trigger_option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.value === 'touch'"
                >
                </option>
              </select>
            </div>
          </div>
          <div style="display: flex" v-for="(element, index) in form.metadata" :key="index">
            <div class="col-main border"><p class="material-symbols-sharp">database</p><input v-model="element.key" type="text" class="metadata-title">
              <p :ref="`${element.key}`" class="material-symbols-sharp" @mouseenter="openTooltip($event, `${element.key}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `${element.key}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `${element.key}`"  @mouseleave="tooltipElement = null"> {{ element.description }} </p>
              </div>
            </div>
            <div class="col3 border"><input v-model="element.value" type="text" class="input-margin input-full-size-element"></div>
            <div class="col3 border end-border"><input v-model="element.description" type="text" class="input-margin input-full-size-element"><p class="material-symbols-sharp" @click="deleteGeneralAttribute(index)">delete_forever</p></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp link">add</p><p class="link" @click="createGeneralAttribute()">créer un attribut</p>
              <p ref="attribut" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'attribut')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'attribut'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'attribut'"  @mouseleave="tooltipElement = null">Cette option permet de créer des champs personnalisés et de les remplir avec une valeur (de type texte). Les attributs ainsi créés seront visibles sur la table de données du biovers.</p>
              </div>
            </div>
            <div class="col2 border end-border" />
          </div>
        </Accordeon>
        <Accordeon :header="'Symbole'" :length="8" :should-be-open="true">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">location_on</p><p>symbol</p>
              <p ref="location_on" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'location_on')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'location_on'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'location_on'"  @mouseleave="tooltipElement = null"> le fichier chargé sera affiché comme symbole (3D) du point d’intérêt. Celui-ci peut-être une image, une vidéo ou un modèle 3D. Les formats suivants sont supportés: .png, .jpg, .svg, .gltf, .glb, .mp4</p>
              </div>
            </div>
            <div class="col4 border">
              <input type="file" name="file" class="input-margin" accept=".png, .jpg, .svg, .gltf, .glb, .mp4, .m4v" @change="handleFileUploadSymbolAR"/>
            </div>
            <!--div class="col5 border"><input id="symbol_vis_ar" type="checkbox" v-model="form.symbol.is_visible_ar"><label for="symbol_vis_ar">visible</label>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div-->
            <div class="col4 border"><input id="symbol_facing_ar" type="checkbox" v-model="form.symbol.is_facing_user"><label for="symbol_facing_ar">face à la caméra</label>
              <p ref="symbol_facing_ar" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'symbol_facing_ar')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'symbol_facing_ar'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'symbol_facing_ar'"  @mouseleave="tooltipElement = null">Si ce paramètre est sélectionné, le média tournera de façon à toujours faire face à l’utilisateur.</p>
              </div>
            </div>
               <div class="col4 border end-border"><input id="wireframe" type="checkbox" v-model="form.symbol.wireframe"><p class="material-symbols-sharp">grid_4x4</p><label for="wireframe">wireframe</label>
                <p ref="wireframe" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'wireframe')" @mouseleave="tooltipElement = null">help</p>
                <div data-role="tooltip" v-show="tooltipElement === 'wireframe'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'wireframe'"  @mouseleave="tooltipElement = null"></p>
                </div>
              </div>
          </div>

          <div :class="{disabled: mediaARCheck }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">replay</p><p>lecture</p>
              <p ref="replay" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'replay')" @mouseleave="tooltipElement = null">help</p>
                <div data-role="tooltip" v-show="tooltipElement === 'replay'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'replay'"  @mouseleave="tooltipElement = null"></p>
                </div>
            </div>
            <div class="col3 border"><input id="symbol_autoplay" type="checkbox" v-model="form.symbol.autoplay" :disabled="mediaARCheck"><label for="symbol_autoplay">autoplay</label>
              <p ref="autoplay" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'autoplay')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'autoplay'"  :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'autoplay'"  @mouseleave="tooltipElement = null">Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu lorsque l’utilisateur entre dans le périmètre du « scope » (défini dans les paramètre globaux du point d’intérêt), ou si la lecture est déclenchée lorsque l’utilisateur entre dans le radius du point d’intérêt (défini dans le style extérieur du point d’intérêt).</p>
              </div>
            </div>
            <div class="col3 border end-border"><input id="symbol_loop" type="checkbox" v-model="form.symbol.loop" :disabled="mediaARCheck"><label for="symbol_loop">loop</label>
            <p ref="loop" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'loop')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'loop'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'loop'" @mouseleave="tooltipElement = null">Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu en boucle. </p>
              </div></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">photo_size_select_small</p><p>échelle</p>
            <p ref="photo_size_select_small" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'photo_size_select_small')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'photo_size_select_small'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'photo_size_select_small'"  @mouseleave="tooltipElement = null">le média du symbole est affiché à l’échelle contenue dans le fichier. Cette valeur permet de redimensionner le média d’un facteur égal à la valeur choisie.</p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.symbol.scale" class="input-margin" step="0.1" style="width: 50px;">
              <el-slider class="slider-width" v-model="form.symbol.scale" :max="10" :step="0.1"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">merge</p><p>position</p>
              <p ref="symb_position" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'symb_position')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'symb_position'" :style="tooltipPosition">
              <p @mouseenter="tooltipElement = 'symb_position'"  @mouseleave="tooltipElement = null"></p>
            </div></div>
            <div class="col4 border">
              <p class="material-symbols-sharp">north_east</p>
              <label for="position_symbole_x">distance</label>
              <input id="position_symbole_x" type="number" v-model="form.symbol.position.distance" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;">
              <el-slider class="slider-width-position" v-model="form.symbol.position.distance" :max="10" :step="0.1" :min="-10"/>
            </div>
            <div class="col4 border">
              <p class="material-symbols-sharp">architecture</p>
              <label for="position_symbole_y">rotation</label>
              <input id="position_symbole_y" type="number" v-model="form.symbol.position.rotation" style="width: 50px; padding-left: 5px; padding-right: 5px;">
              <el-slider class="slider-width-position" v-model="form.symbol.position.rotation" :max="359" :step="1" :min="0"/>
            </div>
            <div class="col4 border end-border">
              <p class="material-symbols-sharp">north</p>
              <label for="position_symbole_z">hauteur</label>
              <input id="position_symbole_z" type="number" v-model="form.symbol.position.elevation" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;">
              <el-slider class="slider-width-position" v-model="form.symbol.position.elevation" :max="10" :step="0.1" :min="-10"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">animation</p><p>animation</p>
            <p ref="symb_animation" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'symb_animation')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'symb_animation'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'symb_animation'"  @mouseleave="tooltipElement = null">cette valeur est un facteur d’amplitude pour créer une animation sinusoïdale du symbole sur l’axe vertical. Si la valeur est à 0, il n’y a pas d’animation.</p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.symbol.amplitude" class="input-margin" style="width: 50px;">
              <el-slider class="slider-width" v-model="form.symbol.amplitude" :max="1" :step="0.01"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">music_note</p><p>audio</p>
            <p ref="audio" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'audio')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'audio'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'audio'"  @mouseleave="tooltipElement = null">le fichier chargé agira comme symbole sonore du point d'intérêt. Celui-ci peut-être utilisé en combinaison ou à la place d’un symbole visuel. Les formats suivants sont supportés: .mp3, .m4a, .wav</p>
              </div></div>
            <div class="col4 border">
              <input type="file" name="file" class="input-margin" accept=".mp3, .m4a, .wav" @change="handleFileUploadSymbolAudio"/>
            </div>
            <div class="col4 border end-border"><input id="audio_autoplay" type="checkbox" v-model="form.symbol.audio_autoplay"><label for="audio_autoplay">autoplay</label>
            <p ref="audio_autoplay" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'audio_autoplay')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'audio_autoplay'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'audio_autoplay'"  @mouseleave="tooltipElement = null">Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu lorsque l’utilisateur entre dans le périmètre du « scope » (défini dans les paramètre globaux du point d’intérêt), ou si la lecture est déclenchée lorsque l’utilisateur entre dans le radius du point d’intérêt (défini dans le style extérieur du point d’intérêt).</p>
              </div></div>
            <div class="col4 border end-border"><input id="audio_loop" type="checkbox" v-model="form.symbol.audio_loop"><label for="audio_loop">loop</label>
              <p ref="audio_loop" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'audio_loop')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'audio_loop'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'audio_loop'"  @mouseleave="tooltipElement = null">Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu en boucle. </p>
              </div></div>
          </div>
          <div :class="{disabled: !form.symbol.audio_autoplay}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">noise_aware</p><p>portée de l'audio</p>
            <p ref="noise_aware" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'noise_aware')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'noise_aware'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'noise_aware'"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.symbol.audio_distance" class="input-margin" step="0.5" style="width: 50px;" :disabled="!form.symbol.audio_autoplay">
              <el-slider class="slider-width" v-model="form.symbol.audio_distance" :step="0.5" :max="1000" :disabled="!form.symbol.audio_autoplay"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">map</p><p>symbole carte</p>
            <p ref="map" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'map')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'map'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'map'"  @mouseleave="tooltipElement = null"> ce fichier sera affiché sur la carte 2D mobile et desktop</p>
              </div></div>
            <div class="col2 border end-border">
              <input type="file" name="file" class="input-margin" accept=".png, .jpg, .svg" @change="handleFileUploadSymbol"/>
            </div>
            <!--div class="col3 border end-border"><input id="symbol_vis" type="checkbox" v-model="form.symbol.is_visible"><label for="symbol_vis">visible</label></div-->
          </div>
        </Accordeon>
        <Accordeon :header="'Rayon'" :length="6" :should-be-open="true">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">circle</p><p>forme</p>
             <p ref="forme" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'forme')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'forme'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'forme'"  @mouseleave="tooltipElement = null">Ce paramètre définit la forme du radius: anneau, cercle, demi-sphère, sphère</p>
              </div></div>
            <div class="col3 border">
              <select v-model="form.style_type" class="input-margin input-full-size-element">
                <option
                  v-for="item in style_option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </option>
              </select>
            </div>
            <div class="col3 border end-border" :class="{disabled: form.style_type == 'sphere' || form.style_type == 'hemisphere'}">
              <p class="material-symbols-sharp">expand</p>
              <label for="extrusion">extrusion</label>
               <p ref="style_type" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'style_type')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'style_type'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'style_type'"  @mouseleave="tooltipElement = null">Si le type de forme est 'cercle', ce paramètre définit la hauteur de l’extrusion pour la transformation en cylindre.</p>
              </div>
              <input id="extrusion" type="number" v-model="form.extrusion" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;" :disabled="form.style_type == 'sphere' || form.style_type == 'hemisphere'">
              <label for="extrusion">m</label>
              <el-slider class="slider-width-small" v-model="form.extrusion" :max="100" :step="0.1" :disabled="form.style_type == 'sphere' || form.style_type == 'hemisphere'"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">share_location</p><p>rayon</p>
            <p ref="share_location" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'share_location')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'share_location'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'share_location'"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col2 border end-border">
              <input id="radius" type="number" class="input-margin" v-model="form.radius" style="width: 50px;">
              <label for="radius">m</label>
              <el-slider class="slider-width" v-model="form.radius" :max="100" :step="0.1"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">merge</p><p>position</p>
              <p ref="merge" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'merge')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'merge'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'merge'"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
            <div class="col4 border">
              <p class="material-symbols-sharp">north_east</p>
              <label for="position_symbole_x">distance</label>
              <input id="position_symbole_x" type="number" v-model="form.position.distance" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;">
              <el-slider class="slider-width-position" v-model="form.position.distance" :max="100" :step="0.1" :min="-100"/>
            </div>
            <div class="col4 border">
              <p class="material-symbols-sharp">architecture</p>
              <label for="position_symbole_y">rotation</label>
              <input id="position_symbole_y" type="number" v-model="form.position.rotation" style="width: 50px; padding-left: 5px; padding-right: 5px;">
              <el-slider class="slider-width-position" v-model="form.position.rotation" :max="359" :step="1" :min="0"/>
            </div>
            <div class="col4 border end-border">
              <p class="material-symbols-sharp">north</p>
              <label for="position_symbole_z">hauteur</label>
              <input id="position_symbole_z" type="number" v-model="form.position.elevation" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;">
              <el-slider class="slider-width-position" v-model="form.position.elevation" :max="10" :step="0.1" :min="-10"/>
            </div>
          </div>
          <div :class="{disabled: form.style_type == 'sphere' || form.style_type == 'hemisphere'}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">border_color</p><p>contour</p>
            <p ref="contour" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'contour')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'contour'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'contour'"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col4 border"><p class="material-symbols-sharp">line_weight</p><input id="epaisseur" step="0.01" type="number" v-model="form.style_stroke_width" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'" style="width: 50px"><el-slider class="slider-width-position" v-model="form.style_stroke_width" :max="10"  :step="0.01" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"/></div>
            <div class="col4 border"><p class="material-symbols-sharp">colorize</p><input id="stroke_color" type="color" v-model="form.stroke_color" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"><label for="stroke_color">{{ form.stroke_color }}</label></div>
            <div class="col4 border end-border"><p class="material-symbols-sharp">opacity</p><input id="stroke_opacity" type="number" v-model="form.stroke_opacity" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'" style="width:50px"><label for="stroke_opacity">%</label><el-slider class="slider-width-position" v-model="form.stroke_opacity" :max="100" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"/></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">format_color_fill</p> <p>reamplissage</p>
            <p ref="remplissage" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'remplissage')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'remplissage'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'remplissage'"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col4 border"><input id="wireframe" type="checkbox" v-model="form.wireframe"><p class="material-symbols-sharp">grid_4x4</p> <label for="wireframe">wireframe</label>
            <p ref="fill_wireframe" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'fill_wireframe')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'fill_wireframe'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'fill_wireframe'"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
            <div class="col4 border"><p class="material-symbols-sharp">colorize</p><input id="fill_color" type="color" v-model="form.fill_color"><label for="fill_color">{{ form.fill_color }}</label></div>
            <div class="col4 border end-border"><p class="material-symbols-sharp">opacity</p><input id="fill_opacity" type="number" v-model="form.fill_opacity" style="width: 50px;"><label for="fill_opacity">%</label><el-slider class="slider-width-position" v-model="form.fill_opacity" :max="100"/></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">animation</p> <p>animation</p>
            <p ref="anim" class="material-symbols-sharp" @mouseenter="openTooltip($event, 'anim')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'anim'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'anim'"  @mouseleave="tooltipElement = null">cette valeur est un facteur d’amplitude pour créer une animation sinusoïdale du rayon. Si la valeur est à 0, il n’y a pas d’animation.</p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.amplitude" class="input-margin" style="width: 50px;">
              <el-slider class="slider-width" v-model="form.amplitude" :max="1"  :step="0.01"/>
            </div>
          </div>
      </Accordeon>
      <div class="full-button actions-button">
        <button class="full-button button-gray" @click="savePreferences"><p class="material-symbols-sharp">bookmark</p> Définir comme paramètres par défaut</button>
      </div>
      </div>
    </div>
    <div v-show="tab === 1" class="collapse">
      <div class="container-layout">
        <div v-for="(element, index) in form.media" :key="index" :title="`Media ${index + 1}`" :name="index">
        <Accordeon :header="'Media ' + (index + 1)" :length="5 + element.metadata.length" :should-be-open="true" :could-delete="true" @delete="removeMedia(index)">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">add_photo_alternate</p><p>média</p>
            <p :ref="`add_photo_alternate_${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `add_photo_alternate_${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `add_photo_alternate_${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `add_photo_alternate_${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col4 border end-border">
              <input type="file" name="file" class="input-margin" accept=".png, .jpg, .svg, .gltf, .glb, .mp3, m4a, .wav, .mp4, .m4v" @change="handleFileUploadMedia($event, index)" :disabled="element.text !== ''"/>
            </div>
            <div class="col4 border"  :class="{disabled: element.text == '' && element.media_type == '' }"><input :id="`is_visible_in_radius${index}`" type="checkbox" v-model="element.is_visible_in_radius" :disabled="element.text == '' && element.media_type == ''"><label :for="`is_visible_in_radius${index}`">visible uniquement dans le rayon</label>
            <p :ref="`is_visible_in_radius${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `is_visible_in_radius${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `is_visible_in_radius${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `is_visible_in_radius${index}`"  @mouseleave="tooltipElement = null">Si coché le média ne sera visible que dans le rayon d'interaction, sinon il sera visible dés que la distance de visibilité du point d'interêt est atteinte</p>
              </div>
            </div>
            <div class="col4 border end-border" :class="{disabled: element.text == '' && element.media_type == '' }"><input :id="`is_facing${index}`" type="checkbox" v-model="element.is_facing" :disabled="element.text == '' && element.media_type == ''"><label for="is_facing">face à la caméra</label>
              <p :ref="`is_facing${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `is_facing${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `is_facing${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `is_facing${index}`"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
          </div>
          <div :class="{disabled: element.media_type !== '' }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">short_text</p><p>text</p>
            <p :ref="`short_text${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `short_text${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `short_text${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `short_text${index}`"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
            <div class="col2 border end-border"><textarea id="text" type="textarea" class="input-margin" v-model="element.text" :disabled="element.media_type !== ''"/></div>
          </div>
          <div :class="{disabled: element.media_type === '' }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">replay</p><p>lecture</p>
            <p :ref="`replay${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `replay${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `replay${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `replay${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col3 border"><input id="media_autoplay" type="checkbox" v-model="element.autoplay" :disabled="element.media_type === ''"><label for="media_autoplay">autoplay</label>
              <p :ref="`media_autoplay${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `media_autoplay${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `media_autoplay${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `media_autoplay${index}`"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
            <div class="col3 border end-border"><input id="media_loop" type="checkbox" v-model="element.loop" :disabled="element.media_type === ''"><label for="media_loop">loop</label>
            <p :ref="`media_loop${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `media_loop${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `media_loop${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `media_loop${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">photo_size_select_small</p><p>échelle</p>
            <p :ref="`photo_size_select${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `photo_size_select${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `photo_size_select${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `photo_size_select${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" v-model="element.scale" class="input-margin" step="0.1" style="width: 50px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width" v-model="element.scale" :max="10" :step="0.1" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">merge</p><p>position</p>
            <p :ref="`merge${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `merge${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `merge${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `merge${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col4 border">
              <p class="material-symbols-sharp">north_east</p>
              <label for="media_symbole_x">distance</label>
              <input id="media_symbole_x" type="number" v-model="element.position.distance" style="width: 50px; padding-left: 5px; padding-right: 5px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width-position" v-model="element.position.distance" :max="10" :step="0.1" :min="-10" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
            <div class="col4 border">
              <p class="material-symbols-sharp">architecture</p>
              <label for="media_symbole_y">rotation</label>
              <input id="media_symbole_y" type="number" v-model="element.position.rotation" style="width: 50px; padding-left: 5px; padding-right: 5px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width-position" v-model="element.position.rotation" :max="359" :step="1" :min="0" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
            <div class="col4 border end-border">
              <p class="material-symbols-sharp">north</p>
              <label for="media_symbole_z">hauteur</label>
              <input id="media_symbole_z" type="number" v-model="element.position.elevation" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width-position" v-model="element.position.elevation" :max="10" :step="0.1" :min="-10" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
          </div>
          <!--div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">animation</p><p>animation</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input type="number" v-model="element.amplitude" class="input-margin" style="width: 50px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width" v-model="element.amplitude" :max="1" :step="0.01" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
          </div-->
          <div style="display: flex" v-for="(meta, indexMeta) in element.metadata" :key="indexMeta">
            <div class="col-main border"><p class="material-symbols-sharp">database</p><input v-model="meta.key" type="text" class="metadata-title">
            <p :ref="`${meta.key}-${index}`" class="material-symbols-sharp" @mouseenter="openTooltip($event,  `${meta.key}-${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `${meta.key}-${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `${meta.key}-${index}`"  @mouseleave="tooltipElement = null">{{ meta.description }}</p>
              </div></div>
            <div class="col3 border"><input v-model="meta.value" type="text" class="input-margin input-full-size-element"></div>
            <div class="col3 border end-border"><input v-model="meta.description" type="text" class="input-margin input-full-size-element"><p class="material-symbols-sharp" @click="deleteMetadata(index)">delete_forever</p></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp link">add</p><p class="link" @click="addMetadata(index, indexMeta)">créer un attribut</p>
            <p ref="add" class="material-symbols-sharp" @mouseenter="openTooltip($event,  'add')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `add`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `add`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col2 border end-border" />
          </div>
      </Accordeon>
        </div>
      

      <div class="full-button actions-button">
        <button class="full-button button-gray" @click="addMedia"><p class="material-symbols-sharp">add</p> Ajouter un média</button>
      </div>
      </div>
    </div>
    <div v-if="isEdit" class="full-button actions-button">
      <button class="full-button button-red" @click="deleteDialog = true"><p class="material-symbols-sharp">wrong_location</p> Supprimer le point d'intérêt</button>
    </div>
    <div v-else class="full-button actions-button">
      <button class="full-button button-dark-gray" @click="cancelDialog = true"><p class="material-symbols-sharp">undo</p>Annuler</button>
    </div>
    <div class="full-button actions-button">
      <button class="full-button button-blue" @click="isEdit ? updatePoi() : createPoi()" ><p class="material-symbols-sharp">where_to_vote</p> Enregistrer les modifications</button>
    </div>
  </div>
  <Notification v-if="shouldDisplayNotification" :data-type="'success'">Vos préférences ont été enregistrer</Notification>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer ces point d'intérêts?" @closeDialog="deleteDialog = false" @validate="deletePoi()" />
  <CancelConfirmation v-if="cancelDialog" :dialogVisible="cancelDialog" title="Voulez-vous enregistrer les modifications?" @close="close()" @closeDialog="cancelDialog = false" @validate="isEdit ? updatePoi() : createPoi()" />
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { useStore } from '../../../../composables/store.js';
import { mapStore } from '../../../../composables/map.js';

import Accordeon from '../../../app/UIElement/Accordeon.vue';
import Notification from '../../../app/UIElement/Notification.vue';

import DialogHeader from './DialogHeader.vue';
import DeleteConfirmation from './DeleteConfirmation.vue';
import CancelConfirmation from './CancelConfirmation.vue';
import TheAframeEditor from '../../../TheAframe/TheAframeEditor.vue';
import AframeMedia from '../../../TheAframe/AframeMedia.vue';

import { savePoi, updatePoi, deletePoi, saveSymbol, saveMedia, getSymbolUrl, getIcon, getMediaUrl, getSymbolAudiUrl, saveEvent } from '../../../../utils/api.js';


export default {
  name: 'App',
  components: { TheAframeEditor, AframeMedia, DialogHeader, DeleteConfirmation, CancelConfirmation, Accordeon, Notification },
  props: {
    poi: Object,
    coordinate: Object,
    showDialog: Boolean,
    isEdit: Boolean,
    bioversId: Number,
  },
  emits: ['closeDialog', 'closeAfterSave'],
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;
      if (this.dialogVisible) {
        if (this.isEdit) {
            this.setupEdition();
        }
      } else {
        this.resetEditor();
      }
    },
    coordinate(newVal) {
      if (newVal) {
        this.form.coordinate.lat = newVal.lat;
        this.form.coordinate.long = newVal.lng;
        this.updateWait(false);
      }
    },
  },
  data() {
    return {
      tab: 0,
      tooltipElement: '',
      topTooltipPosition: 0,
      leftTooltipPosition: 0,
      dialogVisible: false,
      deleteDialog: false,
      cancelDialog: false,
      shouldDisplayNotification: false,
      style_option: [{
        value: 'circle',
        label: 'Cercle',
      }, {
        value: 'sphere',
        label: 'Sphère',
      }, {
        value: 'hemisphere',
        label: 'Demi-sphère',
      }],
      trigger_option: [{
        value: 'location',
        label: 'location',
      },
      {
        value: 'touch',
        label: 'touch',
      }],
      symbolFile: {
        url: '',
        content: undefined,
      },
      symbolFileAr: {
        url: '',
        content: undefined,
      },
      symbolFileAudio: {
        url: '',
        content: undefined,
      },
      default_media: {
        text: '',
        url: '',
        display_url: '',
        media_type: '',
        content: undefined,
        is_visible_in_radius: true,
        is_facing: true,
        autoplay: true,
        loop: false,
        scale: 1,
        position: {
          distance: 0,
          elevation: 0,
          rotation: 0,
        },
        amplitude: 0,
        metadata: [],
      },
      defaultForm: {
        title: '',
        title_is_visible: true,
        subtitle: '',
        subtitle_is_visible: false,
        coordinate: {
          long: 0,
          lat: 0,
          alt: 0,
        },
        symbol: {
          url: '',
          media_type: '',
          audio_url: '',
          media_type_audio: '',
          audio_autoplay: false,
          audio_loop: false,
          audio_distance: 60,
          ar_url: '',
          media_type_ar: '',
          is_visible_ar: true,
          is_facing_user: true,
          is_visible: true,
          autoplay: true,
          loop: true,
          scale: 1,
          position: {
            distance: 0,
            elevation: 0,
            rotation: 0,
          },
          amplitude: 0,
          wireframe: false,
        },
        scope: 50,
        trigger_mode: 'location',
        style_type: 'circle',
        extrusion: 0,
        radius: 2,
        position: {
          distance: 0,
          elevation: 0,
          rotation: 0,
        },
        style_stroke_width: 0.1,
        stroke_color: '#FFFFFF',
        stroke_opacity: 40,
        fill_type: false,
        fill_color: '#FFFFFF',
        fill_opacity: 20,
        amplitude: 0,
        wireframe: false,
        metadata: [],
        media: [],
      },
      form: {},
    }
  },
  methods: {
    setupEdition() {
        this.form = JSON.parse(JSON.stringify(this.poi.poi));
        if (!this.form.symbol) {
          this.form.symbol = this.defaultForm.symbol;
        }
        this.symbolFileAr.url = getSymbolUrl(this.form.symbol.id);
        this.symbolFileAudio.url = getSymbolAudiUrl(this.form.symbol.id);
        this.symbolFile.url = getIcon(this.form.symbol);
        for (let i = 0; i < this.form.media.length; i++) {
            if (!this.form.media[i].metadata) {
              this.form.media[i].metadata = [];
            } else {
              this.form.media[i].metadata = JSON.parse(this.form.media[i].metadata);
            }
            this.form.media[i].display_url = getMediaUrl(this.form.media[i]);
            
        }
        if (!this.form.metadata) {
          this.form.metadata = [];
        } else {
          this.form.metadata = (JSON.parse(this.form.metadata));
        }
        this.updateWait(false);
    },
    setupFromPreferences(preferences) {
      this.form.amplitude = preferences.amplitude;
      this.form.extrusion = preferences.extrusion;
      this.form.fill_color = preferences.fill_color;
      this.form.fill_opacity = preferences.fill_opacity;
      this.form.fill_type = preferences.fill_type;
      this.form.radius = preferences.radius;
      this.form.scope = preferences.scope;
      this.form.stroke_color = preferences.stroke_color;
      this.form.stroke_opacity = preferences.stroke_opacity;
      this.form.style_stroke_width = preferences.style_stroke_width;
      this.form.style_type = preferences.style_type;
      this.form.trigger_mode = preferences.trigger_mode;
      this.form.wireframe = preferences.wireframe;
      this.form.position.distance = preferences.position.distance;
      this.form.position.rotation = preferences.position.rotation;
      this.form.position.elevation = preferences.position.elevation;
      this.form.symbol.amplitude = preferences.symbol.amplitude;
      this.form.symbol.audio_autoplay = preferences.symbol.audio_autoplay;
      this.form.symbol.audio_distance = preferences.symbol.audio_distance;
      this.form.symbol.audio_loop = preferences.symbol.audio_loop;
      this.form.symbol.autoplay = preferences.symbol.autoplay;
      this.form.symbol.is_facing_user = preferences.symbol.is_facing_user;
      this.form.symbol.is_visible = preferences.symbol.is_visible;
      this.form.symbol.is_visible_ar = preferences.symbol.is_visible_ar;
      this.form.symbol.scale = preferences.symbol.scale;
      this.form.symbol.wireframe = preferences.symbol.wireframe;
      this.form.symbol.position.distance = preferences.symbol.position.distance;
      this.form.symbol.position.rotation = preferences.symbol.position.rotation;
      this.form.symbol.position.elevation = preferences.symbol.position.elevation;
    },
    resetEditor() {
        this.form = JSON.parse(JSON.stringify(this.defaultForm));
        const preferences = this.getPoiConfigPreferences;
        if (preferences) {
          this.setupFromPreferences(preferences);
        }
        this.symbolFile = {
            url: '',
            content: undefined,
        };
        this.symbolFileAr = {
            url: '',
            content: undefined,
        };
        this.symbolFileAudio = {
            url: '',
            content: undefined,
        };
        this.tab = 0;
    },
    close() {
      this.cancelDialog = false;
      this.$emit('closeDialog');
    },
    longitudeValidation() {
      if (this.form.coordinate.long < -180) {
        this.form.coordinate.long = -180;
      }
      if (this.form.coordinate.long > 180) {
        this.form.coordinate.long = 180;
      }
    },
    latitudeValidation() {
      if (this.form.coordinate.lat < -90) {
        this.form.coordinate.lat = -90;
      }
      if (this.form.coordinate.lat > 90) {
        this.form.coordinate.lat = 90;
      }
    },
    createGeneralAttribute() {
      this.form.metadata.push({
        key: '',
        value: '',
        description: '',
      })
    },
    deleteGeneralAttribute(index) {
      this.form.metadata.splice(index, 1);
    },
    addMedia() {
      this.form.media.push(JSON.parse(JSON.stringify(this.default_media)));
    },
    removeMedia(index) {
      this.form.media.splice(index, 1);
    },
    addMetadata(index) {
      this.form.media[index].metadata.push({
        key: '',
        value: '',
        description: '',
      })
    },
    deleteMetadata(index, indexMeta) {
      this.form.media[index].metadata.splice(indexMeta, 1);
    },
    openTooltip(event, element) {
      this.topTooltipPosition = event.y;
      this.leftTooltipPosition = event.x;
      this.tooltipElement = element;
    },
    handleFileUploadSymbol(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.symbolFile.content = files[0];
        const lastDot = this.symbolFile.content.name.lastIndexOf('.');
        const ext = this.symbolFile.content.name.substring(lastDot + 1);
        this.symbolFile.url = URL.createObjectURL(this.symbolFile.content);
        this.form.symbol.media_type = ext;
      } else {
        this.symbolFile.url = '';
        this.form.symbol.media_type = '';
      }
    },
    handleFileUploadSymbolAR(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.symbolFileAr.content = files[0];
        const lastDot = this.symbolFileAr.content.name.lastIndexOf('.');
        const ext = this.symbolFileAr.content.name.substring(lastDot + 1);
        this.symbolFileAr.url = URL.createObjectURL(this.symbolFileAr.content);
        this.form.symbol.media_type_ar = ext;
      } else {
        this.symbolFileAr.url = '';
        this.form.symbol.media_type_ar = '';
      }
    },
    handleFileUploadSymbolAudio(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.symbolFileAudio.content = files[0];
        const lastDot = this.symbolFileAudio.content.name.lastIndexOf('.');
        const ext = this.symbolFileAudio.content.name.substring(lastDot + 1);
        this.symbolFileAudio.url = URL.createObjectURL(this.symbolFileAudio.content);
        this.form.symbol.media_type_audio = ext;
      } else {
        this.symbolFileAudio.url = '';
        this.form.symbol.media_type_audio = '';
      }
    },
    handleFileUploadMedia(event, index) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.form.media[index].content = files[0];
        const lastDot = this.form.media[index].content.name.lastIndexOf('.');
        const ext = this.form.media[index].content.name.substring(lastDot + 1);
        this.form.media[index].url = URL.createObjectURL(this.form.media[index].content);
        this.form.media[index].display_url = URL.createObjectURL(this.form.media[index].content);
        this.form.media[index].media_type = ext;
      } else {
        this.form.media[index].url = '';
        this.form.media[index].display_url = '';
        this.form.media[index].media_type = '';
      }
    },
    async saveSymbolAndMedias() {
        if (this.symbolFileAr.content) {
        const formData = new FormData();
        formData.append('file', this.symbolFileAr.content);
        const path = await saveSymbol(formData);
        if (path.data) {
          this.form.symbol.ar_url = path.data;
        }
      }
      if (this.symbolFile.content) {
        const formData = new FormData();
        formData.append('file', this.symbolFile.content);
        const path = await saveSymbol(formData);
        if (path.data) {
          this.form.symbol.url = path.data;
        }
      }
      if (this.symbolFileAudio.content) {
        const formData = new FormData();
        formData.append('file', this.symbolFileAudio.content);
        const path = await saveSymbol(formData);
        if (path.data) {
          this.form.symbol.audio_url = path.data;
        }
      }
      if (this.form.media.length > 0) {
        for (let i = 0; i < this.form.media.length; i++) {
            delete this.form.media[i].display_url;
            if (this.form.media[i].content) {
              const formData = new FormData();
              formData.append('file', this.form.media[i].content);
              const path = await saveMedia(formData);
              if (path.data) {
                  this.form.media[i].url = path.data;
              }
            }
        } 
      }
    },
    async createEvent(event, bioversId) {
      const { accuracy, position } = mapStore();
      await saveEvent({
        is_public: true,
        gps_accuracy: accuracy.value,
        biovers: bioversId,
        coordinate: { lat: position.value[0], long: position.value[1], alt: position.value[2] ?? 0 },
        data: event,
      });
    },
    async createPoi() {
      this.updateWait(true);
      this.cancelDialog = false;
      await this.saveSymbolAndMedias();
      this.form.biovers = this.bioversId;
      const newPoi = await savePoi(this.form);
      this.addNewPoi(newPoi.data);
      useStore().addPoiInBiovers(newPoi.data);
      await this.createEvent('create-poi-' + newPoi.data.id, this.bioversId);
      this.showCreationDialog = false;
      this.updateWait(false);
      this.$emit('closeAfterSave');
    },
    async updatePoi() {
      this.updateWait(true);
      this.cancelDialog = false;
      await this.saveSymbolAndMedias();
      const updatedPoi = await updatePoi(this.form);
      this.updatePoiStore(updatedPoi.data);
      useStore().updatePoiInBiovers(updatedPoi.data);
      await this.createEvent('update-poi-' + updatedPoi.data.id, updatedPoi.data.biovers);
      this.showCreationDialog = false;
      this.updateWait(false);
      this.$emit('closeAfterSave');
    },
    async deletePoi() {
      this.updateWait(true);
      this.deleteDialog = false;
      this.removePoi(this.form);
      await deletePoi(this.form);
      this.showCreationDialog = false;
      this.updateWait(false);
      this.$emit('closeAfterSave');
    },
    savePreferences() {
      const formToSave = JSON.parse(JSON.stringify(this.form));
      delete formToSave.User;
      delete formToSave.author;
      delete formToSave.biovers;
      delete formToSave.id;
      delete formToSave.last_contributor;
      delete formToSave.last_contributor_fk;
      delete formToSave.title;
      delete formToSave.title_is_visible;
      delete formToSave.subtitle;
      delete formToSave.subtitle_is_visible;
      delete formToSave.creation_date;
      delete formToSave.update_date;
      delete formToSave.deleted_date;
      delete formToSave.position.id;
      delete formToSave.position.media_id;
      delete formToSave.position.poi_id;
      delete formToSave.position.symbol_id;
      delete formToSave.coordinate;
      delete formToSave.media;
      delete formToSave.metadata;
      delete formToSave.symbol.id;
      delete formToSave.symbol.url;
      delete formToSave.symbol.poi_id;
      delete formToSave.symbol.ar_url;
      delete formToSave.symbol.audio_url;
      delete formToSave.symbol.media_type;
      delete formToSave.symbol.media_type_audio;
      delete formToSave.symbol.media_type_ar;
      delete formToSave.symbol.creation_date;
      delete formToSave.symbol.update_date;
      delete formToSave.symbol.deleted_date;
      delete formToSave.symbol.position.id;
      delete formToSave.symbol.position.media_id;
      delete formToSave.symbol.position.poi_id;
      delete formToSave.symbol.position.symbol_id;
      this.savePoiPreferences(formToSave);
      this.shouldDisplayNotification = true;
      setTimeout(() => this.shouldDisplayNotification = false, 3000);
    },
    ...mapActions('global', ['updateWait', 'savePoiPreferences']),
    ...mapActions('biovers', ['addNewPoi', 'updatePoiStore', 'removePoi']),
  },
  computed: {
    mediaARCheck() {
      const mediaType = this.form.symbol.media_type_ar;
      return !(mediaType === 'mp4' || mediaType === 'm4a');
    },
    tooltipPosition() {
      return {
        top: `calc(${this.topTooltipPosition}px - 2.5vh)`,
        left: `calc(${this.leftTooltipPosition}px - 15vw)`,
      }
    } ,
    ...mapGetters('global', ['getPoiConfigPreferences']),
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.defaultForm));
    const preferences = this.getPoiConfigPreferences;
    if (preferences) {
      this.setupFromPreferences(preferences);
    }
    this.updateWait(false);
  },
}
</script>

<style scoped>
p {
  margin-top: 6px;
  margin-bottom: 6px;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000000;
}

@media screen and (min-width: 1000px) {
  .modal-edition {
    background-color: white;
    width: 70vw;
    height: 95vh;
    position: fixed;
    top: 2.5vh;
    left: 15vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media screen and (max-width: 999px) {
  .modal-edition {
    background-color: white;
    width: 95vw;
    height: 95vh;
    position: fixed;
    top: 2.5vh;
    left: 2.5vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
  }
}

#title, #description {
  width: 100%;
  margin-right: 5px;
}

label {
  font-weight: bold;
  padding-left: 6px;
  padding-right: 6px;
}

button {
  width: 49%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

textarea {
  width: 100% !important;
  margin-right: 5px;
  height: 30px;
  line-height: 1 !important;
}

.button-gray {
  background-color: #F2F2F2;
  border: 0px;
  color: black;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-dark-gray {
  background-color: #666666;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-blue {
  background-color: #2F80ED;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-red {
  background-color: #FF0000;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.embedded {
  height: 40vh;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
}

.selection-layout {
  display: flex;
  height: 40px;
}

.style-button-border {
  border-left: 2px solid black;
  border-top: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 0px;
}

.style-button {
  display: flex;
  background-color: #E0E0E0;
  color: #666666;
}

.style-button-active {
  background-color: #FFFFFF;
  color: #000;
}

.container-layout {
  padding-left: 20px;
  padding-right: 20px;
}

@media screen and (max-width: 999px) {
  .container-layout {
    width: 1000px;
    overflow-x: auto;
  }
}

.col-main {
  width: 25%;
  display: flex;
  align-items: center;
  padding-left: 6px;
  height: 34px;
}

.col2 {
  width: 75%;
  display: flex;
  align-items: center;
  height: 34px;
}

.col3 {
  width: calc((100% - 25%) / 2);
  display: flex;
  align-items: center;
  height: 34px;
}

.col4 {
  width: 25%;
  display: flex;
  align-items: center;
  height: 34px;
}

.col5 {
  width: calc((100% - 25%) / 4);
  display: flex;
  align-items: center;
  height: 34px;
}

.border {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.end-border {
  border-right: 1px solid black;
}

.slider-width {
  width: calc(100% - 130px) !important;
  padding-left: 23px;
}

.slider-width-position {
  width: calc(100% - 170px) !important;
  padding-left: 23px;
}

.slider-width-small {
  width: calc(100% - 200px) !important;
  padding-left: 23px;
}

.link {
  color: #2F80ED;
  font-weight: bold;
}

.disabled {
  background-color: #BDBDBD;
}

.full-button {
  width: 100%;
  border-radius: 100px;
  height: 40px;
}

.material-symbols-sharp {
  font-size: 20px;
  padding-right: 5px;
}

.edition-layout {
  height: calc(95vh - 40vh);
}

.collapse {
  border: 2px solid black;
  height: calc(95vh - 40vh - 210px);
  overflow: auto;
}

.actions-button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.description-transform {
  transform: scaleY(-1);
}

.delete-font {
  padding-left: 5px;
}

.input-margin {
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 5px;
}

.metadata-title {
  width: calc(100% - 60px);
}

.input-full-size-element {
  width: 100%;
  margin-right: 5px;
}

.el-collapse-item__content * {
  line-height: 0;
}

[data-role="tooltip"] {
    display: inline-block;
    border-radius: 20px;
    position: absolute;
    border: 1px solid black;
    color: white;
    background: black;
    z-index: 10000001;
    width: 400px;
    min-height: 40px;
}
</style>
