import $ from "https://deno.land/x/dax@0.34.0/mod.ts";

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
): Promise<void> {
  const execCommand = [
    "yabai",
    "--message",
    category,
    ...command.filter((e) => e.length > 1),
  ].join(" ");
  await $`${execCommand}`;
}
