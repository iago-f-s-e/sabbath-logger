export type TriggerOutDTO = {
  name: string;
  method: string;
  params: unknown;
};

export type TriggerInDTO = {
  className: string;
  methodName: string;
  kind: string;
};
