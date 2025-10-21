<script lang="ts">
   import { fly } from "svelte/transition";

   let { children = undefined, enter = false, ...attachments } = $props()
</script>

<!-- {#if enter}
   <div in:fly={{ x: 100 }} {...attachments} data-sprite="true">
      {@render children?.()}
   </div>
{:else}
   <div {...attachments} data-sprite="true">
      {@render children?.()}
   </div>
{/if} -->

<div {...attachments} data-sprite="true" data-fly={!!enter}>
   {@render children?.()}
</div>

<style>
   :global(div[data-sprite="true"]) {
      position: relative;
      display: grid;
      grid-auto-flow: row;
   }

   :global(div[data-sprite]::after) {
      animation-duration: calc(var(--frames) * var(--frame-duration)) !important;
   }

   :global(div[data-fly="true"]::after) {
      transform: translateX(0);
      opacity: 1;
      transition: transform 0.2s linear, opacity 0.2s linear;

      @starting-style {
         transform: translateX(100%);
         opacity: 0;
      }
   }
</style>
