import * as dotenv from 'dotenv'

const mod: string = process.env.NODE_ENV!
if (mod === 'prod')
  dotenv.config({path: __dirname + '/../../../../.env'})
else
  dotenv.config({path: __dirname + '/./../../.env'})


const static_path = __dirname + '../../../../../dist/wtc'
const send_file_path = mod === 'prod' ? '../../../../dist/wtc/' + '/index.html' : '../../dist/' + '/index.html'

const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  sendgrid_verified_email: process.env.SENDGRID_VERIFIED_SENDER,
  url: mod === 'dev' ? process.env.DEV_URL : process.env.PROD_URL,
  mongoURI: mod === 'dev' ? process.env.DEV_MONGO_URI : process.env.PROD_MONGO_URI,
  home_static_path: static_path,
  send_file_path: send_file_path,
  stripe_private_key: process.env.STRIPE_PRIVATE_KEY,
  stripe_end_point_secret: process.env.STRIPE_END_POINT_SECRET,
  time_format: {
     momentDateISOFormat: 'YYYY-MM-DD',
     momentDateCustomFormat: 'MM-DD-YYYY',
     momentTimeCustomFormat:'hh:mm a',
     momentTimeISOFormat: 'HH:mm'
  },
  roles: {
    admin: 'admin',
    member: 'member',
    nonMember: 'nonMember'
  }
};


export default config
