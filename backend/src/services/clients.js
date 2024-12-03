import { readDataJson } from "../utils/fs.js";

export const getClients = async () => {
  return await readDataJson("clients");
};
