import sgMail from '@sendgrid/mail'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const sendgrid_api_key = runtimeConfig.public.sendgrid_api_key;
  const sendgrid_from = runtimeConfig.public.sendgrid_from;
  const sendgrid_to = runtimeConfig.public.sendgrid_to;

  sgMail.setApiKey(sendgrid_api_key)
  
  const msg = {
    to: `${sendgrid_to}`, //  your recipient
    from: `${sendgrid_from}`, //  your verified sender of sendgrid account
    subject: 'CONTACT FORM SUBMISSION',
    html: '<h2>testing</h2>'
  }

  if (event.req?.method === 'POST') {
    const body =  await readBody(event);
    msg.html = `<h2>${body.name}</h2>
                <h3>${body.email}</h3>
                <p>${body.message}</p>`
    msg.replyTo = `${body.email}`
  }
  try {
    await sgMail
      .send(msg)
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('error')
  }
});
