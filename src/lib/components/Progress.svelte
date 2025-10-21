<script lang="ts">
   let { max, value } = $props();
</script>

<progress {max} {value}></progress>

<style>
   progress[value] {
      -webkit-appearance: none;
      appearance: none;
      width: 60px;
      height: 5px;
   }

   progress[value]::-webkit-progress-bar {
      background-color: white;
      border: 1px solid red;
      border-radius: 3px;
      box-shadow: inset 0px 0.5px 1px red;
   }

   progress[value]::-webkit-progress-value {
      background: red;
      box-shadow: none;
      border-color: red;
      border-radius: 2px;
   }
</style>
