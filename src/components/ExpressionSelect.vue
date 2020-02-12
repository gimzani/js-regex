<template>
<div class="form-group">
  <label>Saved Expressions:</label>
  <div class="input-group">
    <select name="savedExpressions" class="form-control" v-model="selectedExpression">
      <option v-for="e in expressions" :key="e.Id" :value="e">{{e.Name}}</option>
    </select>
    <span class="input-group-append">
      <a class="btn btn-primary text-light selectable" @click="loadExpression()">Load</a>
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: "ExpressionSelect",
  props: {
    expressions: Array
  },
  data() {
    return {
      selectedExpression: null
    }
  },
  methods: {
    loadExpression() {
      this.$emit('selected', this.selectedExpression);
    }
  }
}
</script>