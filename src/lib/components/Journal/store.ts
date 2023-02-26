import { arrayStore } from "$lib/store";
import type { Journal, Entry } from "./types";

export const journals = arrayStore<string>('journals', []);
export const entries = arrayStore<string>('entries', []);