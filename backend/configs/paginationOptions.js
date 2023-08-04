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
