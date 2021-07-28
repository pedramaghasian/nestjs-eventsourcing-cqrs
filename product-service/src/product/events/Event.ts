export declare class Event<P = any> {
  readonly data: P;
  readonly eventId: any;
  // readonly correlationId?: any;
  // readonly causationId?: any;
  // readonly eventType: any;
  constructor(data: P, eventId?: any);
}
