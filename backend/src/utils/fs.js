import { promises as fsp } from "fs";
import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readDataJson = async (name) => {
  const data = await fsp.readFile(
    path.join(__dirname, `../../data/${name}.json`)
  );
  return JSON.parse(data);
};
