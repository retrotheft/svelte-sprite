<script lang="ts">
   import './samus.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js';
   import { createStateMachine } from "$lib/attachments/state-machine.svelte.js"
   import random from 'random'

   const sprite = createSprite({
      width: '49px',
      height: '49px'
   })

   const gameState = $state({
      eventProbability: 0
   })

   const hpFunc: Record<string, (event: AnimationEvent) => void> = {
      ['run-frames']: (event: AnimationEvent) => console.log("Running!", event)
   }

   const hp = createStateMachine({ hp: 10 }, {
      // cancel: (event) => console.log("Animation Canceled", event),
      start: (event, hp) => hpFunc[event.animationName]?.(event),
      iterate: (event, hp) => gameLoop(),
      // effect: (_hp) => console.log("Samus was hurt!", _hp)
   })

   const states = ['run', 'climb', 'somersault', 'run-shoot', 'run-shoot-up']

   function gameLoop() {
      gameState.eventProbability++
      const roll = random.int(0, 100)
      if (roll < gameState.eventProbability) {
         $sprite = random.choice(states)!
         gameState.eventProbability = 0
      }
   }
</script>

<main>
   <div {@attach sprite('run')} {...hp}></div>
</main>

<style>
   main {
      display: flex;
      transform: scale(2);
   }

   :global(div::after) {
      animation-duration: 0.4s !important;
   }
</style>
