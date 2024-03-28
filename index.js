// index.js

import fs from "fs";
import { parseTextFile } from "./src/parseCsv.js";
import { checkCondition, formatCondition } from "./src/helpers.js";

const outputFile = "products.csv";
const reportFile = "condition_report.json";

// Main function to process product data and generate CSV and JSON files.
const main = async () => {
  const productData = [];
  const conditionCounts = {};

  // Loop through input files
  for (let i = 1; i <= 14; i++) {
    const filename = `./data/file_${i}.txt`;
    try {
      const fileData = await parseTextFile(filename);
      fileData.forEach((line) => {
        if (line) {
          const [sku, shortDesc, longDesc, category] = line;
          const condition = formatCondition(checkCondition(shortDesc, longDesc));
          productData.push({ sku, shortDesc, longDesc, category, condition });
          conditionCounts[condition] = (conditionCounts[condition] || 0) + 1; // Update the count
        }
      });
    } catch (error) {
      console.error(`Error processing file ${filename}:`, error);
    }
  }

  // Generate CSV content
  const csvHeaders = "SKU,Short description,Long description,Category,Condition\n";
  const csvContent = productData.map(
    (product) => `${product.sku},${product.shortDesc},${product.longDesc},${product.category},${product.condition}\n`
  ).join("");

  // Write CSV file
  try {
    await fs.promises.writeFile(outputFile, csvHeaders + csvContent);
    console.log(`Products data saved to CSV file: ${outputFile}`);
  } catch (error) {
    console.error(`Error writing CSV file:`, error);
  }

  // Write JSON file
  try {
    // Remove keys with zero count from conditionCounts
    const filteredConditionCounts = Object.fromEntries(
      Object.entries(conditionCounts).filter(([key, value]) => value !== 0)
    );
    await fs.promises.writeFile(reportFile, JSON.stringify(filteredConditionCounts, null, 2));
    console.log(`Condition report saved to JSON file: ${reportFile}`);
  } catch (error) {
    console.error(`Error writing JSON report file:`, error);
  }
};

main(); // Call the main function to start the process
