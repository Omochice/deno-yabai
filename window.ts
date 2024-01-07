import { ResultAsync } from "npm:neverthrow@6.1.0";
import { yabai } from "./core.ts";
import { ignore } from "./ignore.ts";

type Direction =
  | "north"
  | "east"
  | "south"
  | "west";

type Adjacent = "prev" | "next";

type Edge = "first" | "last";

type Place =
  | Direction
  | Adjacent
  | Edge
  | "recent"
  | "mouse";

/**
 * Focus the window.
 * if `target` is not pass, use current window.
 * @FIXME I dont know focus spec well...
 * when receive target and place, work well??
 *
 * @param place relative place with target
 * @param target target window identifier
 */
export function focus(
  place: Place,
  target?: number,
): ResultAsync<void, Error> {
  return yabai("window", [`${target ?? ""}`, "--focus", place])
    .andThen(ignore);
}

/**
 * Swap the window.
 * if `target` is not pass, use current window.
 *
 * @param place relative place with target
 * @param target target window identifier
 */
export function swap(
  place: Place,
  target?: number,
): ResultAsync<void, Error> {
  return yabai("window", [`${target ?? ""}`, "--swap", place])
    .andThen(ignore);
}

/**
 * Warp the window.
 * if `target` is not pass, use current window.
 *
 * @param place relative place with target
 * @param target target window identifier
 */
export function warp(
  place: Place,
  target?: number,
): ResultAsync<void, Error> {
  return yabai("window", [`${target ?? ""}`, "--warp", place])
    .andThen(ignore);
}

/**
 * Move the window.
 * if `target` is not pass, use current window.
 *
 * @param type whether relative or absolute
 * @param coordinate coordinate to move
 * @param target target window identifier
 */
export function move(
  type: "relative" | "absolute",
  coordinate: { x?: number; y?: number },
  target?: number,
): ResultAsync<void, Error> {
  const normalizedType = type.substring(0, 3);
  const { x, y } = { ...{ x: 0, y: 0 }, ...coordinate };
  const query = `${normalizedType}:${x}:${y}`;
  return yabai("window", [`${target ?? ""}`, "--move", query])
    .andThen(ignore);
}

/**
 * Resize the window.
 * if `target` is not pass, use current window.
 *
 * @param type resize type
 * @param size size to increment or decrement
 * @param target target window identifier
 */
export function resize(
  type:
    | "absolute"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top_left"
    | "top_right"
    | "bottom_left"
    | "bottom_right",
  size: { x?: number; y?: number },
  target?: number,
): ResultAsync<void, Error> {
  const normalizedType = type === "absolute" ? type.substring(0, 3) : type;
  const { x, y } = { ...{ x: 0, y: 0 }, ...size };
  const query = `${normalizedType}:${x}:${y}`;
  return yabai("window", [`${target ?? ""}`, "--resize", query])
    .andThen(ignore);
}

/**
 * Grid the window.
 * if `target` is not pass, use current window.
 *
 * @param query grid query
 * @param target target window identifier
 */
export function grid(
  query: {
    rows: number;
    cols: number;
    startX: number;
    startY: number;
    width: number;
    height: number;
  },
  target?: number,
): ResultAsync<void, Error> {
  const q = [
    query.rows,
    query.cols,
    query.startX,
    query.startY,
    query.width,
    query.height,
  ].map((e) => e.toString())
    .join(":");
  return yabai("window", [`${target ?? ""}`, "--resize", q])
    .andThen(ignore);
}

/**
 * Move the window to other display or space.
 * if `target` is not pass, use current window.
 *
 * @param type move destination
 * @aparm query move destination query
 * @param target target window identifier
 */
export function relocate(
  type: "display" | "space",
  query: Adjacent | Edge | number,
  target?: number,
): ResultAsync<void, Error> {
  return yabai("window", [`${target ?? ""}`, `--${type}`, query.toString()])
    .andThen(ignore);
}

/**
 * Zoom the window.
 * if `target` is not pass, use current window.
 *
 * @param type zoom type
 * @param target target window identifier
 */
export function zoom(
  type: "zoom-parent" | "zoom-fullscreen" | "native-fullscreen",
  target?: number,
): ResultAsync<void, Error> {
  return yabai("window", [`${target ?? ""}`, "--toggle", type])
    .andThen(ignore);
}

/**
 * Toggle to split vertically or horizontally.
 * if `target` is not pass, use current window.
 *
 * @param target target window identifier
 */
export function toggleSplit(
  target?: number,
): ResultAsync<void, Error> {
  return yabai("window", [`${target ?? ""}`, "--toggle", "split"])
    .andThen(ignore);
}

/**
 * Toggle window property.
 * if `target` is not pass, use current window.
 *
 * @param type property type
 * @param target target window identifier
 */
export function toogleWindowProperty(
  type: "float" | "border" | "sticky",
  target?: number,
): ResultAsync<void, Error> {
  return yabai("window", [`${target ?? ""}`, "--toggle", type])
    .andThen(ignore);
}
