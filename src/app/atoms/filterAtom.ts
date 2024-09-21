// filterAtom.ts
import { atom } from "jotai";

export const filterAtom = atom<"day" | "week" | "month">("month");
