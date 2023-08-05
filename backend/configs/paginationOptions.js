/**
 * This object contains pagination options for mongoose-paginate-v2. Every option is set to false as we don't want to send these fields in the response.
 * @constant
 * @type {object}
 * @memberof module:configs
 */
const customLabels = {
  page: false,
  nextPage: false,
  prevPage: false,
  pagingCounter: false,
  meta: false,
  hasPrevPage: false,
  hasNextPage: false,
  totalPages: false,
};

/**
 * This object contains pagination options for mongoose-paginate-v2.
 * customLabels is used to hide the default labels from the response (from mongoose-paginate-v2).
 * select is used to select the fields to be returned in the response (from database).
 * @constant
 * @type {object}
 * @memberof module:configs
 */
let paginationOptions = {
  page: 1,
  limit: 3,
  offset: 0,
  select: "title article username createdAt -_id",
  sort: { createdAt: -1 },
  pagination: JSON.parse(process.env.USE_PAGINATION),
  customLabels: customLabels,
};

module.exports = { paginationOptions };
