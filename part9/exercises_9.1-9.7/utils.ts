// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export default isNotNumber;
