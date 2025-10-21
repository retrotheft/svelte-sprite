<script lang="ts">
   import { setSceneContext } from "$lib/contexts/scene.js";
   import { type Snippet } from 'svelte'

   let { FRAME_DURATION, children }: { FRAME_DURATION: number, children: Snippet } = $props()

   setSceneContext({ FRAME_DURATION })
</script>

<main style={`--frame-duration: ${FRAME_DURATION}ms;`}>
   {@render children?.()}
</main>

<style>
   main {
      display: grid;
      grid-template-columns: 48px 40px;
      justify-items: center;
      align-self: end;
      transform: scale(1.5);
      transform-origin: center;
   }
</style>
