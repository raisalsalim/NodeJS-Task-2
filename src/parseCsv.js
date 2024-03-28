// parseCsv.js

import fs from "fs";

// Function to parse text file data and extract product information.
async function parseTextFile(filename) {
  try {
    const data = [];
    const content = await fs.promises.readFile(filename, "utf-8");
    // Skip the header line and remove leading/trailing spaces and pipes, then split by "~"
    const lines = content.split("\n").slice(2, -1).map(line => line.replace(/^[\s|]+|[\s|]+$/g, '').split(/(?<! )~(?! )/).map(field => field.trim()));
    lines.forEach((line) => {
      if (line) {
        const [sku, shortDesc, longDesc, category] = line;
        const existingSKU = data.find(item => item[0] === sku); // Check if SKU already exists
        if (!existingSKU) {
          data.push([sku, shortDesc, longDesc, category]); // Push each unique row as an array
        }
      }
    });
    return data;
  } catch (error) {
    console.error(`Error parsing file ${filename}:`, error);
    throw error; // Re-throw for handling in main function
  }
}

export { parseTextFile }; // Exporting the parseTextFile function
