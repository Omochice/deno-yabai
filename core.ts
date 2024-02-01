import { err, ok, ResultAsync } from "npm:neverthrow@6.1.0";

const decoder = new TextDecoder();

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
  const com = new Deno.Command("yabai", {
    args: [
      "--message",
      category,
      ...command.filter((e) => e !== ""),
    ],
    stdout: "piped",
    stderr: "piped",
  });
  return ResultAsync.fromPromise(com.output(), convertToError())
    .andThen(
      ({ success, stdout, stderr }) =>
        success
          ? ok(decoder.decode(stdout))
          : err(new Error(decoder.decode(stderr))),
    );
}

function convertToError(msg = "unknown error") {
  return (e: unknown): Error => {
    if (e instanceof Error) {
      return e;
    }
    return new Error(msg, { cause: e });
  };
}
