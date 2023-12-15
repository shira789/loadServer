// Mock data array of 1000 students
export const mockStudents = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Student ${index + 1}`,
  updated: 0
}));
