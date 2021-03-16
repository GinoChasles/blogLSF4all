const { parseMultipartData,sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.article.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.article });
  },

  async comment(ctx) {
    let entity;
    if(ctx.is('multipart')) {
      const {data, files} = parseMultipartData(ctx);
      entity= await strapi.services.comment.create(data, {files});
    } else {
      ctx.request.body.author = ctx.state.user.id;
      ctx.request.body.article = ctx.params.id;
      entity= await strapi.services.comment.create(ctx.request.body);
    }
    return sanitizeEntity(entity, {model: strapi.models.comment});
}
};
