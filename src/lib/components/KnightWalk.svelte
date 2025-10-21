<script lang="ts">
   import '../assets/Knight-Walk.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js'
   import { createAnimationHandler } from '$lib/attachments/animations.svelte.js';

   let { startBattle } = $props()

   const sprite = createSprite({WALK: 8} as const, {
      width: '96px',
      height: '84px'
   })

   const STATES = ['WALK']

   let steps = $state(0)

   const anim = createAnimationHandler(STATES, {
      WALK: {
         iterate: () => {
            steps++
            if (steps > 3) startBattle()
         }
      }
   })
</script>

<div {@attach sprite('WALK')} {...anim} ></div>
