import sgMail from '@sendgrid/mail'
import config from "../config/config";

if (config.sendgrid_api_key)
  sgMail.setApiKey(config.sendgrid_api_key)
else
  console.log('Wrong sendgridAPI (sendgrid.ts)')


export async function sendMessage(to: string, subject: string, text: string, html?: string | undefined) {
  const msg = {
    to: to,
    from: {
      name: 'WTC',
      email: config.sendgrid_verified_email || ''
    },
    subject: subject,
    text: text,
    html: html
  }
  await sgMail.send(msg)
}

export async function messageForUser(to: string, yourName: string, subject: string, text: string) {
  const msg = {
    to: to,
    from: {
      name: yourName,
      email: config.sendgrid_verified_email || ''
    },
    subject: subject,
    text: text,
  }
  await sgMail.send(msg)
}
