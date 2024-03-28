import fs from "fs";

export const generateCSV = async (outputFile, productData) => {
    const csvHeaders = "SKU,Short description,Long description,Category,Condition\n";
    const csvContent = productData.map(
      (product) => `${product.sku},${product.shortDesc},${product.longDesc},${product.category},${product.condition}\n`
    ).join("");

    try {
        await fs.promises.writeFile(outputFile, csvHeaders + csvContent);
        console.log(`Products data saved to CSV file: ${outputFile}`);
    } catch (error) {
        console.error(`Error writing CSV file:`, error);
    }
};
