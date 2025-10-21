<script lang="ts">
   import '../assets/Demon-Battle.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js'
   import { createStateMachine } from '$lib/attachments/state-machine.svelte.js';
   import Progress from './Progress.svelte';

   let { attack, endBattle } = $props()

   const sprite = createSprite({
      width: '81px',
      height: '71px'
   })

   let hp = $state(2)
   let count = $state(0)

   const sm = createStateMachine({ hp: 10}, {
      iterate: (event, hp) => {
         count++
         if (count < 4) return
         count = 0
         $sprite = "DEMON-ATTACK"
      },
      end: (event, hp) => {
         if (event.animationName === "DEMON-DEATH") return endBattle()
         if (event.animationName === "DEMON-ATTACK") attack(1)
         $sprite = "DEMON-IDLE"
      }
   })

   export function hit(dmg: number) {
      $sprite = "DEMON-HURT"
      hp--
      if (hp <= 0) $sprite = "DEMON-DEATH"
   }
</script>

<Progress max="2" value={hp} />
<div {@attach sprite('DEMON-IDLE')} {...sm}></div>

<style>
   :global(div::after) {
      animation-duration: 0.5s !important;
   }
</style>
