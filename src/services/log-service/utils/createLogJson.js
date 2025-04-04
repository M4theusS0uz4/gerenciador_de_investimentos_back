export function createLogJson( log_id_user,log_type, log_description,log_details) {
     return {user_id:log_id_user,log_type:log_type,description:log_description,details:log_details};
}
