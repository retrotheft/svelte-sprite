<script lang="ts">
   import Character from '../_test-lib/components/Character.svelte'
   let speed = $state(60)
   let isPaused = $state(false)
</script>

<main style={`--scroll-speed: ${speed}s;`}>
   <div class="background-layer layer-5" class:paused={isPaused}></div>
   <div class="background-layer layer-4" class:paused={isPaused}></div>
   <div class="background-layer layer-3" class:paused={isPaused}></div>
   <div class="background-layer layer-2" class:paused={isPaused}></div>
   <div class="background-layer layer-1" class:paused={isPaused}></div>
   <div class="ground-layer" class:paused={isPaused}></div>
   <Character />
</main>

<button onclick={() => isPaused = !isPaused}>{ isPaused ? 'Play' : 'Pause' }</button>

<style>
   main {
      position: relative;
      transform: scale(1);
      place-self: start;
      border: 1px solid #444;
      width: 1024px;
      height: 346px;
   }

   .background-layer {
      position: absolute;
      width: 1024px;
      height: 346px;
      background-size: 1024px 346px;
      background-repeat: repeat-x;
   }

   .layer-1 {
      background-image: url('/parallax/layer-1.png');
      animation: scroll var(--scroll-speed) linear infinite;
   }

   .layer-2 {
      background-image: url('/parallax/layer-2.png');
      animation: scroll calc(var(--scroll-speed) * 2) linear infinite;
   }

   .layer-3 {
      background-image: url('/parallax/layer-3.png');
      animation: scroll calc(var(--scroll-speed) * 3) linear infinite;
   }

   .layer-4 {
      background-image: url('/parallax/layer-4.png');
      animation: scroll calc(var(--scroll-speed) * 4) linear infinite;
   }

   .layer-5 {
      background-image: url('/parallax/layer-5.png');
      animation: scroll calc(var(--scroll-speed) * 5) linear infinite;
   }

   @keyframes scroll {
      to { background-position: -1024px 0; }
   }

   .ground-layer {
      width: 1024px;
      height: 32px;
      background: url('/Floor Tiles1-49.png') repeat-x;
      position: absolute;
      bottom: 0px;
      animation: scroll var(--scroll-speed) linear infinite;
   }

   :global(.paused) {
      animation-play-state: paused !important;
   }
</style>
