import Hapi from "@hapi/hapi";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    port: Number(process.env.EMAIL_PORT),
    host: process.env.HOST_PROVIDER,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false 
    },
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
  