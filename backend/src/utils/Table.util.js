export const validateFields = (fields, allowedFields, values) => {
  Object.keys(values).forEach((key) => {
    if (!allowedFields.includes(key)) {
      throw new Error(`Field ${key} is not allowed`);
    }
    const expectedType = fields[key];
    const actualValue = values[key];
    if (
      ["string", "email", "single select", "multiple select"].includes(
        expectedType
      )
    ) {
      if (actualValue !== null && typeof actualValue !== "string") {
        throw new Error(`Field ${key} should be a string`);
      }
    } else {
      if (actualValue !== null && typeof actualValue !== expectedType) {
        throw new Error(`Field ${key} should be a ${expectedType}`);
      }
    }
  });
};
