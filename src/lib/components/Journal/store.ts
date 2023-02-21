import { arrayStore } from "$lib/store";
import type { Journal, Entry } from "./types";

export const journals = arrayStore<Journal>('journals', []);
export const entries = arrayStore<Entry>('entries', []);