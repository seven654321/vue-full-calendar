<template>
  <div class="hello">


    <classCalen :events="old_calen_event" :viewColl="viewColl">

    </classCalen>
  </div>
</template>

<script>
import moment from 'moment';
let currentMoment = moment();
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      viewColl: {
        type: "month",
        date: currentMoment.format("YYYY-MM-DD"),
        drag_target:null,
      },
      old_calen_event:[],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
