import * as cron from 'node-cron'
import { updateUsersActiveState } from './updateUsersActiveState';
console.log('LOAD CRON-TASKS');


cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running the scheduled task to check subscriptions...');
        // Call your function to check and update user states
        await updateUsersActiveState();
    
        console.log('Scheduled task completed.');
      } catch (error) {
        console.error('Error in the scheduled task:', error);
    }
})