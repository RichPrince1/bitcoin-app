const { blue, yellow, green, black, parse } = require("ansicolor");

const printString = (s, k = "") => `${blue.bright(s)}: ${k}`;
const printObj = (mainLabel, o) =>
  o
    ? Object.entries(o)
        .map(([label, value]) => {
          if (typeof value === "function")
            return printString(label, yellow.bright(typeof value));
          else if (typeof value === "object")
            return `\n${black.bright(label)}\n` + printObj(label, value);
          else return printString(label, green.bright(value));
        })
        .join("\n")
    : printString(mainLabel, green.bright(o));

export const log = (s, o) => {
  if (o) {
    console.group(...parse(`${black(s)}`).asChromeConsoleLogArguments);
    console.log(...parse(printObj(s, o)).asChromeConsoleLogArguments);
    console.groupEnd();
  }
};
