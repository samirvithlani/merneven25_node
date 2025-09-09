const mailer = require("nodemailer")


//to,subject,text

const mailsend = async(to,subject,text)=>{

    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"pythonforsamir@gmail.com",
            pass:"zzdr mlhm vqnd pwva"
        }
    })

    const mailOptions = {
        from:"pythonforsamir@gmail.com",
        to:to,
        subject:subject,
        //text:text
        html:`<h1>Hi this is HTML TEST</h1>`
    }

    const mailresponse = await transporter.sendMail(mailOptions)
    console.log(mailresponse)

}

//mailsend("samir.vithlani83955@gmail.com","TEST MAIL","welcome to portal")
module.exports = {
    mailsend
}