import * as fs from "fs/promises";

export async function createFile(filePath: string, content: string) {
  try {
    await fs.writeFile(filePath, content);
  } catch (error) {
    console.error("Error al crear el archivo...");
    throw error;
  }
}

export async function extractContentFromFile(filePath: string) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error al leer el archivo...");
    throw error;
  }
}