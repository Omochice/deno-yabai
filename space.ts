import { ResultAsync } from "npm:neverthrow@8.2.0";
import { yabai } from "./core.ts";
import { ignore } from "./ignore.ts";
import type { DisplaySel, Label, SpaceSel } from "./type.ts";

/**
 * Focus the given space.
 *
 * @param query Command query
 * @param query.scape Selected space
 * @param query.target Target to focus
 */
export function focus(
  { space, target }: {
    space?: SpaceSel;
    target: SpaceSel | "recent" | "prev" | "next";
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--focus",
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Create new space on the given display.
 * If none specified, use the display of the active space instead.
 *
 * @param query Command query
 * @param query.space Selected space
 * @param query.target Create target
 */
export function create(
  query?: {
    space?: SpaceSel;
    target?: DisplaySel;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${query?.space ?? ""}`,
    "--create",
    `${query?.target ?? ""}`,
  ])
    .andThen(ignore);
}

/**
 * Destory specified space.
 * If none specified, use the selected space instead.
 *
 * @param query Command query
 * @param query.space Selected space
 * @param query.target Destory target identifier
 */
export function destroy(
  query?: {
    space?: SpaceSel;
    target?: SpaceSel;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${query?.space ?? ""}`,
    "--destroy",
    `${query?.target ?? ""}`,
  ])
    .andThen(ignore);
}

/**
 * Move position of the selected space to the position of the given space.
 * The selected space and given space must both belong to the same display.
 *
 * @param space Selected space
 * @param target Target space identifier
 */
export function move(
  { space, target }: {
    space?: SpaceSel;
    target: SpaceSel;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--move",
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Swap the selected space with the given space.
 * The selected space and given space must both belong to the same display.
 *
 * @param space Selected space
 * @param target target space indentifier
 */
export function swap(
  { space, target }: {
    space?: SpaceSel;
    target: SpaceSel;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--swap",
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Remove the given space.
 * If none specified, use the selected space instead.
 *
 * @param space Selected space
 * @param target Target space identifier
 */
export function send(
  { space, target }: {
    space?: SpaceSel;
    target: DisplaySel;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--display",
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Adjust the split ratios on the selected space so that all windows along the given axis occupy the same area.
 * If no axis is specified, use both.
 *
 * @param query Command query
 * @param query.space Selected space
 * @param query.axis The way to balance
 */
export function balance(
  query?: {
    space?: SpaceSel;
    axis?: "x" | "y";
  },
): ResultAsync<void, Error> {
  const axis = query?.axis == null ? "" : `${query.axis}-axis`;
  return yabai("space", [
    `${query?.space ?? ""}`,
    "--balance",
    `${axis}`,
  ])
    .andThen(ignore);
}

/**
 * Flip the tree of the selected space along the given axis.
 * If target is not specified, flip current space.
 *
 * @param space Selected space
 * @param flipTo The way to flip
 */
export function flip(
  { space, flipTo }: {
    space?: SpaceSel;
    flipTo: "x" | "y";
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--mirror",
    `${flipTo}-axis`,
  ])
    .andThen(ignore);
}

/**
 * Rotate the window tree clock-wise.
 * If target is not specified, rotate current space.
 *
 * @param space Selected space
 * @param degree Degree of rotate
 */
export function rotate(
  { space, degree }: {
    space?: SpaceSel;
    degree: 90 | 180 | 270;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--rotate",
    `${degree}`,
  ])
    .andThen(ignore);
}

/**
 * Padding added at the sides of the selected space.
 *
 * @param type "relative" is adding to current padding, "absolute" is setting as new.
 * @param padding padding size. If yout omited some sides, set 0 as default.
 * @param space Selected space
 */
export function changePadding(
  { type, padding, space }: {
    type: "relative" | "absolute";
    padding: { top?: number; bottom?: number; left?: number; right?: number };
    space?: SpaceSel;
  },
): ResultAsync<void, Error> {
  const normalizedType = type.substring(0, 3);
  const normalizedPadding = {
    ...{ top: 0, botton: 0, left: 0, right: 0 },
    ...padding,
  };
  const query = [
    normalizedType,
    normalizedPadding.top,
    normalizedPadding.bottom,
    normalizedPadding.left,
    normalizedPadding.right,
  ].map((e) => `${e}`)
    .join(":");

  return yabai("space", [`${space ?? ""}`, "--padding", query])
    .andThen(ignore);
}

/**
 * Size of the gap that separates windows on the selected space.
 *
 * @param type "relative" is adding to current padding, "absolute" is setting as new.
 * @param gap Gap size.
 * @param space Selected space
 */
export function changeGap(
  { type, gap, space }: {
    type: "relative" | "absolute";
    gap: number;
    space?: SpaceSel;
  },
): ResultAsync<void, Error> {
  const normalizedType = type.substring(0, 3);
  const query = `${normalizedType}:${gap}`;
  return yabai("space", [
    `${space ?? ""}`,
    "--gap",
    query,
  ])
    .andThen(ignore);
}

/**
 * Toggle space setting on or off for the selected space.
 *
 * @param toggleTo Toggle target name
 * @param space Selected space
 */
export function toggle(
  { toggleTo, space }: {
    toggleTo: "padding" | "gap";
    space?: SpaceSel;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--toggle",
    `${toggleTo}`,
  ])
    .andThen(ignore);
}

/**
 * Set the layout of the selected space.
 * If target is not specified, set layout to current space.
 *
 * @param layout "bsp" or "float"
 * @param space Selected space
 */
export function changeLayout(
  { layout, space }: {
    layout: "bsp" | "stack" | "float";
    space?: SpaceSel;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--layout",
    `${layout}`,
  ])
    .andThen(ignore);
}

/**
 * Label the selected space, allowing that label to be used as an alias in commands that take a `target` parameter.
 * If the command is called without an argument it will try to remove a previously assigned label.
 *
 * @param space target space identifier
 * @param labelName name
 */
export function label(
  { space, labelName }: {
    space?: SpaceSel;
    labelName: Label;
  },
): ResultAsync<void, Error> {
  return yabai("space", [
    `${space ?? ""}`,
    "--label",
    labelName,
  ])
    .andThen(ignore);
}
