<template>
  <div v-if="dialogVisible" class="overlay" @click="cancelDialog = true"></div>
  <div v-if="dialogVisible" class="modal-edition">
    <DialogHeader :title="'Modifier point'" :logo="'edit_location_alt'" @close="cancelDialog = true" />
    <div class="embedded">
      <the-aframe-editor
        :visibilityScope="form.scope"

        :shapeType="form.style_type"
        :shapeRadius="form.radius"
        :shapeY="form.elevation"
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
          :media="m.display_url"
          :mediaType="m.media_type"
          :mediaLoop="m.loop"
          :scale="m.scale"
          :positionX="m.distance"
          :positionY="m.elevation"
          :positionRotation="m.rotation"
          :isVisibleInRadius="m.is_visible_in_radius"
          :facing="m.is_facing"
          :text="m.text"
        ></aframe-media>
      </the-aframe-editor>
    </div>
    <div class="edition-layout collapse">
      <div class="container-layout">
        <Accordeon class="margin-accordeon" :header="'Général'" :could-update-header="false" :length="6 + form.metadata.length" :should-be-open="true" :image="'settings'">
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">my_location</p><p class="col-main-text">Coordonnées</p>
              <p ref="coordinate" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'coordinate')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'coordinate'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'coordinate'"  @mouseleave="tooltipElement = null">Les coordonnées WGS84 ou se situe le centre du point d’intérêt.</p>
              </div>
            </div>
            <div class="col4 border"><label for="long" class="margin-left-constraint">Longitude</label><input id="long" class="input-full-size-element remove-input-border remove-stepper" type="number" v-model="form.coordinate.long" min="-180" max="180" @change="longitudeValidation()"></div>
            <div class="col4 border"><label for="lat" class="margin-left-constraint">Latitude</label><input id="lat" class="input-full-size-element remove-input-border remove-stepper" type="number" v-model="form.coordinate.lat" min="-90" max="90" @change="latitudeValidation()"></div>
            <div class="col4 border end-border"><label for="alt" class="margin-left-constraint">Altitude</label><input id="alt" class="input-full-size-element remove-input-border remove-stepper" type="number" v-model="form.coordinate.alt"></div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">short_text</p><p class="col-main-text">Titre</p>
              <p ref="title" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'title')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'title'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'title'"  @mouseleave="tooltipElement = null"> le titre du point d’intérêt et ses paramètres d’affichage. </p>
              </div>
            </div>
            <div class="col2 border end-border"><input id="title" type="text" class="input-margin remove-input-border" v-model="form.title" placeholder="Entrer votre title"></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp description-transform">short_text</p><p class="col-main-text">description</p>
              <p ref="description" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'description')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'description'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'description'"  @mouseleave="tooltipElement = null">sous-titre ou description du point d’intérêt.</p>
              </div>
            </div>
            <div class="col2 border end-border"><input id="description" type="text" class="input-margin remove-input-border" v-model="form.subtitle" placeholder="Entrer votre description"></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">map</p><p class="col-main-text">symbole carte</p>
            <p ref="map" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'map')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'map'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'map'"  @mouseleave="tooltipElement = null"> ce fichier sera affiché sur la carte 2D mobile et desktop</p>
              </div></div>
            <div class="col2 border end-border">
              <button class="input-button" @click="inputMap">
                <p class="material-symbols-sharp">cloud_upload</p><p>Choisir</p>
                <input ref="map-input" type="file" name="file" class="input-margin" accept=".png, .jpg, .svg" @change="handleFileUploadSymbol" style="display: none"/>
              </button>
              <p>{{ symbolFile.name }}</p><p v-if="symbolFile.name && symbolFile.name !== ''" class="material-symbols-sharp clickable" @click="removeMapUrl">cancel</p>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">visibility</p><p class="col-main-text">porté</p>
              <p ref="visibility" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'visibility')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'visibility'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'visibility'"  @mouseleave="tooltipElement = null"> Lorsque la distance entre la position de l’utilisateur et celle d’un point/trace est inférieur à cette valeur, celui-ci est affiché dans la scene A-Frame. La lecture de certains médias (son, vidéo, gltf animés) peuvent également</p>
              </div>
            </div>
            <div class="col2 border end-border">
              <input id="scope" type="number" step="0.5" v-model="form.scope" class="input-margin remove-input-border remove-stepper input-number-right-align" style="width: 40px;">
              <label for="scope">m</label>
              <el-slider class="slider-width" v-model="form.scope" :max="1000" :step="0.5"/>
            </div>
          </div>
           <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">circle</p><p class="col-main-text">type</p>
             <p ref="forme" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'forme')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'forme'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'forme'"  @mouseleave="tooltipElement = null">Ce paramètre définit la forme du radius: anneau, cercle, demi-sphère, sphère</p>
              </div></div>
            <div class="col4 border">
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
            <div class="col4 border">
              <p class="material-symbols-sharp">north</p>
              <input id="media_symbole_z" type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="form.elevation" step="0.1" style="width: 33px;">
              <el-slider class="slider-width-position" v-model="form.elevation" :max="10" :step="0.1" :min="-10"/>
            </div>
            <div class="col4 border end-border" :class="{disabled: form.style_type == 'sphere' || form.style_type == 'hemisphere'}">
              <p class="material-symbols-sharp">expand</p>
              <label for="extrusion">extrusion</label>
               <p ref="style_type" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'style_type')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'style_type'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'style_type'"  @mouseleave="tooltipElement = null">Si le type de forme est 'cercle', ce paramètre définit la hauteur de l’extrusion pour la transformation en cylindre.</p>
              </div>
              <input id="extrusion" class="input-margin remove-input-border remove-stepper input-number-right-align" type="number" v-model="form.extrusion" step="0.1" style="width: 36px" :disabled="form.style_type == 'sphere' || form.style_type == 'hemisphere'">
              <label for="extrusion">m</label>
              <el-slider class="slider-width-small" v-model="form.extrusion" :max="100" :step="0.1" :disabled="form.style_type == 'sphere' || form.style_type == 'hemisphere'"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">share_location</p><p class="col-main-text">rayon</p>
            <p ref="share_location" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'share_location')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'share_location'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'share_location'"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col2 border end-border">
              <input id="radius" type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="form.radius" style="width: 40px;">
              <label for="radius">m</label>
              <el-slider class="slider-width" v-model="form.radius" :max="100" :step="0.1"/>
            </div>
          </div>
          <div :class="{disabled: form.style_type == 'sphere' || form.style_type == 'hemisphere'}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">border_color</p><p class="col-main-text">contour</p>
            <p ref="contour" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'contour')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'contour'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'contour'"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col4 border"><p class="material-symbols-sharp">line_weight</p><input id="epaisseur" class="input-margin remove-input-border remove-stepper input-number-right-align" step="0.01" type="number" v-model="form.style_stroke_width" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'" style="width: 36px"><el-slider class="slider-width-position" v-model="form.style_stroke_width" :max="10"  :step="0.01" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"/></div>
            <div class="col4 border"><p class="material-symbols-sharp">colorize</p><input id="stroke_color" type="color" v-model="form.stroke_color" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"><label for="stroke_color">{{ form.stroke_color }}</label></div>
            <div class="col4 border end-border"><p class="material-symbols-sharp">opacity</p><input id="stroke_opacity" class="input-margin remove-input-border remove-stepper input-number-right-align" type="number" v-model="form.stroke_opacity" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'" style="width:32px"><label for="stroke_opacity">%</label><el-slider class="slider-width-opacity" v-model="form.stroke_opacity" :max="100" :disabled="form.style_type === 'sphere' || form.style_type === 'hemisphere'"/></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">format_color_fill</p> <p class="col-main-text">reamplissage</p>
            <p ref="remplissage" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'remplissage')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'remplissage'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'remplissage'"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col4 border"><input id="wireframe" type="checkbox" v-model="form.wireframe"><p class="material-symbols-sharp" style="margin-left: 2px;">grid_4x4</p> <label for="wireframe">wireframe</label>
            <p ref="fill_wireframe" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'fill_wireframe')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'fill_wireframe'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'fill_wireframe'"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
            <div class="col4 border"><p class="material-symbols-sharp">colorize</p><input id="fill_color" type="color" v-model="form.fill_color"><label for="fill_color">{{ form.fill_color }}</label></div>
            <div class="col4 border end-border"><p class="material-symbols-sharp">opacity</p><input id="fill_opacity" class="input-margin remove-input-border remove-stepper input-number-right-align" type="number" v-model="form.fill_opacity" style="width: 32px;"><label for="fill_opacity">%</label><el-slider class="slider-width-opacity" v-model="form.fill_opacity" :max="100"/></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">animation</p> <p class="col-main-text">animation</p>
            <p ref="anim" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'anim')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'anim'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'anim'"  @mouseleave="tooltipElement = null">cette valeur est un facteur d’amplitude pour créer une animation sinusoïdale du rayon. Si la valeur est à 0, il n’y a pas d’animation.</p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="form.amplitude" style="width: 40px; margin-right: 20px;">
              <el-slider class="slider-width" v-model="form.amplitude" :max="1"  :step="0.01"/>
            </div>
          </div>
          <div style="display: flex" v-for="(element, index) in form.metadata" :key="index">
            <div class="col-main border"><p class="material-symbols-sharp">database</p><input v-model="element.key" type="text" class="metadata-title remove-input-border" placeholder="Entrer nom du métadata">
              <p :ref="`${element.key}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, `${element.key}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `${element.key}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `${element.key}`"  @mouseleave="tooltipElement = null"> {{ element.description }} </p>
              </div>
            </div>
            <div class="col3 border"><input v-model="element.value" type="text" class="input-margin input-full-size-element remove-input-border" placeholder="Entrer valeur du métadata"></div>
            <div class="col3 border end-border"><input v-model="element.description" type="text" class="input-margin input-full-size-element remove-input-border" placeholder="Entrer description du métadata"><p class="material-symbols-sharp" @click="deleteGeneralAttribute(index)">delete_forever</p></div>
          </div>
          <div style="display: flex; border-bottom: 1px solid black;">
            <div class="col-main border"><p class="material-symbols-sharp link">add</p><p class="link" @click="createGeneralAttribute()">créer un attribut</p>
              <p ref="attribut" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'attribut')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'attribut'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'attribut'"  @mouseleave="tooltipElement = null">Cette option permet de créer des champs personnalisés et de les remplir avec une valeur (de type texte). Les attributs ainsi créés seront visibles sur la table de données du biovers.</p>
              </div>
            </div>
            <div class="col2 border end-border" />
          </div>
        </Accordeon>
        <div v-for="(element, index) in form.media" :key="index" :title="`Media ${index + 1}`" :name="index">
        <Accordeon class="margin-accordeon" :header="element.name" :could-update-header="true" :length="5 + element.metadata.length" :should-be-open="true" :could-delete="true" @update="updateMediaName($event, index)" @delete="removeMedia(index)" :image="'image'">
          <div :class="{disabled: element.media_type !== '' }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">text_fields</p><p class="col-main-text">text</p>
            <p :ref="`short_text${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `short_text${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `short_text${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `short_text${index}`"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
            <div class="col2 border end-border"><textarea id="text" type="textarea" class="input-margin remove-input-border" v-model="element.text" :disabled="element.media_type !== ''"/></div>
          </div>
          <div style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">add_photo_alternate</p><p class="col-main-text">média</p>
            <p :ref="`add_photo_alternate_${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `add_photo_alternate_${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `add_photo_alternate_${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `add_photo_alternate_${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col3 border end-border">
              <button class="input-button" :class="{'disabled-button': element.text !== ''}" @click="inputMedia(index)">
                <p class="material-symbols-sharp">cloud_upload</p><p>Choisir</p>
                 <input :ref="`media-input-${index}`" type="file" name="file" class="input-margin" style="display: none" accept=".png, .jpg, .svg, .gltf, .glb, .mp3, .m4a, .wav, .mp4, .m4v" @change="handleFileUploadMedia($event, index)"/>
              </button>
              <p>{{ element.media_name }}</p><p v-if="element.media_name && element.media_name !== ''" class="material-symbols-sharp clickable" @click="removeMediaUrl(index)">cancel</p>
             
            </div>
            <div class="col3 border end-border" :class="{disabled: element.text == '' && element.media_type == '' }"><input :id="`is_facing${index}`" type="checkbox" v-model="element.is_facing" :disabled="element.text == '' && element.media_type == ''"><label for="is_facing">face à la caméra</label>
              <p :ref="`is_facing${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `is_facing${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `is_facing${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `is_facing${index}`"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
          </div>
          <div :class="{disabled: element.media_type === '' }" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">replay</p><p class="col-main-text">lecture</p>
            <p :ref="`replay${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `replay${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `replay${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `replay${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col3 border"><input id="media_autoplay" type="checkbox" v-model="element.autoplay" :disabled="element.media_type === ''"><label for="media_autoplay">autoplay</label>
              <p :ref="`media_autoplay${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `media_autoplay${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `media_autoplay${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `media_autoplay${index}`"  @mouseleave="tooltipElement = null"></p>
              </div>
            </div>
            <div class="col3 border end-border"><input id="media_loop" type="checkbox" v-model="element.loop" :disabled="element.media_type === ''"><label for="media_loop">loop</label>
            <p :ref="`media_loop${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `media_loop${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `media_loop${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `media_loop${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">visibility</p><p class="col-main-text">visible</p>
            <p :ref="`add_photo_alternate_${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `add_photo_alternate_${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `add_photo_alternate_${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `add_photo_alternate_${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col3 border"><input :id="`is_visible_out_radius${index}`" type="checkbox" v-model="element.is_visible_out_radius" :disabled="element.text === '' && element.media_type === ''"><label :for="`is_visible_out_radius${index}`">hors du rayon</label>
            <p :ref="`is_visible_out_radius${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `is_visible_out_radius${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `is_visible_out_radius${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `is_visible_out_radius${index}`"  @mouseleave="tooltipElement = null">Si coché le média ne sera visible que dans le rayon d'interaction, sinon il sera visible dés que la distance de visibilité du point d'interêt est atteinte</p>
              </div>
            </div>
            <div class="col3 border"><input :id="`is_visible_in_radius${index}`" type="checkbox" v-model="element.is_visible_in_radius" :disabled="element.text === '' && element.media_type === ''"><label :for="`is_visible_in_radius${index}`">dans le rayon</label>
            <p :ref="`is_visible_in_radius${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `is_visible_in_radius${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `is_visible_in_radius${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `is_visible_in_radius${index}`"  @mouseleave="tooltipElement = null">Si coché le média ne sera visible que dans le rayon d'interaction, sinon il sera visible dés que la distance de visibilité du point d'interêt est atteinte</p>
              </div>
            </div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">photo_size_select_small</p><p class="col-main-text">échelle</p>
            <p :ref="`photo_size_select${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `photo_size_select${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `photo_size_select${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `photo_size_select${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="element.scale" step="0.1" style="width: 40px; margin-right: 20px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width" v-model="element.scale" :max="10" :step="0.1" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">merge</p><p class="col-main-text">position</p>
            <p :ref="`merge${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `merge${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `merge${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `merge${index}`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col5 border">
              <p class="material-symbols-sharp">north_east</p>
              <input id="media_symbole_x" type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="element.distance" style="width: 30px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width-position" v-model="element.distance" :max="10" :step="0.1" :min="-10" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
            <div class="col5 border">
              <p class="material-symbols-sharp">360</p>
              <input id="media_symbole_y" type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="element.rotation" style="width: 30px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width-position" v-model="element.rotation" :max="359" :step="1" :min="0" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
            <div class="col5 border"> 
              <p class="material-symbols-sharp">north</p>
              <input id="media_symbole_z" type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="element.elevation" step="0.1" style="width: 30px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width-position" v-model="element.elevation" :max="10" :step="0.1" :min="-10" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
            <div class="col5 border end-border">
              <p class="material-symbols-sharp">flip_camera_android</p>
              <input id="media_symbole_y" type="number" class="input-margin remove-input-border remove-stepper input-number-right-align" v-model="element.orientation" style="width: 30px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width-position" v-model="element.orientation" :max="359" :step="1" :min="0" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
          </div>
          <div :class="{disabled: element.text === '' && element.media_type === ''}" style="display: flex">
            <div class="col-main border"><p class="material-symbols-sharp">animation</p> <p class="col-main-text">animation</p>
            <p ref="anim" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event, 'anim')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === 'anim'" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = 'anim'"  @mouseleave="tooltipElement = null">cette valeur est un facteur d’amplitude pour créer une animation sinusoïdale du rayon. Si la valeur est à 0, il n’y a pas d’animation.</p>
              </div></div>
            <div class="col2 border end-border">
              <input type="number" v-model="element.amplitude" class="input-margin remove-input-border remove-stepper input-number-right-align" style="width: 40px; margin-right: 20px;" :disabled="element.text === '' && element.media_type === ''">
              <el-slider class="slider-width" v-model="element.amplitude" :max="1"  :step="0.01" :disabled="element.text === '' && element.media_type === ''"/>
            </div>
          </div>
          <div style="display: flex" :class="{disabled: element.text === '' && element.media_type === ''}" v-for="(meta, indexMeta) in element.metadata" :key="indexMeta">
            <div class="col-main border"><p class="material-symbols-sharp">database</p><input v-model="meta.key" type="text" class="metadata-title remove-input-border" placeholder="Entrer nom du métadata" :disabled="element.text === '' && element.media_type === ''">
            <p :ref="`${meta.key}-${index}`" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  `${meta.key}-${index}`)" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `${meta.key}-${index}`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `${meta.key}-${index}`"  @mouseleave="tooltipElement = null">{{ meta.description }}</p>
              </div></div>
            <div class="col3 border"><input v-model="meta.value" type="text" class="input-margin input-full-size-element remove-input-border" placeholder="Entrer valeur du métadata" :disabled="element.text === '' && element.media_type === ''"></div>
            <div class="col3 border end-border"><input v-model="meta.description" type="text" class="input-margin input-full-size-element remove-input-border" placeholder="Entrer description du métadata" :disabled="element.text === '' && element.media_type === ''"><p class="material-symbols-sharp" @click="deleteMetadata(index)">delete_forever</p></div>
          </div>
          <div style="display: flex; border-bottom: 1px solid black;" :class="{disabled: element.text === '' && element.media_type === ''}">
            <div class="col-main border"><p class="material-symbols-sharp link">add</p><p class="link" @click="element.text === '' && element.media_type === '' ? '' : addMetadata(index, indexMeta)">créer un attribut</p>
            <p ref="add" class="material-symbols-sharp tooltip-font" @mouseenter="openTooltip($event,  'add')" @mouseleave="tooltipElement = null">help</p>
              <div data-role="tooltip" v-show="tooltipElement === `add`" :style="tooltipPosition">
                <p @mouseenter="tooltipElement = `add`"  @mouseleave="tooltipElement = null"></p>
              </div></div>
            <div class="col2 border end-border" />
          </div>
        </Accordeon>
      </div>
      <div class="full-button actions-button">
        <button class="full-button button-orange" @click="addMedia"><p class="material-symbols-sharp">add</p> Ajouter un média</button>
      </div>
      <div class="full-button actions-button">
        <button class="full-button button-gray" @click="savePreferences"><p class="material-symbols-sharp">bookmark</p> Définir comme paramètres par défaut</button>
      </div>
      <div class="full-button actions-button">
        <button class="full-button button-red" @click="deleteDialog = true"><p class="material-symbols-sharp">wrong_location</p> Supprimer le point d'intérêt</button>
      </div>
      <div class="full-button actions-button">
        <button class="full-button button-blue" @click="updatePoi()" ><p class="material-symbols-sharp">where_to_vote</p> Enregistrer les modifications</button>
      </div>
    </div>
  </div>
  <Notification v-if="shouldDisplayNotification" :data-type="'success'">Vos préférences ont été enregistrer</Notification>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer ces point d'intérêts?" @closeDialog="deleteDialog = false" @validate="deletePoi()" />
  <CancelConfirmation v-if="cancelDialog" :dialogVisible="cancelDialog" title="Voulez-vous enregistrer les modifications?" @close="close()" @closeDialog="cancelDialog = false" @validate="updatePoi()" />

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

