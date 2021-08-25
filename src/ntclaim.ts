export interface NTClaim {
  ['https://www.naechtlichestheater.de/jwt/claims']: {
    userRoles: string[];
    inventarWriteAccess: boolean;
    isAuthenticated: boolean;
  };
}
