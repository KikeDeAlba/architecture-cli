import prettier from "prettier";

export function styleCode(code: string) {
  return prettier.format(code, {
    parser: "typescript",
    semi: true,
    singleQuote: true,
    trailingComma: "all",
    useTabs: false,
    bracketSpacing: true,
    tabWidth: 4,
  });
}
