const nodemailer = require("nodemailer");

const envioEmail = async ({ nome, email, mensagem }) => {
    // Verifica se os campos existem e não são strings vazias
    if (!nome || !email || !mensagem || nome.trim() === "" || email.trim() === "" || mensagem.trim() === "") {
        throw new Error("Todos os campos são obrigatórios!");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Contato do portfólio - ${nome}`,
        html: `
            <div>
                <h2>Nova mensagem de contato</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${mensagem}</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.messageId);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
        throw new Error("Erro ao enviar o email");
    }
};

module.exports = { envioEmail };
