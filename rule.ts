import { errAsync, ResultAsync } from "npm:neverthrow@8.2.0";
import { $array } from "npm:lizod@0.2.7";
import { yabai } from "./core.ts";
import { parse } from "./parse.ts";
import { isRule } from "./validator.ts";
import type { Rule } from "./type.ts";

class NotImplementError extends Error {}

export function add(): ResultAsync<never, Error> {
  return errAsync(new NotImplementError("add is not implmented yet"));
}

export function remove(): ResultAsync<never, Error> {
  return errAsync(new NotImplementError("remove is not implmented yet"));
}

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
