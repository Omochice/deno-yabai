import { ResultAsync } from "npm:neverthrow@6.1.0";
import { yabai } from "./core.ts";
import { ignore } from "./ignore.ts";

type Space = number | string;

/**
 * Focus the space.
 *
 * @param target focus target
 */
export function focus(
  target: Space | "recent" | "prev" | "next",
): ResultAsync<void, Error> {
  return yabai("space", ["--focus", `${target}`])
    .andThen(ignore);
}

/**
 * Create new space.
 */
export function create(): ResultAsync<void, Error> {
  return yabai("space", ["--create"])
    .andThen(ignore);
}

/**
 * Destory specified space.
 * if `target` is not pass, destory current space.
 *
 * @param target destory target identifier
 */
export function destroy(target?: Space): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--destroy"])
    .andThen(ignore);
}

/**
 * Move some space to other index.
 * if `target` is not pass, move current space.
 *
 * @param moveTo index to move
 * @param target target space identifier
 */
export function move(
  moveTo: "prev" | "next" | number,
  target?: Space,
): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--move", `${moveTo}`])
    .andThen(ignore);
}

/**
 * Send space to some display.
 * if `target` is not pass, use current space.
 *
 * @param display index of display
 * @param target target space identifier
 */
export function send(
  display: number,
  target?: Space,
): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--display", `${display}`])
    .andThen(ignore);
}

/**
 * Label the space.
 *
 * @param target target space identifier
 * @param labelName name
 */
export function label(
  target: Space,
  labelName: string,
): ResultAsync<void, Error> {
  return yabai("space", [`${target}`, "--label", labelName])
    .andThen(ignore);
}

/**
 * Balance out all windows both horizontally and vertically to occupy the same space.
 * If target is not specified, balance current space.
 *
 * @param target target space identifier
 */
export function balance(target?: Space): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--balance"])
    .andThen(ignore);
}

/**
 * Flip the tree horizontally.
 * If target is not specified, flip current space.
 *
 * @param flipTo The way to flip
 * @param target target space identifier
 */
export function flip(
  flipTo: "x" | "y",
  target?: Space,
): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--mirror", `${flipTo}-axis`])
    .andThen(ignore);
}

/**
 * Rotate the window tree clock-wise.
 * If target is not specified, rotate current space.
 *
 * @param degree degree of rotate
 * @param target target space identifier
 */
export function rotate(
  degree: 90 | 180 | 270,
  target?: Space,
): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--rotate", `${degree}`])
    .andThen(ignore);
}

/**
 * Set layout of the space.
 * If target is not specified, set layout to current space.
 *
 * @param layout "bsp" or "float"
 * @param target target space identifier
 */
export function changeLayout(
  layout: "bsp" | "float",
  target?: Space,
): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--layout", `${layout}`])
    .andThen(ignore);
}

/**
 * Toggle padding | gap.
 *
 * @param toggleTo toggle target name
 * @param target: target space identifier
 */
export function toggle(
  toggleTo: "padding" | "gap",
  target?: Space,
): ResultAsync<void, Error> {
  return yabai("space", [`${target ?? ""}`, "--toggle", `${toggleTo}`])
    .andThen(ignore);
}

/**
 * Change padding of target space.
 *
 * @param type "relative" is adding to current padding, "absolute" is setting as new.
 * @param padding padding size. If yout omited some sides, set 0 as default.
 * @param target target space identifier
 */
export function changePadding(
  type: "relative" | "absolute",
  padding: { top?: number; bottom?: number; left?: number; right?: number },
  target?: Space,
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

  return yabai("space", [`${target ?? ""}`, "--padding", query])
    .andThen(ignore);
}

/**
 * Change gap of target space.
 *
 * @param type "relative" is adding to current padding, "absolute" is setting as new.
 * @param gap gap size.
 * @param target target space identifier
 */
export function changeGap(
  type: "relative" | "absolute",
  gap: number,
  target?: Space,
): ResultAsync<void, Error> {
  const normalizedType = type.substring(0, 3);
  const query = `${normalizedType}:${gap}`;
  return yabai("space", [`${target ?? ""}`, "--gap", query])
    .andThen(ignore);
}
