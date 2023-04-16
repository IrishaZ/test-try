let baseUrl="https://mern-ecommerce.sdet.school/api";
const superagent=require('superagent');
const chai= require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const expect=chai.expect;
const casual=require('casual');
const clientAddress= require("../src/client/address")


describe ("Test adress endpoints", () =>{
let token;
let userId;
let userAddresses;
const reqBody= {
  email: "userprod@email.com",
  password: "Password1"
}

beforeEach(async ()=>{
    //login with
    try {
        const response= await superagent.post(baseUrl+"/auth/login").send(reqBody);
        token= response.body.token;
        userId=response.body.user.id
    } catch (error) {
        console.log("Catch message: ", error.message)
    }
});
  it ("Should  test log in, getting the token",()=>{
    console.log(token)})

  // Lesson 15
  it("should add address to user",async () =>{
        const {street,city,state, country} = casual;
        const zip = casual.zip(5)
        const addressOpt = {
          isDefault: true,
          address: street,
          city: city,
          state: state,
          country: country,
          zipCode: zip,
        }
        let response
        const opts = {
          token,
          address: addressOpt
        }
        try {
          response = await clientAddress.addAddress(opts)
        } catch(err){
          console.log(err.message)
        }
        console.log(response);
        expect(response.body).to.containSubset({
          success: true,
          message: 'Address has been added successfully!',
          address: {
            isDefault: true,
            address: street,
            city: city,
            state: state,
            country: country,
            zipCode: zip,
            user: userId,
            __v: 0
          }
        });
      })
})