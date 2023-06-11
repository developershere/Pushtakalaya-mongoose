// import jwt from 'jsonwebtoken';
// export const verifyToken = async (request,response,next)=>{
//     try{
//         console.log("jwt called...")
//         let token = request.headers.authorization;
//         console.log(token+" : Token");
//     if(!token)
//         throw new Error();
//     jwt.verify(token,process.env.KEY_SECRET);
//     next();
//     }catch(err){
//         console.log(err);
//         return response.status(401).json({message : 'Un-authorized user',status:false});
//     }
// }