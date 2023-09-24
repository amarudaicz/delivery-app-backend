export const cleanUser = (user:any) => {

    const props = ['password', 'local_id', 'admin_table', 'admin', 'root', 'token']

    for (let prop of props) {
        delete user[prop]
    }

    return user

}