export class CreateAuthSessionDto {
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  ip: string;
}
