let baseUrl="https://mern-ecommerce.sdet.school/api";
const superagent=require('superagent');
const chai= require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const expect=chai.expect;
const casual=require('casual');

describe ("Test adress endpoints", () =>{
let token;
beforeEach(async ()=>{
    //login with 
    const reqBody= {
        email: "userprod@email.com",
        password: "Password1"
      }
    try {
        const response= await superagent.post(baseUrl+"/auth/login").send(reqBody);
        token= response.body.token;
    } catch (error) { 
        console.log("Catch message: ", error.message)
    }
});
it ("Should  test log in, getting the token",()=>{
    console.log(token)})

it ("Should add the address to user", async()=>{
    const {street,city,state,country}=casual;
       // const street = casual.street;
        // const city = casual.city;
        // const state = casual.state;
    const zip = casual.zip(5);
    const addressOpt= {
        isDefault: true,
        address: street,
        city: city,
        state: state,
        country: country,
        zipCode: zip
      }
      console.log (addressOpt);
      let response;
      try {
        response= await superagent.post(baseUrl+"/address/add").
        set({
            Authorization:token
            })
            .send(addressOpt);
    } catch (error) {
        console.log("Catch message: ", error.message)        
    }
        console.log(response.body);
        expect(response.body).to.containSubset(
        {       success: true,
                message: 'Address has been added successfully!',
                address: {
                  isDefault: true,
                  address:street,
                  city: city,
                  state: state,
                  country: country,
                  zipCode: zip,
                  user: '63e533a79d6cab00365d83fe',
                  __v: 0}
          }
    )    
})
})
