<script lang="ts">
   import { setSceneContext } from "$lib/contexts/scene.js";
   import { type Snippet } from 'svelte'

   let { FRAME_DURATION, children }: { FRAME_DURATION: number, children: Snippet } = $props()

   setSceneContext({ FRAME_DURATION })
</script>

<div class="scene" style={`--frame-duration: ${FRAME_DURATION}ms;`}>
   {@render children?.()}
</div>

<style>
   div.scene {
      display: grid;
      grid-template-columns: 48px 40px;
      justify-items: center;
      align-self: center;
      /*transform: scale(1.5);*/
      transform-origin: center;
      position: absolute;
      bottom: 32px;
      left: 480px;
   }
</style>
