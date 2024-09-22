import { styleCode } from "../../../../utils/formatters/style-code";
import { CreateServiceProps, ServiceName } from "./service.types";

export const formatServiceName = (serviceName: ServiceName) =>
  `${serviceName}Service`;
export const formatServiceModuleName = (serviceName: ServiceName) =>
  `${serviceName}Module`;
export const formatServiceConfigModuleName = (serviceName: ServiceName) =>
  `${serviceName}ConfigModule`;
export const formatServiceConfigName = (serviceName: ServiceName) =>
  `${serviceName}ConfigService`;

export async function generateServiceModuleContent(
  serviceName: ServiceName,
  props: CreateServiceProps,
  servicePath: string,
  configModulePath?: string,
) {
  const formattedServiceName = formatServiceName(serviceName);
  const formattedServiceConfigModuleName =
    formatServiceConfigModuleName(serviceName);
  const moduleName = formatServiceModuleName(serviceName);

  return await styleCode(`
        import { Module } from '@nestjs/common';
        import { ${formattedServiceName} } from '${servicePath.replace(".ts", "")}';
        ${props.config ? `import { ${formattedServiceConfigModuleName} } from '${configModulePath?.replace(".ts", "")}'` : ""}

        @Module({
            imports: [${props.config ? `${formattedServiceConfigModuleName}` : ""}],
            providers: [${formattedServiceName}],
            exports: [${formattedServiceName}],
        })
        export class ${moduleName} {}
    `);
}

export async function generateServiceContent(
  serviceName: ServiceName,
  props: CreateServiceProps,
  configServicePath?: string,
) {
  const formattedServiceName = formatServiceName(serviceName);
  const configServiceName = formatServiceConfigName(serviceName);

  return await styleCode(`
        import { Injectable } from '@nestjs/common';
        ${props.config ? `import { ${configServiceName} } from '${configServicePath?.replace(".ts", "")}';` : ""}
        ${props.logger ? `import { PinoLogger } from 'nestjs-pino';` : ""}

        @Injectable()
        export class ${formattedServiceName} {
            constructor(${props.config ? `private readonly config: ${configServiceName}` : ""}${props.logger ? `, private readonly logger: PinoLogger` : ""}) {}
        }
    `);
}

export async function generateServiceConfigModuleContent(
  serviceName: ServiceName,
  props: CreateServiceProps,
  configServicePath: string,
) {
  const formattedServiceConfigModuleName =
    formatServiceConfigModuleName(serviceName);
  const serviceConfigServiceName = formatServiceConfigName(serviceName);

  return await styleCode(`
        import { Module } from '@nestjs/common';
        import { ConfigModule } from '@nestjs/config';
        import { ${serviceConfigServiceName} } from '${configServicePath.replace(".ts", "")}';
        import configuration from './configuration';

        @Module({
            imports: [ConfigModule.forFeature(configuration)],
            providers: [${serviceConfigServiceName}],
            exports: [${serviceConfigServiceName}],
        })
        export class ${formattedServiceConfigModuleName} {}
    `);
}

export async function generateServiceConfigServiceContent(
  serviceName: ServiceName,
  props: CreateServiceProps,
) {
  const serviceConfigServiceName = formatServiceConfigName(serviceName);

  return await styleCode(`
        import { Injectable } from '@nestjs/common';
        import { ConfigService } from '@nestjs/config';
        ${props.logger ? `import { PinoLogger } from 'nestjs-pino'` : ""}

        @Injectable()
        export class ${serviceConfigServiceName} {
            constructor(private readonly configService: ConfigService${props.logger ? `, private readonly logger: PinoLogger` : ""}) {}
        }
    `);
}

export async function generateServiceConfigModuleConfigurationContent(
  configName: string,
) {
  return await styleCode(`
        import { registerAs } from '@nestjs/config';

        export default registerAs('${configName}', () => ({
            // Configuration here...
        }));
    `);
}
