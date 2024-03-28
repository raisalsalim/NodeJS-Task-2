import fs from "fs";

export const generateJSON = async (reportFile, conditionCounts) => {
    try {
        // Remove keys with zero count from conditionCounts
        const filteredConditionCounts = Object.fromEntries(
            Object.entries(conditionCounts).filter(([key, value]) => value !== 0)
        );
        // Write filtered condition counts to JSON file
        await fs.promises.writeFile(reportFile, JSON.stringify(filteredConditionCounts, null, 2));
        console.log(`Condition report saved to JSON file: ${reportFile}`);
    } catch (error) {
        console.error(`Error writing JSON report file:`, error);
    }
};
