import { handleSubmit } from '../src/client/js/formHandler';
describe('Testing the submit functionality', () => {
  test('Testing the handleSubmit() function', () => {
    const submit =
      ('click',
      (e) => {
        handleSubmit(e);
      });
    expect(handleSubmit).toBeDefined();
  });
});
