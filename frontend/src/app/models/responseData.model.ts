/**
 * This is the interface for the response data that comes from the backend.
 * @property { string } username is title that comes from the backend.
 * @property { string } article is article that comes from the backend.
 * @property { string } article is title that comes from the backend.
 * @property { Date } createdAt is article that comes from the backend.
 */
export interface responseData {
  /**
   * This is the username that comes from the backend.
   */
  username: string;
  /**
   * This is the title that comes from the backend.
   */
  title: string;
  /**
   * This is the article that comes from the backend.
   */
  article: string;
  /**
   * This is the created date that comes from the backend.
   */
  createdAt: Date;
}
