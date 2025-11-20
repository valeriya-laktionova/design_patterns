export class InvalidDataError extends Error {
  constructor(message: string = 'Invalid data') {
    super(message);
    this.name = 'InvalidDataError';
    Object.setPrototypeOf(this, InvalidDataError.prototype); 
  }
}
