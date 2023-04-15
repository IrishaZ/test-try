let baseUrl="https://mern-ecommerce.sdet.school/api";
const superagent=require('superagent');
const chai = require('chai');  
const expect = chai.expect; 

//lesson 12 my try with async/await
const reqBody= {
    email: "userprod@email.com",
    password: "Password1"
}
        
describe('Testing API',()=>{
    it('Should log in with correct email and password with async/await', async ()=>{
        try {
            const response = await superagent.post(baseUrl+"/auth/login").send(reqBody);
            const token = response.body.token;
            console.log(token);
        } catch (error) { error.message }
    })
  
        it("Should log in with correct email and password without then and catch", () => {
          return superagent
            .post(baseUrl + "/auth/login")
            .send(reqBody)
            .then((response) => {
              const token = response.body.token;
              console.log(token);
            })
            .catch((error) => {
              console.error(error);
            });
        });
        it('Should log in with correct email and password with end function', ()=>{
                         superagent.post(baseUrl+"/auth/login").send(reqBody).end((err, responce) => { 
                            if (err) {
                                console.error(err);
                              } else {
                                const resBody = responce.body;   
                                const token = resBody.token;
                                console.log(token);      
                                expect(resBody).to.have.property('token');
                              }
                            });
      
        })
})
// lesson 12 async/await

describe("Get product by slug name", ()=>{
    it("should return a product",  async () =>{
        const uri = "https://mern-ecommerce.sdet.school/api/product/item/air-jordan-1-travis-scott-reverse-mocha"
        
        const res = await superagent.get(uri);
        
        expect(res.body).to.eql({
            product: {
              taxable: true,
              isActive: true,
              brand: {
                isActive: true,
                _id: '63a39fac873c300037f226bd',
                name: 'Elite shoes',
                slug: 'elite-shoes'
              },
              _id: '63ea6339feac5600364e5265',
              sku: 'sdjghsdg',
              name: 'Air Jordan 1 travis scott Reverse Mocha',
              description: "Travis Scott and MJ's collab",
              quantity: 0,
              price: 1,
              imageUrl: 'https://mern-ecommerce-sdet-school.s3.amazonaws.com/travisSc.htm',
              imageKey: 'travisSc.htm',
              created: '2023-02-13T16:20:09.888Z',
              slug: 'air-jordan-1-travis-scott-reverse-mocha',
              __v: 0
            }
          })
    })
})


// homework lesson 12
 describe('Testing category',()=>
 {it (' Testing getting a products by id', async ()=>{
try{ 
  const result = await superagent.get('https://mern-ecommerce.sdet.school/api/category/63a52860873c300037f22dfd');
  console.log(result);
} catch {error.message}
})
})