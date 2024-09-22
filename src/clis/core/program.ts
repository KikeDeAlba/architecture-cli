import { Command } from "commander";
import { CreateProgramProps } from "./program.types";

export function createProgram(props: CreateProgramProps) {
  const program = new Command();

  program
    .name(props.name)
    .version(props.version)
    .description(props.description);

  return program;
}
