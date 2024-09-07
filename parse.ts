import { err, ok, Result } from "npm:neverthrow@7.2.0";

export class ValidateError extends Error {}

/**
 * Parse json-like string to T
 *
 * @param text
 * @return parse result
 */
export function parse<T>(
  text: string,
  validator: (data: unknown) => data is T,
): Result<T, Error> {
  try {
    const json = JSON.parse(text);
    if (validator(json)) {
      return ok(json);
    }
    return err(new ValidateError("error"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return err(e);
    }
    return err(new Error("unknown error", { cause: e }));
  }
}
