const getCurrentAge = (birthYear: string | number) => {
  const currentYear = new Date().getFullYear();
  if (typeof birthYear === "string") {
    birthYear = parseInt(birthYear);
  }
  return currentYear - birthYear;
};

export default getCurrentAge;
