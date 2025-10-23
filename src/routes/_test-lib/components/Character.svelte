<script lang="ts">
   import "../assets/character.css";
   import "../assets/effect.css"
   import { Overlay } from '$lib/index.js'

   import {
      createManualSprite,
      createAnimationHandler,
      Sprite,
      Scene,
   } from "$lib/index.js";

   const STATES = {
      IDLE: 5,
      WALK: 8,
      RUN: 8,
      JUMP: 4,
      FALL: 4,
      USE: 6,
      DEATH: 10
   } as const;

   const skinUrls = [
      'url("/character/Male Skin1.png"',
      'url("/character/Male Skin2.png"',
      'url("/character/Male Skin3.png"',
      'url("/character/Male Skin4.png"',
      'url("/character/Male Skin5.png"',
   ]

   const sprite = createManualSprite(STATES, {
      url: skinUrls[0],
      flip: true,
      classes: ["character"],
      width: "80px",
      height: "64px",
   });

   const effectSprite = createManualSprite({ EFFECT: 5 } as const, {
      url: 'url("effects/Character effects stars.png")',
      flip: true,
      classes: ["effect"],
      width: "80px",
      height: "64px"
   })

   function keys<T extends Record<string, any>>(obj: T): Array<keyof T> {
      return Object.keys(obj) as Array<keyof T>;
   }

   const clothing = [
      "url('/clothing/Blue Shirt v2.png')",
   ]

   let clothingIndex = $state(0)

   let url = $derived(clothing[clothingIndex])

   let hasEffect = $state(false)
</script>

<input type="range" min="0" max="5" bind:value={clothingIndex} />
<button onclick={sprite.flip}>Flip</button>

<Scene FRAME_DURATION={140}>
   <Sprite {@attach sprite("WALK")}>

      <Overlay {sprite} {url} />
      <Overlay {sprite} url='url("/hair/Male Hair2.png")' />
      <Overlay {sprite} url='url("/clothing/Blue Pants.png")' />
      <Overlay {sprite} url='url("/clothing/Boots.png")' />
      <Overlay {sprite} url='url("/hand/Male Sword.png")' />
      {#if hasEffect}
         <Sprite {@attach effectSprite("EFFECT")} />
      {/if}
   </Sprite>
</Scene>


{#each keys(STATES) as state}
   <button onclick={() => $sprite = state}>{state}</button>
{/each}

<button onclick={() => hasEffect = !hasEffect}>Toggle Effect</button>
<style>
   :global(.character) {
      position: relative;
   }

   :global(.overlay) {
      position: absolute !important;
   }
</style>
