<template>
<div>

  <div class="form-group">
    <label>Test Content:</label>
    <textarea class="form-control" rows="8" v-model="inputText" @input="$emit('changed', inputText)"></textarea>
  </div>

  <div class="form-group">
    <label>Results:</label>

    <div class="alert alert-warning" v-if="!firstRun">Ready</div>
    <div class="alert alert-success" v-show="firstRun && matches.length>0">Match</div>
    <div class="alert alert-danger" v-show="firstRun && matches.length==0">No match</div>

    <div>
      <span class="tag" v-for="m in matches" :key="m.Id">{{m.text}}</span>
    </div>

  </div>

</div>
</template>

<script>
export default {
  name: "TestExpression",
  props: {
    text: String,
    firstRun: Boolean,
    matches: Array
  },
  data() {
    return {
      inputText: null
    }
  },
  watch: {
    text() {
      this.inputText = this.text;
    }
  }
}
</script>