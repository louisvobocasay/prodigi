export enum ApiEHeaders {
  ACCEPT_LANGUAGE = 'accept-language',
  AUTHORIZATION = 'authorization',
  REFRESH_TOKEN = 'refresh-token',
  FORWARDED_IP = 'x-forwarded-ip',
  USER_AGENT = 'user-agent',
  SOCKET_APP_ID = 'x-app-id',
  TIMEZONE = 'x-timezone',
}

export enum ApiEResponseNewTokenHeaders {
  NEW_ACCRESS_TOKEN = 'x-new-access-token',
  NEW_REFRESH_TOKEN = 'x-new-refresh-token',
  NEW_IAT = 'x-new-iat',
  NEW_EXP = 'x-new-exp',
}
