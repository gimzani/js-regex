<template>
  <div id="app">

    <div style="position: fixed; top: 10px; right: 10px">
      <button class="btn btn-sm btn-primary" v-show="mode=='reference'" @click="mode='edit'">Edit</button>
      <button class="btn btn-sm btn-primary" v-show="mode=='edit'" @click="mode='reference'">Reference</button>
    </div>
    <div v-show="mode=='edit'">
      <regex-editor></regex-editor>
    </div>
    <div v-show="mode=='reference'">
      <cheat-sheet></cheat-sheet>
    </div>
  </div>
</template>

<script>
//---------------------------------------------
import RegexEditor from '@/views/RegexEditor'
import CheatSheet from '@/views/CheatSheet'
//---------------------------------------------
export default {
  name: 'App',
  components: {
    RegexEditor,
    CheatSheet
  },
  data() {
    return {
      mode: 'edit'
    }
  }
}
</script>