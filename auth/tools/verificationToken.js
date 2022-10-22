const jwt = require('jsonwebtoken')
const ls = require('local-storage')

function verificationToken(access){
      return(req,res,next)=>{
       if(ls('token'))  //! déja stoker par le mot clé  token  (contr:  signin )
       {
           const t = ls('token');   
           console.log(t)
           const token = jwt.verify( t , process.env.SECRETWORD ) //!
           if(token)
           {
                req.data = token ;  //! contain data
                // console.log( req.data+'verification')
                // console.log(req.data.data.role)
                if( access.includes(req.data.data.role))  { next() }   // ! search about the role   
                else { res.send(' had role makynch')}
           }
           else
           {
             res.send('token not valid') 
           }
       } 
       else{ res.send('token not found ')}

      }
}

module.exports = {verificationToken}