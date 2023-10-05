import { type Infer } from "npm:lizod@0.2.7";
import { isDisplay, isRule, isSpace, isWindow } from "./validator.ts";

export type Space = Infer<typeof isSpace>;

export type Display = Infer<typeof isDisplay>;

export type Window = Infer<typeof isWindow>;

export type Rule = Infer<typeof isRule>;
