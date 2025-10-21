<script lang="ts">
   import '../assets/Knight-Battle.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js'
   import { createAnimationHandler } from '$lib/attachments/animations.svelte.js';
   import Progress from '$lib/components/Progress.svelte'
   import { getSceneContext } from '$lib/contexts/scene.js';
   import Sprite from './Sprite.svelte';

   let { attack, endGame } = $props()

   const { FRAME_DURATION } = getSceneContext()

   const MAX_HP = 3

   const STATES = {
      ['ATTACK-1']: 6,
      IDLE: 7,
      HURT: 4,
      DEATH: 12
   } as const

   const sprite = createSprite(STATES, {
      width: '96px',
      height: '84px'
   })

   let hp = $state(MAX_HP)

   let idleFrames = $state(0)

   function idleLoop(frames: number) {
      idleFrames += frames
      if (idleFrames < frames * 2) return
      idleFrames = 0
      $sprite = 'ATTACK-1'
   }

   export function hit(dmg: number) {
      $sprite = "HURT"
      hp--
      if (hp > 0) return
      $sprite = 'DEATH'
   }

   const anim = createAnimationHandler(STATES, {
      IDLE: {
         iterate: (_, numFrames) => idleLoop(numFrames),
         cancel: () => {}
      },
      ['ATTACK-1']: {
         start: () => setTimeout(() => attack(1), FRAME_DURATION * 3),
         end: () => $sprite = "IDLE",
         cancel: () => {}
      },
      HURT: {
         end: () => $sprite = "IDLE",
      },
      DEATH: {
         end: () => endGame()
      }
   })
</script>

<Sprite {@attach sprite("IDLE")} {...anim}>
   <Progress max={MAX_HP} value={hp} />
</Sprite>
