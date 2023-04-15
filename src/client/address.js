/** Adding address to user
 * @param {object} opts - params passed in
 * @param {string} opts.token - user token
 * @param {object} opts.address - user address
 * @return {Promise<object>}
 */
const superagent=require('superagent');
let baseUrl="https://mern-ecommerce.sdet.school/api";
const addAddress = (opts)=>{
    let response;
    const authHeader={Authorization:opts.token}
    if(opts.token===null){
        throw new Error("addAddress token required param")
    }
    return superagent.post(baseUrl+"/address/add").set(authHeader).send(opts.address);
    // response = await superagent.post(baseUrl+"/address/add").set(authHeader).send(opts.address);
    return response.body
}

module.exports={addAddress}