export const copyPassword = (value: string) => {
  if (value) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        console.log('Password copied to clpboard');
      })
      .catch((err) => {
        console.log('Failed to copy password:', err);
      });
  }
};
