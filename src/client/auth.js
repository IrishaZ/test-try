const superagent = require('superagent');
const baseUrl = "https://mern-ecommerce.sdet.school/api";

/**
 * Login
 * 
 *  @param {object} opts - params passed in
 *  @param {string} opts.email - user's email
 *  @param {string} opts.password - user's password
 * 
 * @returns {Promise<object>}
 */
const login = (opts) =>{
    if(opts.email === null || opts.password=== null) {
        throw new Error("login: required param not passed");
    }
    const body = {
        email: opts.email,
        password: opts.password
    }
    return superagent.post(baseUrl+"/auth/login").send(body);
}
/**
 * Register
 * 
 *  @param {object} userInfo - params passed in
 *  @param {boolean} [userInfo.isSubscribed] - false by default
 *  @param {string} userInfo.email - user's email
 *  @param {string} userInfo.firstName - user's first name
 *  @param {string} userInfo.lastName - user's last name
 *  @param {string} userInfo.password - user's password
 * 
 * @returns {Promise<object>}
 */
const register = (userInfo) =>{
    if(userInfo.email === null || userInfo.password=== null) {
        throw new Error("login: required param not passed");
    }
    return superagent.post(baseUrl+"/auth/register").send(userInfo);
}
module.exports = {login, register};