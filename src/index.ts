import cron from 'node-cron'
import{ sendWelcomeEmail } from './EmailServices/Welcome'

cron.schedule(' */2 * * * * *' , async () => {
    await sendWelcomeEmail()
})