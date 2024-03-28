// Function to check the condition of a product based on its short and long descriptions.
export const checkCondition = (shortDesc, longDesc) => {
  // Concatenate short and long descriptions and convert to lowercase for case-insensitive matching
  const lowerDesc = (shortDesc + " " + longDesc).toLowerCase();
  
  // Check if "refurb" or "refurbished" is present
  if (lowerDesc.includes("refurb")) {
    return "Refurbished";
  }
    
  // Check for other conditions
  else {
    const conditions = ["recertified", "renew", "remanufactured"];
    for (const condition of conditions) {
      if (lowerDesc.includes(condition)) {
        return condition.charAt(0).toUpperCase() + condition.slice(1); // Capitalize first letter
      }
    }
    return "New"; // Default condition
  }
};

// Function to format the condition string with the first letter capitalized.
export function formatCondition(condition) {
  return condition.charAt(0).toUpperCase() + condition.slice(1); // Capitalize first letter
}

