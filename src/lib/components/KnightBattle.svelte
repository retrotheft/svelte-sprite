<script lang="ts">
   import '../assets/Knight-Battle.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js'
   import { createAnimationHandler } from '$lib/attachments/animations.svelte.js';
   import Progress from '$lib/components/Progress.svelte'

   let { attack, endGame, FRAME_DURATION } = $props()

   const STATES_WITH_FRAMES = {
      ['ATTACK-1']: 6,
      IDLE: 7,
      HURT: 4,
      DEATH: 12
   } as const

   const STATES = ['ATTACK-1', 'IDLE', 'HURT', 'DEATH'] as const
   const TIME_PER_FRAME = 500 // also set in +page.svelte for now

   const sprite = createSprite(STATES_WITH_FRAMES, {
      width: '96px',
      height: '84px'
   })

   let hp = $state(3)

   let count = $state(0)

   // should build this off the sprite object so we have exhaustive safety making us implement each state
   // though actually the sprite currently doesn't know about its own states... probably should though
   // then we could just return an error if anyone tried to set an unknown state
   // const stateMachine = createStateMachine(states)
   // stateMachine.setup() <-- this would then be typesafe

   function loop() {
      count++
      if (count < 3) return
      count = 0
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
         iterate: () => loop(),
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

   // animation handler routes each animationevent to stateMachine[animationName].hook
   // need an elegant way to make cancelable (is the presence of cancel enough?)
   // {@attach animationHandler(stateMachine)}
</script>

<Progress max={3} value={hp} />
<div {@attach sprite("IDLE")} {...anim}></div>
