<template>
  <el-dialog v-model="dialogVisible" :title="getTitle" @close="$emit('closeDialog')" :fullscreen="true">
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
        <aframe-media v-for="(media, index) in form.medias" :key="index"
          :showMedia="tab == 1 || !media.is_visible_in_radius"
          :media="media.url"
          :mediaType="media.media_type"
          :mediaLoop="media.loop"
          :scale="media.scale"
          :positionX="media.position.distance"
          :positionY="media.position.elevation"
          :positionRotation="media.position.rotation"
          :isVisibleInRadius="media.is_visible_in_radius"
          :facing="media.is_facing"
          :text="media.text"
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
        <el-collapse>
        <el-collapse-item title="Général" name="1">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">location_searching</p><p>coordonnées</p>
              <el-tooltip placement="top">
                <template #content>Les coordonnées WGS84 ou se situe le centre du point d’intérêt.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col4 border"><label for="long">longitude</label><input id="long" class="input-full-size-element" type="number" v-model="form.coordinate.long" min="-180" max="180" @change="longitudeValidation()"></div>
            <div class="col4 border"><label for="lat">latitude</label><input id="lat" class="input-full-size-element" type="number" v-model="form.coordinate.lat" min="-90" max="90" @change="latitudeValidation()"></div>
            <div class="col4 border end-border"><label for="alt">altitude</label><input id="alt" class="input-full-size-element" type="number" v-model="form.coordinate.alt"></div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">short_text</p><p>titre</p>
              <el-tooltip placement="top">
                <template #content> le titre du point d’intérêt et ses paramètres d’affichage. </template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
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
              <el-tooltip placement="top">
                <template #content>sous-titre ou description du point d’intérêt.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
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
              <el-tooltip placement="top">
                <template #content> Lorsque la distance entre la position de l’utilisateur et celle d’un point/trace est inférieur à cette valeur, celui-ci est affiché dans la scene A-Frame. La lecture de certains médias (son, vidéo, gltf animés) peuvent également</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col2 border end-border">
              <input id="scope" type="number" step="0.5" v-model="form.scope" class="input-margin" style="width: 50px;">
              <label for="scope">m</label>
              <el-slider class="slider-width" v-model="form.scope" :max="1000" :step="0.5"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">touch_app</p><p>Déclencheur</p>
              <el-tooltip placement="top">
                <template #content>Ce paramètre définit si les événements d’un point d'intérêt (ouverture de la galerie de médias, lecture de médias vidéo ou son) sont déclenchés par la position de l’utilisateur (emplacement = lorsqu’il ou elle entre dans le rayon) ou si il ou elle doit en plus cliquer sur l’interface qui s’affiche à l’écran. </template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col2 border end-border">
              <el-select v-model="form.trigger_mode" class="input-margin input-full-size-element">
                <el-option
                  v-for="item in trigger_option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.value === 'touch'"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="display: flex" v-for="(element, index) in form.metadata" :key="index">
            <div class="col-main border"><p class="material-symbols-sharp">database</p><input v-model="element.key" type="text" class="metadata-title">
              <el-tooltip placement="top">
                <template #content> {{ element.description }} </template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col3 border"><input v-model="element.value" type="text" class="input-margin input-full-size-element"></div>
            <div class="col3 border end-border"><input v-model="element.description" type="text" class="input-margin input-full-size-element"><p class="material-symbols-sharp" @click="deleteGeneralAttribute(index)">delete_forever</p></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp link">add</p><p class="link" @click="createGeneralAttribute()">créer un attribut</p>
              <el-tooltip placement="top">
                <template #content>Cette option permet de créer des champs personnalisés et de les remplir avec une valeur (de type texte). Les attributs ainsi créés seront visibles sur la table de données du biovers.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col2 border end-border" />
          </div>
        </el-collapse-item>
        <el-collapse-item title="Symbole" name="2">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">location_on</p><p>symbol</p>
              <el-tooltip placement="top">
                <template #content> le fichier chargé sera affiché comme symbole (3D) du point d’intérêt. Celui-ci peut-être une image, une vidéo ou un modèle 3D. Les formats suivants sont supportés: .png, .jpg, .svg, .gltf, .glb, .mp4</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
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
            <el-tooltip placement="top">
                <template #content>Si ce paramètre est sélectionné, le média tournera de façon à toujours faire face à l’utilisateur.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
               <div class="col4 border end-border"><input id="wireframe" type="checkbox" v-model="form.symbol.wireframe"><p class="material-symbols-sharp">grid_4x4</p><label for="wireframe">wireframe</label>
                <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
          </div>

          <div :class="{disabled: mediaARCheck }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">replay</p><p>lecture</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col3 border"><input id="symbol_autoplay" type="checkbox" v-model="form.symbol.autoplay" :disabled="mediaARCheck"><label for="symbol_autoplay">autoplay</label>
            <el-tooltip placement="top">
                <template #content>Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu lorsque l’utilisateur entre dans le périmètre du « scope » (défini dans les paramètre globaux du point d’intérêt), ou si la lecture est déclenchée lorsque l’utilisateur entre dans le radius du point d’intérêt (défini dans le style extérieur du point d’intérêt).</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col3 border end-border"><input id="symbol_loop" type="checkbox" v-model="form.symbol.loop" :disabled="mediaARCheck"><label for="symbol_loop">loop</label>
            <el-tooltip placement="top">
                <template #content>Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu en boucle. </template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">photo_size_select_small</p><p>échelle</p>
            <el-tooltip placement="top">
                <template #content>le média du symbole est affiché à l’échelle contenue dans le fichier. Cette valeur permet de redimensionner le média d’un facteur égal à la valeur choisie.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.symbol.scale" class="input-margin" step="0.1" style="width: 50px;">
              <el-slider class="slider-width" v-model="form.symbol.scale" :max="10" :step="0.1"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">merge</p><p>position</p>
            <el-tooltip placement="top">
              <template #content></template>
              <p class="material-symbols-sharp">help</p>
            </el-tooltip></div>
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
            <el-tooltip placement="top">
                <template #content>cette valeur est un facteur d’amplitude pour créer une animation sinusoïdale du symbole sur l’axe vertical. Si la valeur est à 0, il n’y a pas d’animation.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.symbol.amplitude" class="input-margin" style="width: 50px;">
              <el-slider class="slider-width" v-model="form.symbol.amplitude" :max="1" :step="0.01"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">music_note</p><p>audio</p>
            <el-tooltip placement="top">
                <template #content>le fichier chargé agira comme symbole sonore du point d'intérêt. Celui-ci peut-être utilisé en combinaison ou à la place d’un symbole visuel. Les formats suivants sont supportés: .mp3, .m4a, .wav</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col4 border">
              <input type="file" name="file" class="input-margin" accept=".mp3, .m4a, .wav" @change="handleFileUploadSymbolAudio"/>
            </div>
            <div class="col4 border end-border"><input id="audio_autoplay" type="checkbox" v-model="form.symbol.audio_autoplay"><label for="audio_autoplay">autoplay</label>
            <el-tooltip placement="top">
                <template #content>Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu lorsque l’utilisateur entre dans le périmètre du « scope » (défini dans les paramètre globaux du point d’intérêt), ou si la lecture est déclenchée lorsque l’utilisateur entre dans le radius du point d’intérêt (défini dans le style extérieur du point d’intérêt).</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col4 border end-border"><input id="audio_loop" type="checkbox" v-model="form.symbol.audio_loop"><label for="audio_loop">loop</label>
            <el-tooltip placement="top">
                <template #content>Pour les symboles utilisant un média dynamique (vidéo, gltf animé), ce paramètre définit si le média est lu en boucle. </template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
          </div>
          <div :class="{disabled: !form.symbol.audio_autoplay}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">noise_aware</p><p>portée de l'audio</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.symbol.audio_distance" class="input-margin" step="0.5" style="width: 50px;" :disabled="!form.symbol.audio_autoplay">
              <el-slider class="slider-width" v-model="form.symbol.audio_distance" :step="0.5" :max="1000" :disabled="!form.symbol.audio_autoplay"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">map</p><p>symbole carte</p>
            <el-tooltip placement="top">
                <template #content> ce fichier sera affiché sur la carte 2D mobile et desktop</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input type="file" name="file" class="input-margin" accept=".png, .jpg, .svg" @change="handleFileUploadSymbol"/>
            </div>
            <!--div class="col3 border end-border"><input id="symbol_vis" type="checkbox" v-model="form.symbol.is_visible"><label for="symbol_vis">visible</label></div-->
          </div>
        </el-collapse-item>
        <el-collapse-item title="Rayon" name="3">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">circle</p><p>forme</p>
            <el-tooltip placement="top">
                <template #content>Ce paramètre définit la forme du radius: anneau, cercle, demi-sphère, sphère</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col3 border">
              <el-select v-model="form.style_type" class="input-margin input-full-size-element">
                <el-option
                  v-for="item in style_option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="col3 border end-border" :class="{disabled: form.style_type == 'sphere' || form.style_type == 'hemisphere'}">
              <p class="material-symbols-sharp">expand</p>
              <label for="extrusion">extrusion</label>
              <el-tooltip placement="top">
                <template #content>Si le type de forme est 'cercle', ce paramètre définit la hauteur de l’extrusion pour la transformation en cylindre.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
              <input id="extrusion" type="number" v-model="form.extrusion" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;" :disabled="form.style_type == 'sphere' || form.style_type == 'hemisphere'">
              <label for="extrusion">m</label>
              <el-slider class="slider-width-small" v-model="form.extrusion" :max="100" :step="0.1" :disabled="form.style_type == 'sphere' || form.style_type == 'hemisphere'"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">share_location</p><p>rayon</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input id="radius" type="number" class="input-margin" v-model="form.radius" style="width: 50px;">
              <label for="radius">m</label>
              <el-slider class="slider-width" v-model="form.radius" :max="100" :step="0.1"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">merge</p><p>position</p>
              <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col4 border">
              <p class="material-symbols-sharp">north_east</p>
              <label for="position_symbole_x">distance</label>
              <input id="position_symbole_x" type="number" v-model="form.position.distance" step="0.1" style="width: 50px; padding-left: 5px; padding-right: 5px;">
              <el-slider class="slider-width-position" v-model="form.position.distance" :max="10" :step="0.1" :min="-10"/>
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
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col4 border"><p class="material-symbols-sharp">line_weight</p><input id="epaisseur" step="0.01" type="number" v-model="form.style_stroke_width" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'" style="width: 50px"><el-slider class="slider-width-position" v-model="form.style_stroke_width" :max="10"  :step="0.01" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"/></div>
            <div class="col4 border"><p class="material-symbols-sharp">colorize</p><input id="stroke_color" type="color" v-model="form.stroke_color" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"><label for="stroke_color">{{ form.stroke_color }}</label></div>
            <div class="col4 border end-border"><p class="material-symbols-sharp">opacity</p><input id="stroke_opacity" type="number" v-model="form.stroke_opacity" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'" style="width:50px"><label for="stroke_opacity">%</label><el-slider class="slider-width-position" v-model="form.stroke_opacity" :max="100" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"/></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">format_color_fill</p> <p>reamplissage</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col4 border"><input id="wireframe" type="checkbox" v-model="form.wireframe"><p class="material-symbols-sharp">grid_4x4</p> <label for="wireframe">wireframe</label>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col4 border"><p class="material-symbols-sharp">colorize</p><input id="fill_color" type="color" v-model="form.fill_color"><label for="fill_color">{{ form.fill_color }}</label></div>
            <div class="col4 border end-border"><p class="material-symbols-sharp">opacity</p><input id="fill_opacity" type="number" v-model="form.fill_opacity" style="width: 50px;"><label for="fill_opacity">%</label><el-slider class="slider-width-position" v-model="form.fill_opacity" :max="100"/></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">animation</p> <p>animation</p>
            <el-tooltip placement="top">
                <template #content>cette valeur est un facteur d’amplitude pour créer une animation sinusoïdale du rayon. Si la valeur est à 0, il n’y a pas d’animation.</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input type="number" v-model="form.amplitude" class="input-margin" style="width: 50px;">
              <el-slider class="slider-width" v-model="form.amplitude" :max="1"  :step="0.01"/>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="full-button actions-button">
        <button class="full-button button-gray"><p class="material-symbols-sharp">bookmark</p> Définir comme paramètres par défaut</button>
      </div>
      </div>
    </div>
    <div v-show="tab === 1" class="collapse">
      <div class="container-layout">
      <el-collapse>
        <el-collapse-item v-for="(element, index) in form.medias" :key="index" :title="`Media ${index + 1}`" :name="index">
          <template #title>
          Media {{index + 1}}<p class="material-symbols-sharp delete-font" @click="removeMedia(index)">delete</p>
        </template>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">add_photo_alternate</p><p>média</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col4 border end-border">
              <input type="file" name="file" class="input-margin" accept=".png, .jpg, .svg, .gltf, .glb, .mp3, m4a, .wav, .mp4, .m4v" @change="handleFileUploadMedia($event, index)" :disabled="element.text !== ''"/>
            </div>
            <div class="col4 border"  :class="{disabled: element.text == '' && element.media_type == '' }"><input :id="`is_visible_in_radius${index}`" type="checkbox" v-model="element.is_visible_in_radius" :disabled="element.text == '' && element.media_type == ''"><label :for="`is_visible_in_radius${index}`">visible uniquement dans le rayon</label>
            <el-tooltip placement="top">
                <template #content>Si coché le média ne sera visible que dans le rayon d'interaction, sinon il sera visible dés que la distance de visibilité du point d'interêt est atteinte</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col4 border end-border" :class="{disabled: element.text == '' && element.media_type == '' }"><input :id="`is_facing${index}`" type="checkbox" v-model="element.is_facing" :disabled="element.text == '' && element.media_type == ''"><label for="is_facing">face à la caméra</label>
              <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
          </div>
          <div :class="{disabled: element.media_type !== '' }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">short_text</p><p>text</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip>
            </div>
            <div class="col2 border end-border"><textarea id="text" type="textarea" class="input-margin" v-model="element.text" :disabled="element.media_type !== ''"/></div>
          </div>
          <div :class="{disabled: element.media_type === '' }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">replay</p><p>lecture</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col3 border"><input id="media_autoplay" type="checkbox" v-model="element.autoplay" :disabled="element.media_type === ''"><label for="media_autoplay">autoplay</label>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col3 border end-border"><input id="media_loop" type="checkbox" v-model="element.loop" :disabled="element.media_type === ''"><label for="media_loop">loop</label>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">photo_size_select_small</p><p>échelle</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border">
              <input type="number" v-model="element.scale" class="input-margin" step="0.1" style="width: 50px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width" v-model="element.scale" :max="10" :step="0.1" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">merge</p><p>position</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
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
            <el-tooltip placement="top">
                <template #content>{{ meta.description }}</template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col3 border"><input v-model="meta.value" type="text" class="input-margin input-full-size-element"></div>
            <div class="col3 border end-border"><input v-model="meta.description" type="text" class="input-margin input-full-size-element"><p class="material-symbols-sharp" @click="deleteMetadata(index)">delete_forever</p></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp link">add</p><p class="link" @click="addMetadata(index, indexMeta)">créer un attribut</p>
            <el-tooltip placement="top">
                <template #content></template>
                <p class="material-symbols-sharp">help</p>
              </el-tooltip></div>
            <div class="col2 border end-border" />
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="full-button actions-button">
        <button class="full-button button-gray" @click="addMedia"><p class="material-symbols-sharp">add</p> Ajouter un média</button>
      </div>
      </div>
    </div>
    <div v-if="isEdit" class="full-button actions-button">
      <button class="full-button button-red"><p class="material-symbols-sharp">wrong_location</p> Supprimer le point d'intérêt</button>
    </div>
    <div v-else class="full-button actions-button">
      <button class="full-button button-dark-gray" @click="$emit('closeDialog')"><p class="material-symbols-sharp">undo</p>Annuler</button>
    </div>
    <div class="full-button actions-button">
      <button class="full-button button-blue" @click="isEdit ? undefined : createPoi()" ><p class="material-symbols-sharp">where_to_vote</p> Enregistrer les modifications</button>
    </div>
  </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TheAframeEditor from '../../../TheAframe/TheAframeEditor.vue';
