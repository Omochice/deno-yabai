import $ from "https://deno.land/x/dax@0.36.0/mod.ts";
import { ResultAsync } from "npm:neverthrow@6.1.0";

export type Category =
  | "display"
  | "space"
  | "window"
  | "rule"
  | "signal"
  | "query";

/**
 * Execute yabai
 *
 * @param category command category name
 * @param command command body
 */
export function yabai(
  category: Category,
  command: string[],
): ResultAsync<string, Error> {
  const execCommand = [
    "yabai",
    "--message",
    category,
    ...command.filter((e) => e.length > 1),
  ];
  return ResultAsync.fromPromise($`${execCommand}`.text(), convertToError());
}

function convertToError(msg = "unknown error") {
  return (e: unknown): Error => {
    if (e instanceof Error) {
      return e;
    }
    return new Error(msg, { cause: e });
  };
}
