import { ResultAsync } from "npm:neverthrow@6.1.0";
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
export function list(): ResultAsync<Rule[], Error> {
  return yabai("rule", ["--list"])
    .andThen((txt) => {
      return parse(txt, $array(isRule));
    });
}
