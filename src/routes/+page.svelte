<script lang="ts">
   import KnightWalk from "$lib/components/KnightWalk.svelte";
   import KnightBattle from "$lib/components/KnightBattle.svelte";
   import DemonFlying from "$lib/components/DemonFlying.svelte";
   import DemonBattle from "$lib/components/DemonBattle.svelte";
   import { type SvelteComponent } from 'svelte'
   import Scene from '$lib/components/Scene.svelte'

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
</script>

<Scene FRAME_DURATION={75}>
   {#key gameNum}
      {#if mode === 'walk'}
         <span></span>
         <KnightWalk {startBattle} />
         <div></div>
         <div></div>
         <!-- <DemonFlying /> -->
      {:else}
         <KnightBattle attack={attack("KNIGHT")} bind:this={knight} {endGame} />
         <DemonBattle attack={attack("DEMON")} bind:this={demon} {endBattle} />
      {/if}
   {/key}
</Scene>
<footer>Enemies Killed: { enemiesKilled }</footer>

<style>


   footer {
      align-self: start;
      font-family: monospace;
      text-align: center;
   }
</style>
