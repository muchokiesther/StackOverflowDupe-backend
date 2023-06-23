import  app  from "./server";
import request from 'supertest';
import {describe,it,expect} from 'vitest';
import { response } from 'express'


//register a new user test




describe('User test', ()=>{
    it .skip('Should register a user', ()=>{
        return request(app).post('/users')
        .expect('Content-Type', /json/)
       .expect(201)
       .send({
        "userName":"sam kathanga",
        "email":"kathanga13@gmail.com",
        "password":"Wamuyu@2023"
    })
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('User was successfully Registered!!')
                })
            )
        })
    })
    
    it('Should get all users', () => {
        return request(app)
            .get('/users')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
            .expect('Content-Type', /json/)
       
            .expect(200)
            .then((response: request.Response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            userId: expect.any(String),
                            userName: expect.any(String),
                            email: expect.any(String),
                            password: expect.any(String),
                            emailSent: expect.any(Number),
                            isDeleted: expect.any(Number),
                            roles: expect.any(String),
                        }),
                    ])
                );
            });
    });
   
    it('Should not get user if email is wrong ',()=>{
        return request(app)
        .get('/users/email/mumumumu@gmail.com')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response: request.Response) => {
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('User not found')
            })
        )

        })

    })

    it('Should update user by userid',()=>{
        return request(app)
        .put('/users/06768a7f-5883-4df0-8a19-2040e9970ab1')
        .expect('Content-Type', /json/)
        .expect(200)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
        .send({
            "userName":"vsvsvsv",
            "email":"vscode@gmail.com",
            "password":"Wamuyu@2023"
        }
        )
      
        .then((response: request.Response) => {
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('User updated successfully')
            })
        )

        })

    })
    
    it('Should not update if userId is wrong ',()=>{
        return request(app)
        .put('/users/0168a7f-5883-4df0-8xyxt9-2040e9970ab1')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
            "userName":"vsvsvsv",
            "email":"vscode@gmail.com",
            "password":"Wamuyu@2023"
        })
        .then((response: request.Response) => {
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('User not found')
            })
        )

        })


        

    })


    it("Should be able to log in user with correct credentials", () => {
        return request(app)
          .post('/users/login')
          .expect('Content-Type', /json/)
          .expect(200)
          .send({
            "email": "Sonya@gmail.com",
            "password": "Wamuyu@2023"
          })
          .then((response: request.Response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                token: expect.any(String)
              })
            );
          });
      });
      

      it("Should not be able to log in user with incorrect credentials", () => {
        return request(app)
          .post('/users/login')
          .expect('Content-Type', /json/)
          .expect(404)
          .send({
            "email": "Sonya@gmail.com",
            "password": "Wamuyu@20223"
          })
          .then((response: request.Response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                message:expect.stringMatching('User not Found')
              })
            )
          })
      })


      

      it('should throw a 403 if i pass a user token',()=>{
        return request(app).delete('/users/06768a7f-5883-4df0-8a19-2040e9970ab1')
        .expect(403)
        .expect('Content-Type', /json/)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Unauthorized access')
                })
            )
        })
    })

    it('Should  get user by email ',()=>{
        return request(app)
        .get('/users/email/mucho.ijones@gmail.com')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.arrayContaining([
                 expect.objectContaining({
                    userId:expect.any(String),
                     userName:expect.any(String),
                     roles:expect.any(String),
                     password:expect.any(String),
                     isDeleted:expect.any(Number),
                     emailSent:expect.any(Number),
                     isReset:expect.any(Number)
                 })
                ])
            )
         })
     })

     it('Should  get user by Id ',()=>{
        return request(app)
        .get('/users/06768a7f-5883-4df0-8a19-2040e9970ab1')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
             
                 expect.objectContaining({
                    userId:expect.any(String),
                     userName:expect.any(String),
                     roles:expect.any(String),
                     password:expect.any(String),
                     isDeleted:expect.any(Number),
                     emailSent:expect.any(Number),
                     isReset:expect.any(Number)
                 })
              
            )
         })
     })

     it('Should delete User only when  given a correct Id',()=>{
        return request(app).delete('/users/ecbfc1ae-b651-49e3-8ce7-62408a635c11')
        .expect('Content-Type', /json/)
        .expect(404)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5Yzg2N2ZiZC1hNjk3LTRjYTItODA3NS1kYzI5YzQ2ZGY1MWUiLCJ1c2VyTmFtZSI6Im11Y2hva2llc3RoZXIiLCJlbWFpbCI6Im11Y2hva2lAZ21haWwuY29tIiwicm9sZXMiOiJhZG1pbiIsImlzUmVzZXQiOjAsImlhdCI6MTY4NzM4MDczMCwiZXhwIjoxNjg3NTUzNTMwfQ.xx1YZ15YqsIgwl57dvltNRAeXAYX6BNpx0Z_wYzg8ac')
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
            expect.objectContaining({
              message:expect.stringMatching("User does not exist")
            })
          )
          })
        })
      
})




