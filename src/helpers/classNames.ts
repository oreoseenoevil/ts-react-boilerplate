const classNames = (...args: unknown[]): string => args.filter((value) => !!value).join(' ');

export default classNames;
