import { checkForName } from '../src/client/js/nameChecker';
describe('Testing the submit functionality', () => {
  test('Testing the checkforName() function', () => {
    let output = 'Mohammad';
    checkForName(output);
    expect(checkForName).toBeDefined();
  });
});
