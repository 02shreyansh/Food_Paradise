import {MailtrapClient} from "mailtrap";
import "dotenv/config"
export const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN!,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Home Tution",
};
