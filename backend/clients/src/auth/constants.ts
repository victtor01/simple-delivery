type JWT = {
  secret: string;
  access_token_expiration: string;
  refresh_token_expiration: string;
};

export const _jwtConstants = {
  secret: 'example',
  access_token_expiration: '1h',
  refresh_token_expiration: '1d',
} satisfies JWT;
