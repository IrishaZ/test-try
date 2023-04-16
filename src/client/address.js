const superagent = require('superagent');

const baseUrl = "https://mern-ecommerce.sdet.school/api";


/**
 * Adding address to user
 * 
 *  @param {object} opts - params passed in
 *  @param {string} opts.token - user token
 *  @param {object} opts.address - user's address
 * 
 * @returns {Promise<object>}
 */
const addAddress = (opts) =>{
    const authHeader = {
        Authorization: opts.token
      }
    if(opts.token === null) {
        throw new Error("addAddress: token required param");
    }
    return superagent.post(baseUrl+"/address/add").set(authHeader).send(opts.address);
}

/** Get user addresses* 
 *  @param {string} opts.token - user token
 *  @returns {Promise<object>}
 */
const getAddresses = (opts) =>{
    const authHeader = {
        Authorization: opts.token
      }
    if(opts.token === null) {
        throw new Error("addAddress: token required param");
    }
    return superagent.get(baseUrl+"/address").set(authHeader)
}
/** Get user's address by id  
 *  @param {string} opts.token - user token
 * @param {string}  opts.addressId - id of the first address from list 
 *  @returns {Promise} 
 */
const getAddressesById = (opts) =>  {
    const authHeader = {
        Authorization: opts.token
      }
    if(opts.token === null) {
        throw new Error("addAddress: token required param");
    }
    return superagent.get(baseUrl+"/address/"+opts.addressId).set(authHeader)
}

/** Delete user's address by id  
 * @param {string} opts.token - user token
 * @param {string}  opts.addressId - id of the first address from list 
 * @returns {Promise} 
 */
const deleteAddressesById = (opts) =>  {
    const authHeader = {
        Authorization: opts.token
      }
    if(opts.token === null) {
        throw new Error("addAddress: token required param");
    }
    return superagent.delete(baseUrl+"/address/delete/"+opts.addressId).set(authHeader)
}



module.exports ={addAddress, 
                 getAddresses,
                 getAddressesById,
                 deleteAddressesById
                };