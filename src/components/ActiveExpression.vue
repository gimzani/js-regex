<template>
<div>

  <div class="form-group">
    <label>Expression Name:</label>
    <input type="text" class="form-control" :value="expression.Name" @input="$emit('update', { prop: 'Name', val: $event.target.value })" />
  </div>

  <div class="form-group">
    <label>Active Expression:</label>
    <textarea class="form-control" rows="4" :value="expression.Value" @input="$emit('update', { prop: 'Value', val: $event.target.value })"></textarea>
  </div>

  <div class="form-group text-right">
    <label class="checkboxLabel selectable" for="cbGlobal">
      <input id="cbGlobal" name="cbGlobal" type="checkbox" v-model="settings.global" @change="$emit('settings', settings)" /> Global
    </label>
    <label class="checkboxLabel selectable" for="cbMultiline">
      <input id="cbMultiline" name="cbMultiline" type="checkbox" v-model="settings.multiline" @change="$emit('settings', settings)" /> Multiline
    </label>
    <label class="checkboxLabel selectable" for="cbUnicode">
      <input id="cbUnicode" name="cbUnicode" type="checkbox" v-model="settings.unicode" @change="$emit('settings', settings)" /> Unicode
    </label>
    <label class="checkboxLabel selectable" for="cbIgnoreCase">
      <input id="cbIgnoreCase" type="checkbox" v-model="settings.ignoreCase" @change="$emit('settings', settings)" /> Ignore Case
    </label>
  </div>

  <div class="row mt-4">
    <div class="col">
      <div class="btn-group" v-if="expression.Name || expression.Value">
        <a class="btn btn-success text-light selectable" @click="$emit('save')"><font-awesome-icon class="icon text-light" icon="save" />Save</a>
        <a class="btn btn-warning selectable" @click="$emit('clear')"><font-awesome-icon class="icon text-dark" icon="minus" />Clear</a>
      </div>
    </div>
    <div class="col text-right">
      <a class="btn btn-primary text-light selectable" @click="$emit('run')"><font-awesome-icon class="icon text-light" icon="bolt" />Run</a>
    </div>
  </div>

  <div class="alert alert-danger" v-if="showError">Please enter an expression</div>

</div>
</template>

<script>
export default {
  name: "ActiveExpression",
  props: {
    expression: Object,
  },
  data() {
    return {
      showError: false,
      settings: {
        global: true,
        multiline: false,
        unicode: false,
        ignoreCase: true,
        editing: true
      }
    }
  },
  methods: {
    setFlags() {
      let flags = "";
      if(this.settings.global) { flags += "g"; }
      if(this.settings.multiline) { flags += "m"; }
      if(this.settings.unicode) { flags += "u"; }
      if(this.settings.ignoreCase) { flags += "i"; }
      this.$emit("set-flags", flags);
    }
  }
}
</script>