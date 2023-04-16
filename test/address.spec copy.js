let baseUrl="https://mern-ecommerce.sdet.school/api";
const superagent=require('superagent');
const chai= require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const expect=chai.expect;
const casual=require('casual');
const clientAddress= require("../src/client/address");
const clientAuth= require("../src/client/auth");


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
        const response= await clientAuth.login(reqBody);
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
//     userInfo={
//       isSubscribed: true,
//       email: "user1191151618287@email.com",
//       firstName: "Harold",
//       lastName: "Olsen",
//       password: "Password1"
//     }
//     let response;
//     let statusCode;
//     try {
//       response= await clientAuth.register(userInfo);
//       console.log("Status code is:", response.statusCode);
//     } catch (error) {throw new Error("User with this email is already exist ")
//     }
//   })
  
//homework 14
it('Should get user addresses',async()=>{
  let response;
  const opts = {
          token:token
        }
  try {
    response = await clientAddress.getAddresses(opts)
    // userAddresses = response.body.addresses;
  } catch (error)  { console.log(error.message);}
})

it('Should test getting user address by id',async()=>{
  const opts = {
    token:token,
  }
  const userAddresses=  await clientAddress.getAddresses(opts);
  const firstAddressId= userAddresses.body.addresses[0]._id;
  let expId=firstAddressId;
  let resId;
  const opts1 = {
    token:token,
    addressId:firstAddressId
  }
  try {
    const response = await clientAddress.getAddressesById(opts1)
    resId=response.body.address._id;
  } catch (error)  { console.log(error.message);}
  expect(resId).to.equal(expId)
})

it('Should test deleting user address by id',async()=>{
  const opts = {
    token:token,
  }
  const userAddresses=  await clientAddress.getAddresses(opts);
  const firstAddressId= userAddresses.body.addresses[0]._id;
  console.log("Number of addresses before deleting:",userAddresses.body.addresses.length);
  const opts1 = {
    token:token,
    addressId:firstAddressId
  }
  let response;
  try {
    response = await clientAddress.deleteAddressesById(opts1);
  } catch (error)  { console.log(error.message);}
  expect(response.body).to.containSubset(
    {
      "success": true,
      "message": "Address has been deleted successfully!",
    }
  )
  const userAddressesAfter=  await clientAddress.getAddresses(opts);
  console.log("Number of addresses before deleting:",userAddressesAfter.body.addresses.length);
})
})