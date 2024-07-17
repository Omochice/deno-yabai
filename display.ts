import { ok, ResultAsync } from "npm:neverthrow@7.0.0";
import { yabai } from "./core.ts";
import type { DisplaySel } from "./type.ts";

/**
 * Focus the given display.
 *
 * @param query Command query
 * @param query.display Selceted display
 * @param query.target Display identifier
 */
export function focus(
  query: {
    display?: DisplaySel;
    target: DisplaySel;
  },
): ResultAsync<void, Error> {
  return yabai("display", [
    `${query?.display ?? ""}`,
    "--focus",
    `${query.target}`,
  ])
    .andThen(() => ok(undefined));
}
