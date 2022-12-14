import { Calculator } from './test.service';
describe('test.service', () => {
  it('should add 2 numbers', () => {
    const service = new Calculator();
    expect(service.add(2, 2)).toBe(4);
  });
  it('should subtract 2 numbers', () => {
    const service = new Calculator();
    expect(service.subtract(2, 2)).toBe(0);
  });
  it('should multiply 2 numbers', () => {
    const service = new Calculator();
    expect(service.multiply(2, 2)).toBe(4);
  });
  it('should divide 2 numbers', () => {
    const service = new Calculator();
    expect(service.divide(2, 2)).toBe(1);
  });
});
