'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  
    async update(ctx) {
        console.log(ctx)
        
      const { id } = ctx.params;
  
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.products.update({ id }, data, {
          files,
        });
      } else {
        entity = await strapi.services.restaurant.update({ id }, ctx.request.body);
      }
  
      return sanitizeEntity(entity, { model: strapi.models.restaurant });
    },
    
  };


