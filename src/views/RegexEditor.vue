<template>
<div class="regex-editor">

  <div class="regex-editor-col">
    <expression-select :expressions="expressions" @selected="expression=$event"></expression-select>
  </div>
  <div class="regex-editor-col">
    &nbsp;
  </div>

  <div class="regex-editor-col">
    <active-expression :expression="expression" @set-flags="flags=$event" @clear="clearExpression" @update="updateExpression($event)" @save="saveExpression()" @run="runExpression()"></active-expression>
  </div>
  <div class="regex-editor-col">
    <test-content :first-run="firstRun" :matches="matches" :text="inputText" @changed="inputText=$event"></test-content>
  </div>

</div>
</template>

<script>
//-----------------------------------------------------------
import swal from 'sweetalert'
import ExpressionSelect from '@/components/ExpressionSelect'
import ActiveExpression from '@/components/ActiveExpression'
import TestContent from '@/components/TestContent'
//-----------------------------------------------------------
export default {
  name: 'RegexEditor',
  components: {
    ActiveExpression,
    ExpressionSelect,
    TestContent
  },
  data() {
    return {
      expressions: [],
      inputText: null,
      expression:  null,
      firstRun: false,
      matches: [],
      flags: 'gi'
    }
  },
  created() {
    let self = this;
    this.$ipc.on('expressions-loaded', function(event, expressions) {
      self.expressions = expressions;
       console.log('load complete');
    })
    this.$ipc.on('expressions-saved', function() { console.log('save complete'); })
    this.$ipc.send('load-expressions');
    this.clearExpression();
  },
  methods: {
    updateExpression({prop, val}) {
      this.expression[prop] = val;
    },
    clearExpression() {
      this.firstRun = false;
      this.expression = { Id: null, Name: null, Value: null };
      this.matches = [];
      this.inputText = "";
    },
    runExpression() {
      this.firstRun = true;
      let result = new RegExp(this.expression.Value, this.flags);
      this.getAllMatches(result);
    },
    getAllMatches(result) {

      var count = 0, limit = 1000, matches = [], m;

      do {
        m = result.exec(this.inputText);
        if (m) {
          matches.push({ index: count, text :m[0] });
        }
        if (limit==count)
          break;
        count++;
      } while (m);

      if (matches.length > 1000) {
        this.matches = [{ index:0, text:"limit break..."}];
      } else {
        this.matches = matches;
      }
    },
    saveExpression() {
      if(this.expression.Id) {
        this.$ipc.send('save-expressions', this.expressions);
      } else {
        if(!this.expression.Name) {
          swal("Cannot Save", "The Expression needs a name", "warning");
          return;
        }
        if(!this.expression.Value) {
          swal("Cannot Save", "The Expression needs a Regex Value", "warning");
          return;
        }
        this.expression.Id = Math.uuid();
        this.expressions.push(this.expression);
        this.$ipc.send('save-expressions', this.expressions);
      }
    }
  }
}
</script>