import { ResultAsync } from "npm:neverthrow@6.1.0";
import { yabai } from "./core.ts";
import { ignore } from "./ignore.ts";
import type { DirSel, DisplaySel, Layer, SpaceSel, WindowSel } from "./type.ts";

/**
 * Focus the given window.
 * If none specified, focus the selected window instead.
 *
 * @param target Relative place with target
 * @param selectedWindow Selected window
 */
export function focus(
  query?: {
    selectedWindow?: WindowSel;
    target?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${query?.selectedWindow ?? ""}`,
    "--focus",
    `${query?.target ?? ""}`,
  ])
    .andThen(ignore);
}

/**
 * Swap position of the selected window and the given window.
 *
 * @param target Relative place with target
 * @param selectedWindow Selected window
 */
export function swap(
  { target, selectedWindow }: {
    target: WindowSel;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--swap",
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Re-insert the selected window, splitting the given window.
 *
 * @param target target window identifier
 * @param selectedWindow Selected window
 */
export function warp(
  { target, selectedWindow }: {
    target: WindowSel;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--warp",
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Stack the given window on top of the selected window.
 * Any kind of warp operation performed on a stacked window will unstack it.
 *
 * @param target target window identifier
 * @param selectedWindow Selected window
 */
export function stack(
  { target, selectedWindow }: {
    target: WindowSel;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--stack",
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Set the splitting mode of the selected window.
 * If the current splitting mode matches the selected mode, the action will be undone.
 *
 * @param splitingMode The splitting mode
 * @aram selectedWindow Selected window
 */
export function insert(
  { splitingMode, selectedWindow }: {
    splitingMode: DirSel | "stack";
    selectedWindow: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--stack",
    `${splitingMode}`,
  ])
    .andThen(ignore);
}

/**
 * Set the frame of the selected window based on a self-defined grid.
 *
 * @param query grid query
 * @param target target window identifier
 */
export function grid(
  { query, selectedWindow }: {
    query: {
      rows: number;
      cols: number;
      startX: number;
      startY: number;
      width: number;
      height: number;
    };
    selectedWindow?: WindowSel;
  },
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
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--resize",
    q,
  ])
    .andThen(ignore);
}

// ---

/**
 * Move the window.
 * If type is "relative" the selected window is moved by dx pixels horizontally and dy pixels vertically, otherwise dx and dy will become its new position.
 *
 * @param type whether relative or absolute
 * @param coordinate coordinate to move
 * @param selectedWindow target window identifier
 */
export function move(
  { type, coordinate, selectedWindow }: {
    type: "relative" | "absolute";
    coordinate?: { x?: number; y?: number };
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  const normalizedType = type.substring(0, 3);
  const { x, y } = { ...{ x: 0, y: 0 }, ...coordinate };
  const query = `${normalizedType}:${x}:${y}`;
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--move",
    query,
  ])
    .andThen(ignore);
}

/**
 * Resize the selected window by moving the given handle dx pixels horizontally and dy pixels vertically.
 * If handle is abs the new size will be dx width and dy height and cannot be used on managed windows.
 *
 * @param type resize type
 * @param size size to increment or decrement
 * @param selectedWindow Selected window
 */
export function resize(
  { type, size, selectedWindow }: {
    type:
      | "absolute"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "top_left"
      | "top_right"
      | "bottom_left"
      | "bottom_right";
    size: { x?: number; y?: number };
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  const normalizedType = type === "absolute" ? type.substring(0, 3) : type;
  const { x, y } = { ...{ x: 0, y: 0 }, ...size };
  const query = `${normalizedType}:${x}:${y}`;
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--resize",
    query,
  ])
    .andThen(ignore);
}

/**
 * If type is rel the split ratio of the selected window is changed by dr, otherwise dr will become the new split ratio.
 * A positive/negative delta will increase/decrease the size of the left-child.
 */
export function ratio(
  { type, dr, selectedWindow }: {
    type: "absolute" | "relative";
    dr: number;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--ratio",
    `${type.substring(0, 3)}:${dr}`,
  ])
    .andThen(ignore);
}

/**
 * Zoom the window.
 * if `target` is not pass, use current window.
 *
 * @param type zoom type
 * @param selectedWindow target window identifier
 */
export function zoom(
  { type, selectedWindow }: {
    type: "zoom-parent" | "zoom-fullscreen" | "native-fullscreen";
    selectedWindow?: number;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--toggle",
    type,
  ])
    .andThen(ignore);
}

/**
 * Toggle to split vertically or horizontally.
 * if `target` is not pass, use current window.
 *
 * @param selectedWindow target window identifier
 */
export function toggleSplit(
  query?: {
    selectedWindow?: number;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${query?.selectedWindow ?? ""}`,
    "--toggle",
    "split",
  ])
    .andThen(ignore);
}

