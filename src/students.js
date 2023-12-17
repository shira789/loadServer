
export const calcGrade = () => {
  let result = 0;

  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      // Simulate a complex mathematical operation
      result = Math.random();
    }
  }

  return result;
};

// Mock data array of 1000 students
export const buildMockStudents = (count) => (Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Student ${index + 1}`,
    updated: 0,
    grade: calcGrade()
  })
));
