const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-email', (req, res) => {
    const { recipient, subject, message } = req.body;

    // Configura o transporter SMTP
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'gmail@gmail.com',
            pass: 'senha'
        }
    });

    // Define as opções do e-mail
    const mailOptions = {
        from: 'gmail@gmail.com',
        to: recipient,
        subject: subject,
        text: message
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ status: 'error', message: error.toString() });
        }
        res.json({ status: 'success', message: 'Email sent successfully!' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});