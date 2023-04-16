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


//  it("should add address to user",async () =>{
//         const {street,city,state, country} = casual;
//         const zip = casual.zip(5)
//         const addressOpt = {
//           isDefault: true,
//           address: street,
//           city: city,
//           state: state,
//           country: country,
//           zipCode: zip,
  //           user: userId,
  //           __v: 0
//         }
//         let response
//         const opts = {
//           token,
//           address: addressOpt
//         }
//         try {
//           response = await clientAddress.addAddress(opts)
//         } catch(err){
//           console.log(err.message)
//         } 
//         console.log(response.body);
//         expect(response.body).to.containSubset({
//           success: true,
//           message: 'Address has been added successfully!',
//           address: {
//             isDefault: true,
//             address: street,
//             city: city,
//             state: state,
//             country: country,
//             zipCode: zip,
//             user: userId,
//             __v: 0
//           }
//         });
//       }) 

  // it.only("should register user",async()=>{
  //   userInfo={
  //     isSubscribed: true,
  //     email: "user1191151618287@email.com",
  //     firstName: "Harold",
  //     lastName: "Olsen",
  //     password: "Password1"
  //   }
  //   let response;
  //   let statusCode;
  //   try {
  //     response= await clientAuth.register(userInfo);
  //     console.log("Status code is:", response.statusCode);
  //   } catch (error) {throw new Error("User with this email is already exist ")
  //   }
  // })
  
//homework 14
it('Should test getting user addresses',async()=>{
  let addresses;
  try {
    response = await superagent.get(baseUrl+"/address").set({Authorization:token})
    userAddresses = response.body.addresses;
  } catch (error)  { console.log(error.message);}
})
it('Should test getting user address by id',async()=>{
  const addressId= userAddresses[0]._id;
  let resId
  try {
    response = await superagent.get(baseUrl+"/address/"+addressId).set({Authorization:token})
    resId=response.body.address._id;
  } catch (error)  { console.log(error.message);}
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

// it('Should test deleting user address by id',async()=>{
//   const addressId= userAddresses[0]._id;
//   let resBody
//   try {
//     response = await superagent.delete(baseUrl+"/address/delete/"+addressId).set({Authorization:token})
//     resBody=response.body;
//   } catch (error)  { console.log(error.message);}
//   expect(resBody).to.containSubset(
//     {
//       "success": true,
//       "message": "Address has been deleted successfully!",
//     }
//   )
// })

})