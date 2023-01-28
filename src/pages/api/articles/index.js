import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/articles.json",
    "utf8"
  );

  const articleObj = JSON.parse(fileContents).data;
  res.status(200).send(articleObj);
}
