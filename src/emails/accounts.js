const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'salimh5757@gmail.com',
    subject: 'Welcom to Task Manager!',
    text: `Hello ${name}. Welcome to Task Manager. Let me know how you get along with the app.`
  };
  sgMail.send(msg);
}

const sendCancelEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'salimh5757@gmail.com',
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}. We hope to see you back sometime soon.`
  };
  sgMail.send(msg);
}

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
}
