import { temp_mail_list } from "./temp_mail_list"

export const tempMailCheck = email => {
    const email_domain = email.split("@")[1];
    return temp_mail_list.includes(email_domain);
}