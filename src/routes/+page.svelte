<script lang="ts">
   import KnightWalk from "$lib/components/KnightWalk.svelte";
   import KnightBattle from "$lib/components/KnightBattle.svelte";
   import DemonFlying from "$lib/components/DemonFlying.svelte";
   import DemonBattle from "$lib/components/DemonBattle.svelte";
   import { type SvelteComponent } from 'svelte'

   let knight = $state<SvelteComponent>()
   let demon = $state<SvelteComponent>()

   const attack = (attacker: string) => (dmg: number) => {
      if (attacker === "DEMON") knight?.hit(dmg)
      if (attacker === "KNIGHT") demon?.hit(dmg)
   };

   let mode = $state('walk')
   let gameNum = $state(0)
   let enemiesKilled = $state(0)

   function startBattle() {
      mode = 'battle'
   }

   function endBattle() {
      mode = 'walk'
      enemiesKilled++
   }

   function endGame() {
      gameNum++
      mode = 'walk'
      enemiesKilled = 0
   }

   const FRAME_DURATION = 75
</script>

<main style={`--frame-duration: ${FRAME_DURATION}ms;`}>
   {#key gameNum}
      {#if mode === 'walk'}
         <span></span>
         <KnightWalk {startBattle} />
         <div></div>
         <div></div>
         <!-- <DemonFlying /> -->
      {:else}
         <KnightBattle attack={attack("KNIGHT")} bind:this={knight} {endGame} {FRAME_DURATION} />
         <DemonBattle attack={attack("DEMON")} bind:this={demon} {endBattle} {FRAME_DURATION} />
      {/if}
   {/key}
</main>
<footer>Enemies Killed: { enemiesKilled }</footer>

<style>
   main {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: 1rem 1fr;
      grid-template-columns: 48px 40px;
      justify-items: center;
      align-self: end;
      transform: scale(1.5);
      transform-origin: center;
   }

   footer {
      align-self: start;
      font-family: monospace;
      text-align: center;
   }
</style>
