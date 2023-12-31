import {Request} from 'express'  

export  interface DecodedData {
   userId: string
   userName: string
   email: string
   password:string
   roles: string

}
export interface User{
    userId:string
    userName:string
    email:string
    password:string
    emailSent:number
    isDeleted:number
    roles:string
    
}

export interface UserExtendedRequest extends Request{
    body:{
        
        userId:string
        userName:string
        email:string
        password:string
        roles:string 
    }
    info?: DecodedData
    
}


export  interface questions {

    questionId:string
    userId:string
   title:string
    body:string
    tag:string
    isDeleted: number
}


export  interface questionsExtendedRequest extends Request {
    body: {      

        
        questionId:string
        userId:string
   title:string
    body:string
    TAGS:[]

    }
    info?: DecodedData
    params: {
        userId:string
        questionId:string
        
    }
  }


  export  interface answersExtendedRequest extends Request {
    body: {      
        answerId:string
        questionsId:string
        body:string
        userId:string
        isPreferred :string

    }
    info?: DecodedData
    params: {
        userId:string
        questionId:string
        answerId:string
    }
  }



  export interface commentsExtendedRequest extends Request {
  body: {
    commentId: string;
    userId: string;
    questionsId: string;
    answerId: string;
    body: string;
  };
  info?: DecodedData;
  params: {
    commentId: string;
    answerid: string;
    userId: string;
    questionsId:string;

  };
}


export  interface votesExtendedRequest extends Request {
  body: {
    voteId : string;
    answerId: string;
    userId: string;
    upVotes: number;
    downVotes: number;
  };
  info?: DecodedData;
  params: {
    voteId : string;
    answerId: string;
    userId: string;

  };
}


export interface Tag{
  tagId:string
  tagName:string
}
export interface tagsExtendedRequest extends Request {
  body: {
    tagId:string
    tagName:string
  };
  info?: DecodedData;
  params: {
    tagId:string
    tagName:string

  };
}




