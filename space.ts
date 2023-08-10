import $ from "https://deno.land/x/dax@0.34.0/mod.ts";

type Space = number | string;

/**
 * Focus the space.
 *
 * @param target focus target
 */
export async function focus(
  target: Space | "recent" | "prev" | "next",
): Promise<void> {
  await $`yabai --message space --focus ${target}`;
}

/**
 * Create new space.
 */
export async function create(): Promise<void> {
  await $`yabai --message space --create`;
}

/**
 * Destory specified space.
 * if `target` is not pass, destory current space.
 *
 * @param target destory target identifier
 */
export async function destroy(target?: Space): Promise<void> {
  await $`yabai --message space ${target ?? ""} --destroy`;
}

/**
 * Move some space to other index.
 * if `target` is not pass, move current space.
 *
 * @param moveTo index to move
 * @param target target space identifier
 */
export async function move(
  moveTo: "prev" | "next" | number,
  target?: Space,
): Promise<void> {
  await $`yabai --message space ${target ?? ""} --move ${moveTo}`;
}

/**
 * Send space to some display.
 * if `target` is not pass, use current space.
 *
 * @param display index of display
 * @return target target space identifier
 */
export async function send(display: number, target?: Space): Promise<void> {
  await $`yabai --message space ${target ?? ""} --display ${display}`;
}

/**
 * Label the space.
 *
 * @param target target space identifier
 * @param labelName name
 */
export async function label(target: Space, labelName: string): Promise<void> {
  await $`yabai --message space ${target} --label ${labelName}`;
}

/**
 * Balance out all windows both horizontally and vertically to occupy the same space.
 * If target is not specified, balance current space.
 *
 * @param target target space identifier
 */
export async function balance(target?: Space): Promise<void> {
  await $`yabai --message space ${target} --balance`;
}

/**
 * Flip the tree horizontally.
 * If target is not specified, flip current space.
 *
 * @param flipTo The way to flip
 * @param target target space identifier
 */
export async function flip(flipTo: "x" | "y", target?: Space): Promise<void> {
  await $`yabai --message space ${target} --mirror ${flipTo}-axis`;
}

/**
 * Rotate the window tree clock-wise.
 * If target is not specified, rotate current space.
 *
 * @param degree degree of rotate
 * @param target target space identifier
 */
export async function rotate(
  degree: 90 | 180 | 270,
  target?: Space,
): Promise<void> {
  await $`yabai --message space ${target ?? ""} --rotate ${degree}`;
}

/**
 * Set layout of the space.
 * If target is not specified, set layout to current space.
 *
 * @param layout "bsp" or "float"
 * @param target target space identifier
 */
export async function changeLayout(
  layout: "bsp" | "float",
  target?: Space,
): Promise<void> {
  await $`yabai --message space ${target ?? ""} --layout ${layout}`;
}

/**
 * Toggle padding | gap.
 *
 * @param toggleTo toggle target name
 * @param target: target space identifier
 */
export async function toggle(
  toggleTo: "padding" | "gap",
  target?: Space,
): Promise<void> {
  await $`yabai --message space ${target ?? ""} --toggle ${toggleTo}`;
}

/**
 * Change padding of target space.
 *
 * @param type "relative" is adding to current padding, "absolute" is setting as new.
 * @param padding padding size. If yout omited some sides, set 0 as default.
 * @param target target space identifier
 */
export async function changePadding(
  type: "relative" | "absolute",
  padding: { top?: number; bottom?: number; left?: number; right?: number },
  target?: Space,
): Promise<void> {
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
  await $`yabai --message space ${target ?? ""} --padding ${query}`;
}

/**
 * Change gap of target space.
 *
 * @param type "relative" is adding to current padding, "absolute" is setting as new.
 * @param gap gap size.
 * @param target target space identifier
 */
export async function changeGap(
  type: "relative" | "absolute",
  gap: number,
  target?: Space,
): Promise<void> {
  const normalizedType = type.substring(0, 3);
  const query = `${normalizedType}:${gap}`;
  await $`yabai --message space ${target ?? ""} --padding ${query}`;
}
