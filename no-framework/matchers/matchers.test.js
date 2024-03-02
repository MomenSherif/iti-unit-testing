import { user, todo, houseForSale } from './data';

// The simplest way to test a value is with exact equality.

test('toBe | compare primitive values or check referential identity of object instances', () => {
  // expect(2 + 2).toBe(4);

  expect(user.name).toBe('momen');

  // expect(user.skills).toBe(['html', 'css', 'js']); // fails
  const { skills } = user;
  expect(user.skills).toBe(skills);
});

test('toEqual | deep equality check', () => {
  expect(user).toEqual({
    // id: expect.any(String),
    name: 'momen',
    age: 27,
    skills: ['html', 'css', 'js'],
  });

  expect(user.skills).toEqual(['html', 'css', 'js']);
});

test('toBeCloseTo | compare floating point numbers for approximate equality', () => {
  // expect(0.1 + 0.2).toBe(0.3);
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});

test('toContain & toContainEqual | check if an array or iterable contains a particular item', () => {
  expect(user.skills).toContain('html');

  expect(houseForSale.livingRoom.couch).toContainEqual([
    'large',
    { dimensions: [20, 20] },
  ]);

  expect(user.skills).toEqual(expect.arrayContaining(['html', 'css']));
});

test('toMatch & toMatchObject', () => {
  expect('Hamada').toMatch(/hamada/i);
  expect(user).toMatchObject({ name: 'momen' });

  expect(todo.createdAt).toEqual(expect.any(Date));
});

test('playground', () => {
  // expect(user.name === 'mosmen').toBeTruthy(); // bad practice for error messages
  expect(user.age).toBeWithin(20, 30);
});
