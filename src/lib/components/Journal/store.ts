import { arrayStore, stringStore } from "$lib/store";
import { v4 } from "uuid";
// import type { Journal, Entry } from "./types";

export const journals_id = stringStore('journals', v4());
export const entries = arrayStore<string>('entries', []);