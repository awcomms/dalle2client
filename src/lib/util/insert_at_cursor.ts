export const insert_at_cursor = (el: HTMLInputElement | HTMLTextAreaElement, text: string) => {
	if (el) {
		console.debug('ya')
		el.focus();
		const cursorPosition = el.selectionStart || 0;
		console.debug(cursorPosition)
		el.value = el.value.substring(0, cursorPosition) + text + el.value.substring(cursorPosition);
		el.selectionStart = cursorPosition + text.length;
		el.selectionEnd = cursorPosition + text.length;
	}
};
