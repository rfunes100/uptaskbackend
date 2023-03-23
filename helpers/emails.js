import nodemailer from 'nodemailer';


export const emailRegistro = async  (datos) => {
const {email , nombre, token } = datos 

// href="${process.env.FRONTEND_URL}/confirmar/${token}" >comprobar cuenta



console.log('datos',datos)


const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST , // "smtp.mailtrap.io",
    port: process.env.EMAIL_PORT , // 2525,
  //  secure: false,
    auth: {
      user:  process.env.EMAIL_USER, // "cbd56cdabebffd",
      pass:  process.env.EMIAL_PASS  //"b34d7c3b18d7a9"
    },
  //  tls: {
   //     ciphers: 'SSLv3',
   //     rejectUnauthorized: false
  ////  },
 //   connectionTimeout: 5000, // Agregar tiempo de espera
 //  greetingTimeout: 1000,
 //  socketTimeout: 5000,
 //  debug: true, // show debug output
 //  logger: true // log information in console
  });

  // info de email
console.log('transport' , transport)

  const info  = await transport.sendMail({
    from: ' "uptask - adminitrador de proyecto" <cuentas@uptask.com>',
    to: email,
    subject: "uptask - confirmar cuenta",
    text: "comprueba cuenta en uptask",
    html: `<p> Hola: ${nombre}  comprueba tu cuenta en uptask </p>
    <p> cuenta ya esta casi lista, solo debe comprobar el siguiente enlace</p>

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">comprobar cuenta</a>
    
    <p> si tu no creastes esta cuenta puede hacer caso omiso del enlace</p>
    
           `

  }
  )

  console.log("Message sent: %s", info.messageId);

/*
 await transport.sendMail(info, function(error, info){
    if (error) {
        console.log( 'erro', error);
    } else {
        console.log('Correo electrónico enviado: ' + info.response);
    }
});

*/




  console.log('info', info)

};



export const emailolvidepassword = async  (datos) => {
    const {email , nombre, token } = datos 
    
    // href="${process.env.FRONTEND_URL}/confirmar/${token}" >comprobar cuenta
    
    
    
    console.log('datos',datos)
    
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST , // "smtp.mailtrap.io",
        port: process.env.EMAIL_PORT , // 2525,
      //  secure: false,
        auth: {
          user:  process.env.EMAIL_USER, // "cbd56cdabebffd",
          pass:  process.env.EMIAL_PASS  //"b34d7c3b18d7a9"
        },
      //  tls: {
       //     ciphers: 'SSLv3',
       //     rejectUnauthorized: false
      ////  },
     //   connectionTimeout: 5000, // Agregar tiempo de espera
     //  greetingTimeout: 1000,
     //  socketTimeout: 5000,
     //  debug: true, // show debug output
     //  logger: true // log information in console
      });
    
      // info de email
    console.log('transport' , transport)
    
      const info  = await transport.sendMail({
        from: ' "uptask - adminitrador de proyecto" <cuentas@uptask.com>',
        to: email,
        subject: "uptask - Restablee tu password",
        text: "comprueba cuenta en uptask",
        html: `<p> Hola: ${nombre}  ha solicitado restablecer tu passwrod</p>
        <p> siguiente enlace para generar nuevo password</p>
    
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password</a>
        
        <p> si tu no solicitastes este email, puede hacer caso omiso del enlace</p>
        
               `
    
      }
      )
    
      console.log("Message sent: %s", info.messageId);
    
    /*
     await transport.sendMail(info, function(error, info){
        if (error) {
            console.log( 'erro', error);
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
        }
    });
    
    */
    
    
    
    
      console.log('info', info)
    
    };
