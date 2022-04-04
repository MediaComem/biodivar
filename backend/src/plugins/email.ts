import Hapi from "@hapi/hapi";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
});

declare module "@hapi/hapi" {
    interface ServerApplicationState {
      email: any;
    }
  }

export const emailPlugin: Hapi.Plugin<null> = {
    name: "email",
    register: async function (server: Hapi.Server) {
        server.app.email = transporter;
    },
};
  