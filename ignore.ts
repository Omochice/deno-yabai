import { Ok, ok } from "npm:neverthrow@7.0.1";

/**
 * Ignore result value
 *
 * @returns The result
 */
export function ignore(): Ok<void, never> {
  return ok(undefined);
}
