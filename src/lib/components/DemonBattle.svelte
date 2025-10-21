<script lang="ts">
   import "../assets/Demon-Battle.css";
   import { createSprite } from "$lib/dollar-stores/sprite.js";
   import { createAnimationHandler } from "$lib/attachments/animations.svelte.js";
   import Progress from "./Progress.svelte";
   import { fly } from "svelte/transition";

   let { attack, endBattle, FRAME_DURATION } = $props();

   const STATES_WITH_FRAMES = {
      ["DEMON-IDLE"]: 4,
      ["DEMON-HURT"]: 4,
      ["DEMON-ATTACK"]: 8,
      ["DEMON-DEATH"]: 6
   }
   const STATES = ["DEMON-IDLE", "DEMON-ATTACK", "DEMON-HURT", "DEMON-DEATH"] as const

   const sprite = createSprite(STATES_WITH_FRAMES, {
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

   const anim = createAnimationHandler(STATES, {
      ["DEMON-IDLE"]: {
         iterate: () => loop(),
         cancel: () => {},
      },
      ["DEMON-ATTACK"]: {
         start: () => setTimeout(() => attack(1), FRAME_DURATION * 3),
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
