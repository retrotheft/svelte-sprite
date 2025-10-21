<script lang="ts">
   let { max, value, color = 'red' } = $props();
</script>

<progress {max} {value} style={`--color: ${color};`}></progress>

<style>
   progress[value] {
      -webkit-appearance: none;
      appearance: none;
      width: 30px;
      height: 5px;
   }

   progress[value]::-webkit-progress-bar {
      background-color: white;
      border: 1px solid var(--color);
      border-radius: 3px;
      box-shadow: inset 0px 0.5px 1px var(--color);
   }

   progress[value]::-webkit-progress-value {
      background: var(--color);
      box-shadow: none;
      border-color: var(--color);
      border-radius: 2px;
      transition: width 0.25s linear;
   }
</style>
