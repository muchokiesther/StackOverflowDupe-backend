
import joi from 'joi'


export const regSchema =  joi.object({
    userName:joi.string().required().min(2),
    email:joi.string().email().required(),
    password:joi.string().pattern((new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))),
   confirmPassword:joi.string().pattern((new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`)))
  

})

