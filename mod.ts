import $ from "https://deno.land/x/dax@0.34.0/mod.ts";
import { err, ok, Result } from "npm:neverthrow@6.0.0";
import { $array } from "npm:lizod@0.2.6";
import type { Display, Space, Window } from "./type.ts";
import { isDisplay, isSpace, isWindow } from "./validator.ts";

/**
 * Get spaces
 *
 * @return Promise that return Space[] or Error
 */
export async function getSpaces(): Promise<Result<Space[], Error>> {
  try {
    const stdout = await $`yabai --message query --spaces`.json();
    if ($array(isSpace)(stdout)) {
      return ok(stdout);
    }
    return err(new Error("error"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return err(e);
    }
    return err(new Error("unknown error", { cause: e }));
  }
}

/**
 * Get displays
 *
 * @return Promise that return Display[] or Error
 */
export async function getDisplays(): Promise<Result<Display[], Error>> {
  try {
    const stdout = await $`yabai --message query --displays`.json();
    if ($array(isDisplay)(stdout)) {
      return ok(stdout);
    }
    return err(new Error("error"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return err(e);
    }
    return err(new Error("unknown error", { cause: e }));
  }
}

/**
 * Get windows
 *
 * @return Promise that return Window[] or Error
 */
export async function getWindows(): Promise<Result<Window[], Error>> {
  try {
    const stdout = await $`yabai --message query --windows`.json();
    if ($array(isWindow)(stdout)) {
      return ok(stdout);
    }
    return err(new Error("error"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return err(e);
    }
    return err(new Error("unknown error", { cause: e }));
  }
}
