<script lang="ts">
   import './samus.css'
   import { createSprite } from '$lib/dollar-stores/sprite.js';
   import { createStateMachine } from "$lib/attachments/state-machine.svelte.js"

   const sprite = createSprite({
      width: '49px',
      height: '49px'
   })

   const hp = createStateMachine({ hp: 10 }, {
      // cancel: (event) => console.log("Animation Canceled", event),
      // start: (event) => console.log("Animation Started", event),
      iterate: (event) => hp.update(_hp => _hp + 1 ),
      effect: (_hp) => _hp % 5 === 0 ? $sprite = 'run-shoot' : $sprite = "run"
   })

   // const states = ['run', 'climb', 'somersault', 'run-shoot', 'run-shoot-up']

   function onkeydown(event: KeyboardEvent) {
      if (event.code === "ArrowUp") return $sprite = 'run-shoot-up'
      if (event.code === "ArrowLeft") return $sprite = 'run'
      if (event.code === "ArrowRight") return $sprite = 'run-shoot'
      if (event.code === "ArrowDown") return $sprite = 'climb'
      if (event.code === "Space") return $sprite = 'somersault'
   }
</script>

<svelte:window {onkeydown} />

<main>
   <div {@attach sprite('run')} {...hp}></div>
</main>

<style>
   main {
      display: flex;
      transform: scale(2);
   }

   :global(div::after) {
      animation-duration: 0.5s !important;
   }
</style>