import { updatePoi, deletePoi, saveSymbol, saveMedia, getSymbolUrl, getIcon, getMediaUrl, getContent, getSymbolAudiUrl, saveEvent } from '../../../../utils/api.js';


export default {
  name: 'App',
  components: { TheAframeEditor, AframeMedia, DialogHeader, DeleteConfirmation, CancelConfirmation, Accordeon, Notification },
  props: {
    poi: Object,
    coordinate: Object,
    showDialog: Boolean,
    bioversId: Number,
  },
  emits: ['closeDialog', 'closeAfterSave'],
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;
      if (this.dialogVisible) {
            this.setupEdition();
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
        name: '',
        content: undefined,
      },
      default_media: {
        name: '',
        text: '',
        url: '',
        display_url: '',
        media_name: '',
        media_type: '',
        content: undefined,
        is_visible_in_radius: true,
        is_visible_out_radius: true,
        is_facing: true,
        autoplay: true,
        loop: false,
        scale: 1,
        distance: 0,
        elevation: 0,
        rotation: 0,
        orientation: 0,
        amplitude: 0,
        metadata: [],
      },
      defaultForm: {
        title: '',
        subtitle: '',
        coordinate: {
          long: 0,
          lat: 0,
          alt: 0,
        },
        scope: 50,
        trigger_mode: 'location',
        style_type: 'circle',
        extrusion: 0,
        radius: 2,
        elevation: 0,
        style_stroke_width: 0.1,
        stroke_color: '#FFFFFF',
        stroke_opacity: 40,
        fill_type: false,
        fill_color: '#FFFFFF',
        fill_opacity: 20,
        amplitude: 0,
        wireframe: false,
        map_url: '',
        map_media_type: '',
        metadata: [],
        media: [],
      },
      form: {},
    }
  },
  methods: {
    inputMap() {
      this.$refs['map-input'].click();
    },
    inputMedia(index) {
      if (this.form.media[index].text === '') {
        this.$refs[`media-input-${index}`][0].click();
      }
    },
    removeMapUrl() {
      this.symbolFile = {
        url: '',
        name: '',
        content: undefined,
      };
    },
    removeMediaUrl(index) {
      this.form.media[index].display_url = '';
      this.form.media[index].media_name = '';
      this.form.media[index].url = '';
      this.form.media[index].media_type = '';
    },
    setupEdition() {
        this.form = JSON.parse(JSON.stringify(this.poi.poi));
        if (this.form.map_url && this.form.map_url !== '') {
          this.symbolFile.name = this.form.map_url.replace(/^.*[\\\/]/, '');
        }
        for (let i = 0; i < this.form.media.length; i++) {
          if (!this.form.media[i].name) {
            this.form.media[i].name = 'Media ' + (i + 1);
          }
          if (!this.form.media[i].metadata) {
            this.form.media[i].metadata = [];
          } else {
            this.form.media[i].metadata = JSON.parse(this.form.media[i].metadata);
          }
          getContent(getMediaUrl(this.form.media[i]))
            .then((stream) => new Response(stream))
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => this.form.media[i].display_url = url);

            if (this.form.media[i].url && this.form.media[i].url !== '') {
              this.form.media[i].media_name = this.form.media[i].url.replace(/^.*[\\\/]/, '');
            }
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
      this.form.elevation = preferences.elevation;
    },
    resetEditor() {
        this.form = JSON.parse(JSON.stringify(this.defaultForm));
        const preferences = this.getPoiConfigPreferences;
        if (preferences) {
          this.setupFromPreferences(preferences);
        }
        this.symbolFile = {
            url: '',
            name: '',
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
      const lastIndex = this.form.media.length;
      this.form.media[lastIndex - 1].name = 'Media ' + lastIndex;
    },
    updateMediaName(event, index) {
      console.log(event)
      this.form.media[index].name = event;
      console.log(this.form.media[index].name)
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
        this.symbolFile.name = this.symbolFile.content.name;
        this.symbolFile.url = URL.createObjectURL(this.symbolFile.content);
        this.form.map_media_type = ext;
      } else {
        this.symbolFile.url = '';
        this.symbolFile.name = '';
        this.form.map_media_type = '';
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
        this.form.media[index].media_name = this.form.media[index].content.name;
        this.form.media[index].media_type = ext;
      } else {
        this.form.media[index].url = '';
        this.form.media[index].display_url = '';
        this.form.media[index].media_type = '';
        this.form.media[index].media_name = '';
      }
    },
    async saveSymbolAndMedias() {
      if (this.symbolFile.content) {
        const formData = new FormData();
        formData.append('file', this.symbolFile.content);
        const path = await saveSymbol(formData);
        if (path.data) {
          this.form.map_url = path.data;
        }
      }
      if (this.symbolFile.name === '') {
        this.form.map_url = '';
        this.form.map_media_type = '';
      }
      if (this.form.media.length > 0) {
        for (let i = 0; i < this.form.media.length; i++) {
            if (this.form.media[i].media_name === '') {
              this.form.media[i].url = '';
            } else {
              delete this.form.media[i].display_url;
              delete this.form.media[i].media_name;
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
      useStore().deletePoiInBiovers(this.form);
      await this.createEvent('delete-poi-' + this.form.id, this.form.biovers);
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
      delete formToSave.subtitle;
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
      this.savePoiPreferences(formToSave);
      this.shouldDisplayNotification = true;
      setTimeout(() => this.shouldDisplayNotification = false, 3000);
    },
    ...mapActions('global', ['updateWait', 'savePoiPreferences']),
    ...mapActions('biovers', ['updatePoiStore', 'removePoi']),
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
      //this.setupFromPreferences(preferences);
    }
    this.updateWait(false);
  },
}
</script>

<style scoped>
p {
  margin-top: 6px;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  font-size: 14px;
}

.col-main-text {
  margin-bottom: 3px;
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

input {
  font-family: "BiodivAR Roman";
  font-variation-settings: "wght" 85, "ital" 0;
  font-size: 13px;
  letter-spacing: 0.02em;
}

label {
  font-family: "BiodivAR Roman";
  font-variation-settings: "wght" 110, "ital" 0;
  font-size: 14px;
  letter-spacing: 0.02em;
  padding-right: 6px;
  padding-bottom: 1px;
  margin-top: 4px;
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

.button-orange {
  background-color: #FFA800;
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
  height: 30px;
}

.col2 {
  width: 75%;
  display: flex;
  align-items: center;
  height: 30px;
}

.col3 {
  width: calc((100% - 25%) / 2);
  display: flex;
  align-items: center;
  height: 30px;
}

.col4 {
  width: 25%;
  display: flex;
  align-items: center;
  height: 30px;
}

.col5 {
  width: calc((100% - 25%) / 4);
  display: flex;
  align-items: center;
  height: 30px;
}

.border {
  border-top: 1px solid black;
  border-left: 1px solid black;
}

.end-border {
  border-right: 1px solid black;
}

.slider-width {
  width: calc(100% - 82px) !important;
  padding-left: 23px;
}

.slider-width-position {
  width: calc(100% - 80px) !important;
  padding-left: 23px;
}

.slider-width-small {
  width: calc(100% - 200px) !important;
  padding-left: 23px;
}

.slider-width-opacity {
  width: calc(100% - 100px) !important;
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
  font-size: 18px;
  padding-right: 8px;
}

.edition-layout {
  height: calc(95vh - 40vh);
}

.collapse {
  height: calc(95vh - 40vh - 70px);
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
  margin-bottom: 7px;
}

.input-margin {
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

.tooltip-font {
  color: #999999;
  margin-bottom: 6px;
  font-size: 16px;
 padding-left: 8px;
} 

.input-button {
  background-color: #2F80ED;
  color: white;
  width: 100px;
  height: 25px;
  border-radius: 15px;
  border: none;
  margin-left: 3px;
  margin-right: 3px;
}

.clickable {
  cursor: pointer;
}

.disabled-button {
  opacity: 0.5;
}

.remove-input-border {
  border: none;
}

.remove-stepper::-webkit-outer-spin-button,
.remove-stepper::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-number-right-align {
  text-align: right;
}

.margin-accordeon {
  --left-margin: 7px;
  --accordeon-background: #EEEEEE;
}

.margin-left-constraint {
  margin-left: 5px;
}
</style>
