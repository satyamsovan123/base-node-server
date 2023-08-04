/**
 * This is the interface for the decoded JWT.
 * @property { number } exp is expiration time of the JWT.
 * @property { number } iat is issue time of the JWT.
 * @property { string } username is username extracted from the JWT.
 */
export interface DecodedJWT {
  /**
   * This is the expiration time of the JWT.
   */
  exp: number;
  /**
   * This is the issue time of the JWT.
   */
  iat: number;
  /**
   * This is the username extracted from the JWT.
   */
  username: string;
}
