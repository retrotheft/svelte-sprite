<script lang="ts">
   import "../assets/Demon-Battle.css";
   import { createSprite } from "$lib/dollar-stores/sprite.js";
   import { createAnimationHandler } from "$lib/attachments/animations.svelte.js";
   import Progress from "./Progress.svelte";
   import { fly } from "svelte/transition";

   let { attack, endBattle } = $props();

   const sprite = createSprite(
      ["DEMON-IDLE", "DEMON-ATTACK", "DEMON-HURT", "DEMON-DEATH"] as const,
      {
         width: "81px",
         height: "71px",
      },
   );

   let hp = $state(2);
   let count = $state(0);

   function loop() {
      count++;
      if (count < 4) return;
      count = 0;
      // if ($sprite === 'DEMON-DEATH') return
      $sprite = "DEMON-ATTACK";
   }

   export function hit(dmg: number) {
      $sprite = "DEMON-HURT";
      hp--;
      if (hp <= 0) $sprite = "DEMON-DEATH";
   }

   const anim = createAnimationHandler({
      ["DEMON-IDLE"]: {
         iterate: () => loop(),
         cancel: () => {},
      },
      ["DEMON-ATTACK"]: {
         start: () => setTimeout(() => attack(1), 270),
         end: () => ($sprite = "DEMON-IDLE"),
      },
      ["DEMON-HURT"]: {
         end: () => ($sprite = "DEMON-IDLE"),
      },
      ["DEMON-DEATH"]: {
         end: () => endBattle(),
      },
   });
</script>

<Progress max="2" value={hp} />
<div in:fly={{ x: 100 }} {@attach sprite("DEMON-IDLE")} {...anim}></div>

<style>
   :global(div::after) {
      animation-duration: 0.5s !important;
   }
</style>
