<script lang="ts">
   import "../assets/Demon-Battle.css";
   import { createSprite } from "$lib/dollar-stores/sprite.js";
   import { createAnimationHandler } from "$lib/attachments/animations.svelte.js";
   import Progress from "./Progress.svelte";
   import { fly } from "svelte/transition";
   import { getSceneContext } from '$lib/contexts/scene.js'
   import Sprite from "./Sprite.svelte";

   let { attack, endBattle } = $props();

   const { FRAME_DURATION } = getSceneContext()

   const MAX_HP = 2

   const STATES = {
      ["DEMON-IDLE"]: 4,
      ["DEMON-HURT"]: 4,
      ["DEMON-ATTACK"]: 8,
      ["DEMON-DEATH"]: 6
   }

   const sprite = createSprite(STATES, {
         width: "81px",
         height: "71px",
      },
   );

   let hp = $state(MAX_HP);
   let idleFrames = $state(0);

   function idleLoop(frames: number) {
      idleFrames += frames;
      if (idleFrames < frames * 3) return;
      idleFrames = 0;
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
         iterate: (_, numFrames) => idleLoop(numFrames),
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

<!-- <div in:fly={{ x: 100 }} {@attach sprite("DEMON-IDLE")} {...anim}>
   <Progress max={MAX_HP} value={hp} />
</div> -->
<Sprite {@attach sprite("DEMON-IDLE")} {...anim} enter>
   <Progress max={MAX_HP} value={hp} />
</Sprite>
