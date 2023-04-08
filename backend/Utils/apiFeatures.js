class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    //remove fields from the query
    const removefields = ["keyword", "limit", "page"];
    removefields.forEach((ele) => delete queryCopy[ele]);
    //advance filter for ratings, price
    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }
  pagination(resPerPage) {
    const targetPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (targetPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
module.exports = APIFeatures;
