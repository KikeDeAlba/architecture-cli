import { kebabCaseFormat } from "../../../../utils/formatters/kebab-case";
import { createFile } from "../../../../utils/fs/files";
import {
  createPathIfNotExists,
  validateIfPathExists,
} from "../../../../utils/fs/paths";
import {
  generateServiceConfigModuleConfigurationContent,
  generateServiceConfigModuleContent,
  generateServiceConfigServiceContent,
  generateServiceContent,
  generateServiceModuleContent,
} from "./content";
import { CreateServiceProps, ServiceName } from "./service.types";

export async function createService(
  serviceName: ServiceName,
  props: CreateServiceProps,
) {
  console.log("Creando servicio...");
  await createPathIfNotExists(props.directory);

  const serviceKebabName = kebabCaseFormat(serviceName);
  const serviceFolderPath = `${props.directory}/${serviceKebabName}`;

  const isServiceFolderPathExists =
    await validateIfPathExists(serviceFolderPath);

  if (isServiceFolderPathExists) {
    console.error("El servicio ya existe...");
    return;
  }

  await createPathIfNotExists(serviceFolderPath);
  const configServiceFileName = `${serviceKebabName}-config.service.ts`;
  const configModuleName = `${serviceKebabName}-config.module.ts`;

  if (props.config) {
    const configFolderPath = `${serviceFolderPath}/config`;
    await createPathIfNotExists(configFolderPath);

    await createFile(
      `${configFolderPath}/configuration.ts`,
      await generateServiceConfigModuleConfigurationContent(serviceKebabName),
    );

    await createFile(
      `${configFolderPath}/${configServiceFileName}`,
      await generateServiceConfigServiceContent(serviceName, props),
    );

    await createFile(
      `${configFolderPath}/${configModuleName}`,
      await generateServiceConfigModuleContent(
        serviceName,
        props,
        `./${configServiceFileName}`,
      ),
    );

    console.log("Servicio de configuracion creado.");
  }

  const serviceFileName = `${serviceKebabName}.service.ts`;
  await createFile(
    `${serviceFolderPath}/${serviceFileName}`,
    await generateServiceContent(
      serviceName,
      props,
      `./config/${configServiceFileName}`,
    ),
  );

  const serviceModuleName = `${serviceKebabName}.module.ts`;
  await createFile(
    `${serviceFolderPath}/${serviceModuleName}`,
    await generateServiceModuleContent(
      serviceName,
      props,
      `./${serviceFileName}`,
      `./config/${configModuleName}`,
    ),
  );

  console.log("Servicio creado.");
}
