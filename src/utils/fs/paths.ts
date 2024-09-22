import * as fs from "fs/promises";

export async function createPathIfNotExists(path: string) {
  const isPathExist = await validateIfPathExists(path);

  try {
    if (!isPathExist) {
      await fs.mkdir(path, { recursive: true });
    }
  } catch (error) {
    console.error("Error al crear el directorio...");
    throw error;
  }
}

export async function validateIfPathExists(path: string) {
  return await fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}
