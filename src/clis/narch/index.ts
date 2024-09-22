#!/usr/bin/env node

import {
  CreateServiceProps,
  ServiceName,
} from "./commands/service/service.types";
import { createService } from "./commands/service/service";
import { createProgram } from "../core/program";

const program = createProgram({
  name: "narch",
  version: "1.0.0",
  description: "CLI para generar arquitectura de proyectos en NestJS.",
});

program
  .command("service <name>")
  .description("Crea un nuevo servicio.")
  .option(
    "-c, --config",
    "Crear con modulo de configuracion configuración.",
    false,
  )
  .option(
    "-dir --directory <directory>",
    "Directorio donde se creara el servicio.",
    `${process.cwd()}/src/services`,
  )
  .option("-l, --logger", "Crear con PinoLogger.", false)
  .action(async (name: ServiceName, options: CreateServiceProps) => {
    await createService(name, options);
  });

program.parse(process.argv);