import AframeMedia from '../../../TheAframe/AframeMedia.vue';
import ThePoiEditorHeader from './ThePoiEditorHeader.vue';

import { savePoi, saveSymbol, saveMedia } from '../../../../utils/api.js';


export default {
  name: 'App',
  components: { TheAframeEditor, ThePoiEditorHeader, AframeMedia },
  props: {
    poi: Object,
    coordinate: Object,
    showDialog: Boolean,
    isEdit: Boolean,
  },
  emits: ['closeDialog'],
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;
    },
    coordinate(newVal) {
      this.form.coordinate.lat = newVal.lat;
      this.form.coordinate.long = newVal.lng;
    },
  },
  data() {
    return {
      tab: 0,
      dialogVisible: false,
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
      form: {
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
          audio_distance: 3,
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
        radius: 0,
        position: {
          distance: 0,
          elevation: 0,
          rotation: 0,
        },
        style_stroke_width: 0.1,
        stroke_color: '#FF0000',
        stroke_opacity: 100,
        fill_type: false,
        fill_color: '#FFFFFF',
        fill_opacity: 100,
        amplitude: 0,
        wireframe: false,
        metadata: [],
        medias: [],
      },
    }
  },
  methods: {
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
      this.form.medias.push(JSON.parse(JSON.stringify(this.default_media)));
    },
    removeMedia(index) {
      this.form.medias.splice(index, 1);
    },
    addMetadata(index) {
      this.form.medias[index].metadata.push({
        key: '',
        value: '',
        description: '',
      })
    },
    deleteMetadata(index, indexMeta) {
      this.form.medias[index].metadata.splice(indexMeta, 1);
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
        this.form.medias[index].content = files[0];
        const lastDot = this.form.medias[index].content.name.lastIndexOf('.');
        const ext = this.form.medias[index].content.name.substring(lastDot + 1);
        this.form.medias[index].url = URL.createObjectURL(this.form.medias[index].content);
        this.form.medias[index].media_type = ext;
      } else {
        this.form.medias[index].url = '';
        this.form.medias[index].media_type = '';
      }
    },
    async createPoi() {
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
      if (this.form.medias.length > 0) {
        for (let i = 0; i < this.form.medias.length; i++) {
            const formData = new FormData();
            formData.append('file', this.form.medias[i].content);
            const path = await saveMedia(formData);
            if (path.data) {
                this.form.medias[i].url = path.data;
            }
        } 
      }
      this.form.biovers = this.getCurrentBioverId;
      const newPoi = await savePoi(this.form);
      this.addNewPoi(newPoi.data);
      this.showCreationDialog = false;
      //this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['addNewPoi']),
  },
  computed: {
    getTitle() {
      return this.isEdit ? "éditer point d'intérêt" : "nouveau point d'intérêt";
    },
    mediaARCheck() {
      const mediaType = this.form.symbol.media_type_ar;
      return !(mediaType === 'mp4' || mediaType === 'm4a');
    },
    ...mapGetters('biovers', ['getCurrentBioverId'])
  },
}
</script>

<style>
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

.col-main {
  width: 25%;
  display: flex;
  align-items: center;
  padding-left: 6px;
}

.col2 {
  width: 75%;
  display: flex;
  align-items: center;
}

.col3 {
  width: calc((100% - 25%) / 2);
  display: flex;
  align-items: center;
}

.col4 {
  width: 25%;
  display: flex;
  align-items: center;
}

.col5 {
  width: calc((100% - 25%) / 4);
  display: flex;
  align-items: center;
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
  width: calc(100% - 130px);
  padding-left: 23px;
}

.slider-width-position {
  width: calc(100% - 170px);
  padding-left: 23px;
}

.slider-width-small {
  width: calc(100% - 200px);
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
  height: calc(100vh - 40vh - 85px);
}

.collapse {
  border: 2px solid black;
  height: calc(100vh - 40vh - 255px);
  overflow: auto;
}

.actions-button {
  padding-top: 10px;
  padding-bottom: 10px;
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
</style>
