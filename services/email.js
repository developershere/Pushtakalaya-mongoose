import nodemailer from 'nodemailer';
function email(email,subject,name,otp){
    let flag = false;
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'mausamlodhi326@gmail.com',
        pass: 'hsdvaqracixzpuhv'
      }
    });
    var mailOptions = {
      from: 'mausamlodhi326@gmail.com@gmail.com',
      to: email,
      subject: subject,
      text:" Welcome "+name +" in a pustakalay application hope you enjoying our services\nThis is your otp number "+otp
    };
  
    transporter.sendMail(mailOptions, function (error, info){
        error ? flag = false : flag = true;
    });
    return flag;
}
export default email;