describe('JWT Tests', ()=>{
    it("Should not allow expired tokens", () => {
        return request(app)
          .post('/questions/e5ea9859-ebde-4570-a68c-73e45b2099cc')
          .expect(403)
          .expect('Content-Type', /json/)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NWIwYzc5Ni1iMzNlLTQ1ZDgtYmRhMy03MmMyNjNmYzg5NDciLCJ1c2VyTmFtZSI6IlNvbnlhIiwiZW1haWwiOiJTb255YUBnbWFpbC5jb20iLCJyb2xlcyI6InVzZXIiLCJpc1Jlc2V0IjowLCJpYXQiOjE2ODczNDM3OTQsImV4cCI6MTY4NzM0Mzk5NH0.eU4s3yIdlqizv4d8bjBLtFJvX-vlXGzNvIEgKAHImYY')
          .send({
            "title": "Hey i just wanted to know how to used JSON",
            "body": "lorem lorem lorem88",
            "TAGS": [{"tagId": 2, "tagName": "HTML"}]
          })
          .then((response: request.Response) => {
            expect(response.body).toEqual(
              expect.stringMatching("jwt expired")
            
            );
          });
      });
      
})


describe('Questions Test',()=>{
    it("Should allow user to post question",()=>{
        return request(app).post('/questions/e5ea9859-ebde-4570-a68c-73e45b2099cc')
        .expect(201)
        .expect("Content-Type", /json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
        .send(
            {
                "title": "Hey i just wanted to know how to used JSON",
                "body": "lorem lorem lorem88",
                "TAGS":[{"tagId":2,"tagName":"HTML"}]
              })
              .then((response: request.Response) => {
                expect.objectContaining({
                    message:expect.stringMatching('Question added successfully')
                  })
              });

    })


 


    

it('Should not add if token was not provided',()=>{
    return request(app)
    .post('/questions/e5ea9859-ebde-4570-a68c-73e45b2099cc')
    .expect("Content-Type", /json/)
    .send(
        {
            "title": "Hey i just wanted to know how to used JSON",
            "body": "lorem lorem lorem88",
            "TAGS":[{"tagId":2,"tagName":"HTML"}]
          })
          .then((response: request.Response) => {
            expect.objectContaining({
                message:expect.stringMatching('Unauthorized')
              })
          });
    
})


it('Should get all questions',()=>{
    return request(app).get('/questions')
  
    .expect(200)
    .expect("Content-Type", /json/)
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
    .then((response: request.Response) => {
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    body:expect.any(String),
                    questionsId:expect.any(String),
                    tagId:expect.any(String),
                    tagName:expect.any(String),
                    title:expect.any(String)
                  
                  
                 
                }),
            ])
        );
    });
    
})

it('Should get one question by questionsId ',()=>{
    return request(app).get('/questions/f3514b14-a7c4-41f4-8867-aa389246b694')
    .expect(200)
    .expect("Content-Type", /json/)
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NWIwYzc5Ni1iMzNlLTQ1ZDgtYmRhMy03MmMyNjNmYzg5NDciLCJ1c2VyTmFtZSI6IlNvbnlhIiwiZW1haWwiOiJTb255YUBnbWFpbC5jb20iLCJyb2xlcyI6InVzZXIiLCJpc1Jlc2V0IjowLCJpYXQiOjE2ODczNDc4OTQsImV4cCI6MTY4NzUyMDY5NH0.NLsIbMoNjU7ER8oYHcz-s1EaYlF6nL-D_guaBoEwnwQ')
    .then((response: request.Response) => {
        expect(response.body).toEqual(
        
                expect.objectContaining({
                    body:expect.any(String),
                    questionsId:expect.any(String),
                    tagId:expect.any(String),
                    tagName:expect.any(String),
                    title:expect.any(String)
                }),
            
        );
    });

})

