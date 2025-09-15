const nodemailer = require("nodemailer");

const envioEmail = async ({ nome, email, mensagem }) => {
    if (!nome || !email || !mensagem) {
        throw new Error("Todos os campos são obrigatórios!");
    }

    const transporter = nodemailer.createTransport({
            
        service: 'gmail',
            auth: {
            user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
        },
    });

    const mailOptions ={
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Contato do portfólio - ${nome}`,
        html: `
        <div>
            <h2>Nova mensagem de contato</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${mensagem}</p>
        </div>
        `
    };
    await transporter.sendMail(mailOptions);
}
    module.exports = {envioEmail}

