'use strict';

module.exports = {
  /**
   * Promise to fetch authenticated user.
   * @return {Promise}
   */
  fetchAuthenticatedUser(id) {
    return strapi.query('user', 'users-permissions').findOne({ id }, ['snipcart_personas', 'snipcart_update_needed']);
  },
};