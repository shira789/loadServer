
import { wait, randNumber } from './util.js';
import { calcGrade, buildMockStudents } from './students.js';
import { fastify } from 'fastify';
import fastifyMetrics from 'fastify-metrics';

const port = 3000;
let counter = 0;
let students = buildMockStudents(1000);
const app = fastify({ logger: false });
app.register(fastifyMetrics, { endpoint: '/metrics' });

// GET route to fetch all students
app.get('/students', async (request, reply) => {
  counter ++;
  await wait(counter / 1000);
  console.log({message: 'get', counter});
  return { counter, students };
});

// POST route to add a new student
app.post('/students/insert', async (request, reply) => {
  counter ++;
  const id = students.length + 1;

  const newStudent = {
    id, 
    name: `Student ${id}`,
    grade: calcGrade()
  };

  students.push(newStudent);
  console.log({message: 'post', counter});
  return { counter, message: 'Student added successfully', student: newStudent };
});

// PUT route to update an existing student by ID
app.put('/students/update', (request, reply) => {
  counter ++
  const studentId = randNumber(students.length);
  const index = students.findIndex((student) => student.id === studentId);
  
  if (index === -1) {
    reply.code(404).send({
       message: 'failed to update student',
       totalStudents: students.length,
       err: 'Student not found' 
      });
  };

  const updated = students[index].id + 1;

  students[index] = { 
    ...students[index],
    updated
  };

  console.log({message: 'put', counter});
  return { counter, message: 'Student updated successfully', student: students[index] };
});

// DELETE route to delete a student
app.delete('/students/remove', async (request, reply) => {
  counter ++;

  try {
    const removedStudent = students.splice(Math.floor(Math.random() * students.length), 1);
    console.log({message: 'delete', counter});
    return {counter, message: 'Student deleted successfully', removedStudent };
  }
  catch (err) {
    reply.status(404).send({
      message: 'failed to remove a student',
      err
    });
  };
});

// Start the server
app.listen(port, 'localhost', (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  };

  console.log(`Server is running at http://localhost:${port}`);
});
