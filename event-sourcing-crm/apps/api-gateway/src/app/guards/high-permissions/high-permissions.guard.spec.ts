import { HighPermissionsGuard } from './high-permissions.guard';

describe('HighPermissionsGuard', () => {
  it('should be defined', () => {
    expect(new HighPermissionsGuard()).toBeDefined();
  });
});