/**
 * Toggle window property.
 * if `target` is not pass, use current window.
 *
 * @param type property type
 * @param selectedWindow target window identifier
 */
export function toogleWindowProperty(
  { type, selectedWindow }: {
    type: "float" | "border" | "sticky";
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--toggle",
    type,
  ])
    .andThen(ignore);
}

/**
 * Set the stacking layer of the selected window.
 * The window will no longer be eligible for automatic change in layer when managed/unmanaged.
 * Specify the value auto to reset back to normal and make it become automatically managed.
 *
 * @param layer The layer
 * @param selectedWindow target window identifier
 */
export function layer(
  { layer, selectedWindow }: {
    layer: Layer;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--layer",
    layer,
  ])
    .andThen(ignore);
}

/**
 * Set the opacity of the selected window.
 * The window will no longer be eligible for automatic change in opacity upon focus change.
 * Specify the value 0.0 to reset back to full opacity and make it become automatically managed.
 *
 * @param opacity The opacity
 * @param selectedWindow target window identifier
 */
export function opacity(
  { opacity, selectedWindow }: {
    opacity: number;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    "--opacity",
    `${opacity}`,
  ])
    .andThen(ignore);
}

/**
 * Move the window to other display or space.
 * if `target` is not pass, use current window.
 *
 * @param type move destination
 * @aparm query move destination query
 * @param selectedWindow target window identifier
 */
export function relocate(
  { type, query, selectedWindow }: {
    type: "display";
    query: DisplaySel;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error>;
export function relocate(
  { type, query, selectedWindow }: {
    type: "space";
    query: SpaceSel;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error>;
export function relocate(
  { type, query, selectedWindow }: {
    type: "display" | "space";
    query: DisplaySel | SpaceSel;
    selectedWindow?: WindowSel;
  },
): ResultAsync<void, Error> {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    `--${type}`,
    query.toString(),
  ])
    .andThen(ignore);
}

/**
 * Minimizes the given window.
 * If none specified, minimize the selected window instead.
 * Only works on windows that provide a minimize button in its titlebar.
 *
 * @param query The command query
 * @param query.target The target window identifier
 * @param query.selectedWindow Selected window
 */
export function minimize(
  query?: {
    target?: WindowSel;
    selectedWindow?: WindowSel;
  },
) {
  return yabai("window", [
    `${query?.selectedWindow ?? ""}`,
    `--minimize`,
    `${query?.target ?? ""}`,
  ])
    .andThen(ignore);
}

/**
 * Restores the given window, if it is minimized.
 * The window will only get focus if the owning application has focus.
 * Note that you can also --focus a minimized window to restore it as the focused window.
 *
 * @param target The target window identifier
 * @param selectedWindow Selected window
 */
export function deminimize(
  { target, selectedWindow }: {
    target: WindowSel;
    selectedWindow?: WindowSel;
  },
) {
  return yabai("window", [
    `${selectedWindow ?? ""}`,
    `--deminimize`,
    `${target}`,
  ])
    .andThen(ignore);
}

/**
 * Closes the given window.
 * If none specified, close the selected window instead.
 * Only works on windows that provide a close button in its titlebar.
 *
 * @param query Command query
 * @param query.target The target window identifier
 * @param query.selectedWindow Selected window
 */
export function close(
  query?: {
    target?: WindowSel;
    selectedWindow?: WindowSel;
  },
) {
  return yabai("window", [
    `${query?.selectedWindow ?? ""}`,
    `--close`,
    `${query?.target ?? ""}`,
  ])
    .andThen(ignore);
}
