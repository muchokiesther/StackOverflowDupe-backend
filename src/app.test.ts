import  app  from "./server";
import request from 'supertest';
import {describe,it,expect} from 'vitest';
import { response } from 'express'


//register a new user test

describe('User test', ()=>{
    it.skip ('Should register a user', ()=>{
        return request(app).post('/users')
        .expect('Content-Type', /json/)
       .expect(201)
       .send({
        "userName":"joymk",
        "email":"maryjk@gmail.com",
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
    
    it.skip('Should get all users', () => {
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
   
    it.skip('Should not get user if email is wrong ',()=>{
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

    it.skip('Should update user by userid',()=>{
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
    
    it.skip('Should not update if userId is wrong ',()=>{
        return request(app)
        .put('/users/0168a7f-5883-4df0-8a19-2040e9970ab1')
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


    it.skip("Should be able to log in user with correct credentials", () => {
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
      

      it.skip("Should not be able to log in user with incorrect credentials", () => {
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
            );
          });
      });
      
})




describe('JWT Tests', ()=>{
    it.skip("Should not allow expired tokens", () => {
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
    it.skip("Should allow user to post question",()=>{
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
    

it.skip('Should not add if token was not provided',()=>{
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


it.skip('Should get all questions',()=>{
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

it.skip('Should get one question by questionId ',()=>{
    return request(app).get('/questions/ade3d320-c0ca-4cb6-bbc9-780aa986e2c0')
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

it.skip('Should not get  question by wrong questionId ',()=>{
    return request(app).get('/questions/adfse3d320-c0ca-4cb6-bbc9-780aa986e2c0')
    .expect(404)
    .expect("Content-Type", /json/)
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NWIwYzc5Ni1iMzNlLTQ1ZDgtYmRhMy03MmMyNjNmYzg5NDciLCJ1c2VyTmFtZSI6IlNvbnlhIiwiZW1haWwiOiJTb255YUBnbWFpbC5jb20iLCJyb2xlcyI6InVzZXIiLCJpc1Jlc2V0IjowLCJpYXQiOjE2ODczNDc4OTQsImV4cCI6MTY4NzUyMDY5NH0.NLsIbMoNjU7ER8oYHcz-s1EaYlF6nL-D_guaBoEwnwQ')
    .then((response: request.Response) => {
        expect(response.body).toEqual(
        
                expect.objectContaining({
           error:expect.stringContaining('Question not found')
                  
                }),
            
        );
    });

})

it.skip("Should allow user to update posted question",()=>{
    return request(app).put('/questions/55b0c796-b33e-45d8-bda3-72c263fc8947/ade3d320-c0ca-4cb6-bbc9-780aa986e2c0')
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



it("Should not  allow user to update posted question when given wrong IDs",()=>{
    return request(app).put('/questions/55b0c20796-bjjkjkfc8947/ade3d320-c0ca-4144kkkk;;5986e2c0')
    .expect(404)
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
                message:expect.stringMatching('Question not found')
              })
          });

})










})