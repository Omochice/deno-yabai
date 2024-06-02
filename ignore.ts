import { Ok, ok } from "npm:neverthrow@6.2.2";

/**
 * Ignore result value
 *
 * @returns The result
 */
export function ignore(): Ok<void, never> {
  return ok(undefined);
}
