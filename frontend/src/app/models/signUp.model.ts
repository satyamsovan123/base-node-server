/**
 * This is the interface for the sign up data.
 * @property { string } username is username of the user.
 * @property { string } password is password of the user.
 * @property { string | undefined } email is email of the user, which is optional.
 */
export interface signUp {
  /**
   * This is the email of the user. It is optional.
   * @optional
   */
  email?: string | undefined;
  /**
   * This is the username of the user.
   */
  username: string;
  /**
   * This is the password of the user.
   */
  password: string;
}
