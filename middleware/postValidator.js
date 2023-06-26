
// import { check, validationResult } from 'express-validator';

// export const postValidator = [
//   check('title').trim().not().isEmpty().withMessage("Post title is missing!"),
//   check('content').trim().not().isEmpty().withMessage(" Post Content  is missing!"),
//   check('meta').trim().not().isEmpty().withMessage("meta description is missing!"),
//   check('slug').trim().not().isEmpty().withMessage(" Post slug  is missing!"),
//   check('tags')
//     .isArray()
//     .withMessage("Tags must be array")
//     .custom((tags) => {
//       for (let t of tags){
//         if(typeof t!== "string"){
//           throw Error("Tags must be array of strings!");
//         }
//       }
//       return true;
//     })
// ];

// export const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors.array());
    
//   }
//   next();
// };
