import { userName } from "./dataPond";
import { sendEmail } from "./notify";

export const mainProcess = (async () => {
  const sendFromEmailAddr: string = "yoursendfromemail@gmail.com";
  const sendToEmailAddr: any[] = [];
  const userNameArray = ["tri1", "tri2", "tri3"];
  let emailAddress;
  // Load sendToEmailAddr table
  userNameArray.forEach((element) => {
    emailAddress = userName.get(element);
    sendToEmailAddr.push(emailAddress);
  })
  const sendMailResult = await sendEmail(sendFromEmailAddr, sendToEmailAddr);
  return sendMailResult;
});