it('Should not get  question by wrong questionId ',()=>{
    return request(app).get('/questions/N-a0c4-608e6f4530c2')
    .expect(404)
    .expect("Content-Type", /json/)
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
    .then((response: request.Response) => {
        expect(response.body).toEqual(
        
                expect.objectContaining({
           error:expect.stringContaining('Question not found')
                  
                }),
            
        );
    });

})

it("Should allow user to update posted question",()=>{
    return request(app).put('/questions/d84acfe2-c9a8-400c-8c6a-ef537c0b7be9/f3514b14-a7c4-41f4-8867-aa389246b694')
    .expect(200)
    .expect("Content-Type", /json/)
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NWIwYzc5Ni1iMzNlLTQ1ZDgtYmRhMy03MmMyNjNmYzg5NDciLCJ1c2VyTmFtZSI6IlNvbnlhIiwiZW1haWwiOiJTb255YUBnbWFpbC5jb20iLCJyb2xlcyI6InVzZXIiLCJpc1Jlc2V0IjowLCJpYXQiOjE2ODczNDc4OTQsImV4cCI6MTY4NzUyMDY5NH0.NLsIbMoNjU7ER8oYHcz-s1EaYlF6nL-D_guaBoEwnwQ')
    .send(
        {
            "title": "A villian has risen",
            "body": "just cant center  a div hehehe lorem lorem88",
            "TAGS":[{"tagId":2,"tagName":"HTML"}]
          })
          .then((response: request.Response) => {
            expect.objectContaining({
                message:expect.stringMatching('Question updated successfully')
              })
          });

})



it("Should not  allow user to update posted question when given wrong userID",()=>{
    return request(app).put('/questions/414a66c1-0612-4933-9837-c9da132dabaa/ae0c6b0c-95c6-4b99-b15d-be40ac4b7e80')
    .expect(500)
    .expect("Content-Type", /json/)
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUxZjY2My1hMDNhLTQ4ZjktYWI1My1mYTcwNWRjMDY0YjciLCJ1c2VyTmFtZSI6IndhbXV5aXV1IiwiZW1haWwiOiJ3YW11eXV1dXVAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MjkzMzg0fQ.4JiVXWDY7I3h_mKj5HqyAMNoC5KYhpztC7J45mMmT18')
    .send(
        {
            "title": "A villian has risen",
            "body": "just cant center  a div hehehe lorem lorem88",
            "TAGS":[{"tagId":2,"tagName":"HTML"}]
          })
          .then((response: request.Response) => {
            expect.objectContaining({
               message:expect.stringMatching('Question not found')
              })
          });

})

it.skip('Should delete a Question', ()=>{
    return request(app).delete('/questions/e5ea9859-ebde-4570-a68c-73e45b2099cc/24f8dd4f-f267-4eda-9c24-7b73a1921659') 
    .expect(200)
    .expect("Content-Type", /json/)
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5Yzg2N2ZiZC1hNjk3LTRjYTItODA3NS1kYzI5YzQ2ZGY1MWUiLCJ1c2VyTmFtZSI6Im11Y2hva2llc3RoZXIiLCJlbWFpbCI6Im11Y2hva2lAZ21haWwuY29tIiwicm9sZXMiOiJhZG1pbiIsImlzUmVzZXQiOjAsImlhdCI6MTY4NzM4MDczMCwiZXhwIjoxNjg3NTUzNTMwfQ.xx1YZ15YqsIgwl57dvltNRAeXAYX6BNpx0Z_wYzg8ac')
    .then((response:request.Response)=>{
        expect(response.body).toEqual(
                expect.objectContaining({
                 message:expect.stringMatching('Question deleted successfully')
                })
            
           )
    })

})

})


