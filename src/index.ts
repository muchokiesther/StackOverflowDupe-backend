import cron from 'node-cron'
import{ sendWelcomeEmail } from './EmailServices/Welcome'
import { sendPreferredEmail } from './EmailServices/preferred'


cron.schedule(' */2 * * * * *' , async () => {
    await sendWelcomeEmail()
    await sendPreferredEmail()
})