export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();
    const API_TOKEN = runtimeConfig.public.postmark;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': API_TOKEN,
    };

    let message;

    await $fetch(`https://api.postmarkapp.com/email`, {
      method: 'POST',
      body: event.req,
      headers: headers,
      duplex: 'half',
    })
      .then((response) => {
        message = response;
      })
      .catch((error) => {
        message = `Email failed to send, error: ${error}`;
      });

    return message;
  
});