describe('Answer tests', ()=>{
    it('Should add an answer to a question', ()=>{
        return request(app).post('/answer/414a66c1-0612-4933-9837-c9da132dabaa/c5334408-f59c-45af-9d4f-76a012e6a0e2')
         .expect(201)
        .expect('Content-Type', /json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTRhNjZjMS0wNjEyLTQ5MzMtOTgzNy1jOWRhMTMyZGFiYWEiLCJ1c2VyTmFtZSI6IkJlbGluZGEiLCJlbWFpbCI6ImJlbGluZGFAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MzUxNTExLCJleHAiOjE2ODc1MjQzMTF9.r7JqrMr8RkkDB8RxZIVeWvPfpjIFsQqDNu5YHrMR304')
      
       .send({
        "body":"hey devs what what what you did i wrong lemme show you how its done in a few"
       })
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Answer added successfully')
                })
            )
        })
    })

    it('Should get answer for question via ID', ()=>{
        return request(app).get('/answer/c5334408-f59c-45af-9d4f-76a012e6a0e2')
        .expect(200)
        .expect("Content-Type", /json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTRhNjZjMS0wNjEyLTQ5MzMtOTgzNy1jOWRhMTMyZGFiYWEiLCJ1c2VyTmFtZSI6IkJlbGluZGEiLCJlbWFpbCI6ImJlbGluZGFAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MzUxNTExLCJleHAiOjE2ODc1MjQzMTF9.r7JqrMr8RkkDB8RxZIVeWvPfpjIFsQqDNu5YHrMR304')
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        answerId:expect.any(String),
                        body:expect.any(String),
                        isDeleted:expect.any(Number),
                        isPreferred:expect.any(Number),
                        questionsId:expect.any(String),
                        totalVotes:expect.any(Number),
                        userId:expect.any(String)
                       
                    })
                ])
                
               )
        })
    })

})


describe('Comment tests', () => {
    it('Should add a comment to an answer', async () => {
     return request(app).post('/comments/9c867fbd-a697-4ca2-8075-dc29c46df51e/f9ea80e6-2da7-48a7-9d81-5f726b4c7017/805cc6d1-aec5-43ac-8ea8-966681848a99')
        .expect('Content-Type', /json/)
        .expect(201)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTRhNjZjMS0wNjEyLTQ5MzMtOTgzNy1jOWRhMTMyZGFiYWEiLCJ1c2VyTmFtZSI6IkJlbGluZGEiLCJlbWFpbCI6ImJlbGluZGFAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MzUxNTExLCJleHAiOjE2ODc1MjQzMTF9.r7JqrMr8RkkDB8RxZIVeWvPfpjIFsQqDNu5YHrMR304')
        .send({
          "body": "Hey, this is a comment!"
        })
  
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Comment added successfully')
                })
            )
        })
    
    })


    it('Should get all comments under teh spcific answerId', () => {
        return request(app)
            .get('/comments/805cc6d1-aec5-43ac-8ea8-966681848a99')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTRhNjZjMS0wNjEyLTQ5MzMtOTgzNy1jOWRhMTMyZGFiYWEiLCJ1c2VyTmFtZSI6IkJlbGluZGEiLCJlbWFpbCI6ImJlbGluZGFAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MzUxNTExLCJleHAiOjE2ODc1MjQzMTF9.r7JqrMr8RkkDB8RxZIVeWvPfpjIFsQqDNu5YHrMR304')
            .expect('Content-Type', /json/)
       
            .expect(200)
            .then((response: request.Response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            commentId: expect.any(String),
                            userId: expect.any(String),
                            questionsId: expect.any(String),
                            answerId: expect.any(String),
                            body: expect.any(String),
                        }),
                    ])
                )
            })
    })

    
  })
  
  describe('Tags test', ()=>{
    it('Should get all Tags ', ()=>{
        return request(app).get('/tags')
        .expect('Content-Type', /json/)

        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTRhNjZjMS0wNjEyLTQ5MzMtOTgzNy1jOWRhMTMyZGFiYWEiLCJ1c2VyTmFtZSI6IkJlbGluZGEiLCJlbWFpbCI6ImJlbGluZGFAZ21haWwuY29tIiwicm9sZXMiOiJ1c2VyIiwiaXNSZXNldCI6MCwiaWF0IjoxNjg3MzUxNTExLCJleHAiOjE2ODc1MjQzMTF9.r7JqrMr8RkkDB8RxZIVeWvPfpjIFsQqDNu5YHrMR304')
       .expect(200)
       .then((response: request.Response) => {
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    tagId: expect.any(String),
                    tagName: expect.any(String),
                }),
            ])
        )
    })
})

})




