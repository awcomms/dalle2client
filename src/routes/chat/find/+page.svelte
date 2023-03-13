<script lang="ts">
	/**
	 * let call_id
	 * create id
     * on:description_change
        * input description, store in store
        * get embedding, with id, store in same store
        * query index for id_to_call, topK = 1
        * call id_to_call
	 *
	 * on:call
	 *  if caller_id === id_to_call: {accept}
	 */
</script>
