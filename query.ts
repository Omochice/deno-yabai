import { ResultAsync } from "npm:neverthrow@8.0.0";
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
export function getSpaces(): ResultAsync<Space[], Error> {
  return yabai("query", ["--spaces"])
    .andThen((txt) => {
      return parse(txt, $array(isSpace));
    });
}

/**
 * Get displays
 *
 * @return Promise that return Display[] or Error
 */
export function getDisplays(): ResultAsync<Display[], Error> {
  return yabai("query", ["--displays"])
    .andThen((txt) => {
      return parse(txt, $array(isDisplay));
    });
}

/**
 * Get windows
 *
 * @return Promise that return Window[] or Error
 */
export function getWindows(): ResultAsync<Window[], Error> {
  return yabai("query", ["--windows"])
    .andThen((txt) => {
      return parse(txt, $array(isWindow));
    });
}
