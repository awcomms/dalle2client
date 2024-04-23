import { stringStore } from "$lib/store";
import { v4 } from "uuid";

export const journals_id = stringStore('journals', v4());
export const entries_id = stringStore('entries', v4());