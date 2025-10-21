<script lang="ts">
   let { attachmentFactory } = $props()

   let reactiveState = $state(0)

   function callback() {
      console.log("Hello there")
   }
</script>

<div {@attach attachmentFactory(reactiveState)}>Spy Test</div>


<!-- <button onclick={() => reactiveState++}>Increment</button> -->
