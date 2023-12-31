import { Ok, ok } from "npm:neverthrow@6.1.0";

/**
 * Ignore result value
 *
 * @returns The result
 */
export function ignore(): Ok<void, never> {
  return ok(undefined);
}
