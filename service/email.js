import nodemailer from 'nodemailer';
function email(email,subject,name,otp){
    console.log("Inside email function...");
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'poojarajput9516@gmail.com',
        pass: 'gqchoysqcvicybxf'
      }
    });
  console.log("Mausam");
    var mailOptions = {
      from: 'poojarajput9516@gmail.com',
      to: email,
      subject: subject,
      text:" Welcome "+name +" in a pustakalay application hope you enjoying our services\nThis is your otp number "+otp
    };
  
    transporter.sendMail(mailOptions, function (error, info){
        error ? console.log(error):response.send("Email has been sent to the user")
    });
    return true;
}
export default email;