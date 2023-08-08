import { type Infer } from "npm:lizod@0.2.6";
import { isDisplay, isSpace, isWindow } from "./validator.ts";

export type Space = Infer<typeof isSpace>;

export type Display = Infer<typeof isDisplay>;

export type Window = Infer<typeof isWindow>;
