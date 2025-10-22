<script lang="ts">
   import '../assets/Knight-Walk.css'
   import { createSprite, createAnimationHandler, Sprite } from '$lib/index.js'

   let { startBattle } = $props()

   const sprite = createSprite({WALK: 8} as const, {
      width: '96px',
      height: '84px'
   })

   const STATES = { WALK: 8 }

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

<Sprite {@attach sprite('WALK')} {...anim} />
