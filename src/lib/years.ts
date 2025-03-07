export const getYearsOptions = (minimumYear: number) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - minimumYear }, (_, i) => {
    const year = currentYear - i; // Reverse order
    return { value: year, label: year.toString() };
  });
};
