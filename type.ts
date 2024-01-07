import { type Infer } from "npm:lizod@0.2.7";
import { isDisplay, isRule, isSpace, isWindow } from "./validator.ts";

export type Space = Infer<typeof isSpace>;

export type Display = Infer<typeof isDisplay>;

export type Window = Infer<typeof isWindow>;

export type Rule = Infer<typeof isRule>;

// belows are from https://github.com/koekeishiya/yabai/blob/edb34504d1caa7bfa33a97ff46f3570b9f2f7e3d/doc/yabai.asciidoc

export type Label = string;

export type Layer = "below" | "normal" | "above";

export type BoolSel = "on" | "off";

// NOTE: 0 ~ 1.0 is expected
export type FloatSel = number;

export type RuleSel = number | Label;

export type SignalSel = number | Label;

export type DirSel = "north" | "east" | "south" | "west";

export type StackSel = "prev" | "next" | "first" | "last" | "recent";

export type WindowSel =
  | "prev"
  | "next"
  | "first"
  | "last"
  | "recent"
  | "mouse"
  | "largest"
  | "smallest"
  | "sibling"
  | "first_nephew"
  | "second_nephew"
  | "uncle"
  | "first_cousin"
  | "second_cousin"
  | StackSel
  | DirSel
  | number;

export type DisplaySel =
  | "prev"
  | "next"
  | "first"
  | "last"
  | "recent"
  | "mouse"
  | DirSel
  | number;

export type SpaceSel =
  | "prev"
  | "next"
  | "first"
  | "last"
  | "recent"
  | "mouse"
  | number
  | Label;
