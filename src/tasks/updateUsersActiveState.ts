import { UserModel } from "../models/user";

const updateUsersActiveState = async () => {
    const users = await UserModel.getAllUsers()
  
    console.log(users);
    
    for (const user of users) {
      if (user.subscription_type === 'free') {
        const registerDate = new Date(user.register_date);
        const today = new Date();
        const daysPassed = Math.floor((today.getTime() - registerDate.getTime()) / (1000 * 60 * 60 * 24));
        console.log(daysPassed);

        if (daysPassed >= 14) {
          user.active = 0;
          user.subscription_status = 0
          user.subscription_type = 'basic'
          await UserModel.updateUser(user) ;
        }
      } 
    }
  };

export {updateUsersActiveState}