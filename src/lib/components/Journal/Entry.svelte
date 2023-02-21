<script lang="ts">
    export let entry: import("./types").Entry
</script>

<div class="entry">
    {entry.text}
</div>

<style lang="sass">
    .entry
        border-radius: .369rem
</style>