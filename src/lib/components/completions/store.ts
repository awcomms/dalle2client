import { arrayStore } from "$lib/store";
import type { Chat } from "./types";

export const definitions = arrayStore<string>('definitions', [])
export const chats = arrayStore<Chat>('chats', [])