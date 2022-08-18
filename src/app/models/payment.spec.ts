import { Payment } from './payment';

describe('Payment', () => {
  it('should create an instance', () => {
    const p = new Payment('payment', 'details');
    expect(p).toBeTruthy();
  });
});
