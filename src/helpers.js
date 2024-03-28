// Function to check the condition of a product based on its short and long descriptions.
export const checkCondition = (shortDesc, longDesc) => {
  const checkKeywords = (desc) => {
    if (!desc) {
      return null; // Return null if description is undefined or null
    }
    const lowerDesc = desc.toLowerCase();
    if (lowerDesc.includes("refurb")) {
      return "Refurbished";
    }
    const conditions = ["recertified", "renew", "remanufactured"];
    for (const condition of conditions) {
      if (lowerDesc.includes(condition)) {
        return condition.charAt(0).toUpperCase() + condition.slice(1); // Capitalize first letter
      }
    }
    return null; // Return null if no condition keyword is found
  };

  // Check condition keywords in short description
  const shortDescCondition = checkKeywords(shortDesc);
  if (shortDescCondition) {
    return shortDescCondition;
  }

  // Check condition keywords in long description
  const longDescCondition = checkKeywords(longDesc);
  if (longDescCondition) {
    return longDescCondition;
  }

  // Default condition
  return "New";
};

// Function to format the condition string with the first letter capitalized.
export function formatCondition(condition) {
  return condition.charAt(0).toUpperCase() + condition.slice(1); // Capitalize first letter
}
