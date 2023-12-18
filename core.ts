import $ from "https://deno.land/x/dax@0.36.0/mod.ts";
import { err, ok, Result } from "npm:neverthrow@6.1.0";

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
export async function yabai(
  category: Category,
  command: string[],
): Promise<Result<string, Error>> {
  const execCommand = [
    "yabai",
    "--message",
    category,
    ...command.filter((e) => e.length > 1),
  ];
  try {
    const stdout = await $`${execCommand}`.text();
    return ok(stdout);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return err(e);
    }
    return err(new Error("unknown error", { cause: e }));
  }
}
