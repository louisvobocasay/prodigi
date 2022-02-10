export interface RequestContext {
  origin: string;
  host: string;
  timezone: string;
  originWithoutProtocol: string;
  ipAddress: string;
  language: string;
  userAgent: string;
}
