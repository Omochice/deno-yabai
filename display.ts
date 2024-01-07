import { ok, ResultAsync } from "npm:neverthrow@6.1.0";
import { yabai } from "./core.ts";

/**
 * Focus the display
 *
 * @param target display identifier
 */
export function focus(
  target: "recent" | "prev" | "next" | number,
): ResultAsync<void, Error> {
  return yabai("display", ["--forcus", `${target}`])
    .andThen(() => ok(undefined));
}
