import { $array, $boolean, $number, $object, $string } from "npm:lizod@0.2.6";

export const isSpace = $object({
  id: $number,
  uuid: $string,
  index: $number,
  label: $string,
  type: $string,
  display: $number,
  windows: $array($number),
  "first-window": $number,
  "last-window": $number,
  "has-focus": $boolean,
  "is-visible": $boolean,
  "is-native-fullscreen": $boolean,
});

const isFrame = $object({
  x: $number,
  y: $number,
  w: $number,
  h: $number,
});

export const isDisplay = $object({
  id: $number,
  uuid: $string,
  index: $string,
  frame: isFrame,
  spaces: $array($number),
});

export const isWindow = $object({
  id: $number,
  pid: $number,
  app: $string,
  title: $string,
  frame: isFrame,
  role: $string,
  subrole: $string,
  display: $number,
  space: $number,
  level: $number,
  opacity: $number,
  "split-type": $string,
  "split-child": $string,
  "stack-index": $number,
  "can-move": $boolean,
  "can-resize": $boolean,
  "has-focus": $boolean,
  "has-shadow": $boolean,
  "has-border": $boolean,
  "has-parent-zoom": $boolean,
  "has-fullscreen-zoom": $boolean,
  "is-native-fullscreen": $boolean,
  "is-visible": $boolean,
  "is-minimized": $boolean,
  "is-hidden": $boolean,
  "is-floating": $boolean,
  "is-sticky": $boolean,
  "is-topmost": $boolean,
  "is-grabbed": $boolean,
});
