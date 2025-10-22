<script lang="ts">
   import './_test-lib/assets/Knight-Walk.css'
   import './_test-lib/assets/Knight-Battle.css'
   import './_test-lib/assets/Demon-Battle.css'
   import KnightWalk from "./_test-lib/components/KnightWalk.svelte";
   import BattleEntity from "./_test-lib/components/BattleEntity.svelte";
   import { knightConfig, demonConfig } from "./_test-lib/config.js";
   import { type SvelteComponent } from 'svelte'
   import { Scene } from '$lib/index.js'

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
         <KnightWalk {startBattle} />
         <div></div>
         <!-- <DemonFlying /> -->
      {:else}
         <BattleEntity
            config={knightConfig}
            attack={attack("KNIGHT")}
            bind:this={knight}
            endCallback={endGame}
         />
         <BattleEntity
            config={demonConfig}
            attack={attack("DEMON")}
            bind:this={demon}
            endCallback={endBattle}
            enter
         />
      {/if}
   {/key}
</Scene>

<footer>Enemies Killed: {enemiesKilled}</footer>

<style>
   footer {
      align-self: start;
      font-family: monospace;
      text-align: center;
   }
</style>
