<script lang="ts">
   import '../assets/Knight-Walk.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js'
   import { createStateMachine } from '$lib/attachments/state-machine.svelte.js';

   let { startBattle } = $props()

   const sprite = createSprite({
      width: '96px',
      height: '84px'
   })

   const sm = createStateMachine({ steps: 1 }, {
      iterate: (event, steps) => {
         sm.update(_steps => _steps + 1)
         if (steps > 3) startBattle()
      }
   })
</script>

<div {@attach sprite('WALK')} {...sm}></div>
