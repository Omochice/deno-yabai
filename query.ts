import { err, Result } from "npm:neverthrow@6.0.0";
import { $array } from "npm:lizod@0.2.7";
import type { Display, Space, Window } from "./type.ts";
import { isDisplay, isSpace, isWindow } from "./validator.ts";
import { yabai } from "./core.ts";
import { parse } from "./parse.ts";

/**
 * Get spaces
 *
 * @return Promise that return Space[] or Error
 */
export async function getSpaces(): Promise<Result<Space[], Error>> {
  const result = await yabai("query", ["--spaces"]);
  if (result.isErr()) {
    return err(result.error);
  }
  return parse(result.value, $array(isSpace));
}

/**
 * Get displays
 *
 * @return Promise that return Display[] or Error
 */
export async function getDisplays(): Promise<Result<Display[], Error>> {
  const result = await yabai("query", ["--displays"]);
  if (result.isErr()) {
    return err(result.error);
  }
  return parse(result.value, $array(isDisplay));
}

/**
 * Get windows
 *
 * @return Promise that return Window[] or Error
 */
export async function getWindows(): Promise<Result<Window[], Error>> {
  const result = await yabai("query", ["--windows"]);
  if (result.isErr()) {
    return err(result.error);
  }
  return parse(result.value, $array(isWindow));
}
