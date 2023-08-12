import { yabai } from "./core.ts";

/**
 * Focus the display
 *
 * @param target display identifier
 */
export async function focus(target: "recent" | "prev" | "next" | number) {
  await yabai("display", ["--forcus", `${target}`]);
}
