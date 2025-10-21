<script lang="ts">
   import '../assets/Knight-Battle.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js'
   import { createStateMachine } from '$lib/attachments/state-machine.svelte.js';
   import Progress from '$lib/components/Progress.svelte'

   let { attack, endGame } = $props()

   const sprite = createSprite({
      width: '96px',
      height: '84px'
   })

   let hp = $state(3)

   let count = $state(0)

   const states = ['ATTACK-1', 'IDLE', 'HURT', 'DEATH']

   const sm = createStateMachine({ hp: 10 }, {
      iterate:(event, hp) => {
         count++
         if (count < 3) return
         count = 0
         $sprite = "ATTACK-1"
      },
      end: (event, hp) => {
         if (event.animationName === "DEATH") return endGame()
         if (event.animationName === "ATTACK-1") attack(1)
         $sprite = 'IDLE'
      }
   })

   export function hit(dmg: number) {
      $sprite = "HURT"
      hp--
      if (hp > 0) return
      $sprite = 'DEATH'
   }
</script>

<Progress max={3} value={hp} />
<div {@attach sprite('IDLE')} {...sm}></div>
