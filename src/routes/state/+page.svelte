<script lang="ts">
   import { createStateMachine } from "$lib/attachments/state-machine.svelte.js";

   const hp = createStateMachine({ hp: 100 }, {
      start: (event) => console.log(event),
      effect: (hp) => console.log(hp)
   })
</script>

<div {...hp}></div>

<button onclick={() => hp.update(_hp => _hp - 1)}>HP-</button>

{$hp}
