export type PropControl =
  | { type: "input"; default: string }
  | { type: "select"; options: string[]; default: string }
  | { type: "boolean"; default: boolean };


