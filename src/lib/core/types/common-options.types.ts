export type CommonOptions = {
  kind?: string;
  isSync?: boolean;
  hideParams?: boolean;
  pipeParams?: (...params: any[]) => any;
};
