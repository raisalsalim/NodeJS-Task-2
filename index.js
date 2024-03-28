import fs from "fs";
import { parseTextFile } from "./src/parseCsv.js";
import { checkCondition, formatCondition } from "./src/helpers.js";
import { generateCSV } from "./src/csvGenerator.js";
import { generateJSON } from "./src/jsonGenerator.js";

const outputFile = "products.csv";
const reportFile = "condition_report.json";

// Main function to process product data and generate CSV and JSON files.
const main = async () => {
  const productData = [];
  const conditionCounts = {};

  try {
    const files = fs.readdirSync('./data');
    for (const file of files) {
      if (file.endsWith('.txt')) {
        const filename = `./data/${file}`;
        try {
          const fileData = await parseTextFile(filename);
          fileData.forEach((line) => {
            if (line) {
              const [sku, shortDesc, longDesc, category] = line;
              const condition = formatCondition(checkCondition(shortDesc, longDesc));
              productData.push({ sku, shortDesc, longDesc, category, condition });
              conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
            }
          });
        } catch (error) {
          console.error(`Error processing file ${filename}:`, error);
        }
      }
    }

    // Generate CSV file
    await generateCSV(outputFile, productData);

    // Generate JSON file
    await generateJSON(reportFile, conditionCounts);
    
  } catch (error) {
    console.error('Error reading directory:', error);
  }
};

// Call the main function to start the process
main();
