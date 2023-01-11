interface ICustomErrorPayloadType {
  code: number;
  message: string;
}

class CustomError extends Error {
  public payload: ICustomErrorPayloadType;

  constructor(payload: ICustomErrorPayloadType) {
    super();
    this.payload = payload;
  }
}

export { CustomError };
