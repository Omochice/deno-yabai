import { yabai } from "./core.ts";

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
export async function focus(
  place: Place,
  target?: number,
): Promise<void> {
  await yabai("window", [`${target ?? ""}`, "--focus", place]);
}

/**
 * Swap the window.
 * if `target` is not pass, use current window.
 *
 * @param place relative place with target
 * @param target target window identifier
 */
export async function swap(
  place: Place,
  target?: number,
): Promise<void> {
  await yabai("window", [`${target ?? ""}`, "--swap", place]);
}

/**
 * Warp the window.
 * if `target` is not pass, use current window.
 *
 * @param place relative place with target
 * @param target target window identifier
 */
export async function warp(
  place: Place,
  target?: number,
): Promise<void> {
  await yabai("window", [`${target ?? ""}`, "--warp", place]);
}

/**
 * Move the window.
 * if `target` is not pass, use current window.
 *
 * @param type whether relative or absolute
 * @param coordinate coordinate to move
 * @param target target window identifier
 */
export async function move(
  type: "relative" | "absolute",
  coordinate: { x?: number; y?: number },
  target?: number,
): Promise<void> {
  const normalizedType = type.substring(0, 3);
  const { x, y } = { ...{ x: 0, y: 0 }, ...coordinate };
  const query = `${normalizedType}:${x}:${y}`;
  await yabai("window", [`${target ?? ""}`, "--move", query]);
}

/**
 * Resize the window.
 * if `target` is not pass, use current window.
 *
 * @param type resize type
 * @param size size to increment or decrement
 * @param target target window identifier
 */
export async function resize(
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
): Promise<void> {
  const normalizedType = type === "absolute" ? type.substring(0, 3) : type;
  const { x, y } = { ...{ x: 0, y: 0 }, ...size };
  const query = `${normalizedType}:${x}:${y}`;
  await yabai("window", [`${target ?? ""}`, "--resize", query]);
}

/**
 * Grid the window.
 * if `target` is not pass, use current window.
 *
 * @param query grid query
 * @param target target window identifier
 */
export async function grid(
  query: {
    rows: number;
    cols: number;
    startX: number;
    startY: number;
    width: number;
    height: number;
  },
  target?: number,
): Promise<void> {
  const q = [
    query.rows,
    query.cols,
    query.startX,
    query.startY,
    query.width,
    query.height,
  ].map((e) => e.toString())
    .join(":");
  await yabai("window", [`${target ?? ""}`, "--resize", q]);
}

/**
 * Move the window to other display or space.
 * if `target` is not pass, use current window.
 *
 * @param type move destination
 * @aparm query move destination query
 * @param target target window identifier
 */
export async function relocate(
  type: "display" | "space",
  query: Adjacent | Edge | number,
  target?: number,
): Promise<void> {
  await yabai("window", [`${target ?? ""}`, `--${type}`, query.toString()]);
}

/**
 * Zoom the window.
 * if `target` is not pass, use current window.
 *
 * @param type zoom type
 * @param target target window identifier
 */
export async function zoom(
  type: "zoom-parent" | "zoom-fullscreen" | "native-fullscreen",
  target?: number,
): Promise<void> {
  await yabai("window", [`${target ?? ""}`, "--toggle", type]);
}

/**
 * Toggle to split vertically or horizontally.
 * if `target` is not pass, use current window.
 *
 * @param target target window identifier
 */
export async function toggleSplit(
  target?: number,
): Promise<void> {
  await yabai("window", [`${target ?? ""}`, "--toggle", "split"]);
}

/**
 * Toggle window property.
 * if `target` is not pass, use current window.
 *
 * @param type property type
 * @param target target window identifier
 */
export async function toogleWindowProperty(
  type: "float" | "border" | "sticky",
  target?: number,
): Promise<void> {
  await yabai("window", [`${target ?? ""}`, "--toggle", type]);
}
