<template>
    <el-dialog v-model="dialogVisible" :title="title"
    @close="$emit('closeDialog')">
    <base-input class="dialog-input-color">
      <base-button class="delete" @click="$emit('validate')">
        <img src="../../../../assets/shared/more/delete_white.svg" />{{ $t('TheMenu.Dialog.DeleteButton')}}
      </base-button>
    </base-input>
    </el-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    dialogVisible: Boolean,
  },
  emits: ['closeDialog', 'validate'],
}
</script>

<style scoped>
  .delete {
    --link-color: white;
    --highlight-color: rgba(255, 0, 0, 0.5);
  }
</style>