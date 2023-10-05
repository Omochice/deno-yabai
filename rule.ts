import { err, Result } from "npm:neverthrow@6.0.0";
import { $array } from "npm:lizod@0.2.7";
import { yabai } from "./core.ts";
import { parse } from "./parse.ts";
import { isRule } from "./validator.ts";
import type { Rule } from "./type.ts";

export async function add() {}

export async function remove() {}

/**
 * List registered rules.
 *
 * @return Promise that return Rule[] or Error
 */
export async function list(): Promise<Result<Rule[], Error>> {
  const result = await yabai("rule", ["--list"]);
  if (result.isErr()) {
    return err(result.error);
  }
  return parse(result.value, $array(isRule));
}
