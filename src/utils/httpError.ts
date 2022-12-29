class HttpError extends Error {
  public code: number;

  public message: string;

  public name: string;

  constructor(code: number, message: string, name: string) {
    super();
    this.code = code;
    this.message = message;
    this.name = name;
  }
}
export default HttpError;
