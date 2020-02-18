import SES from 'aws-sdk/clients/ses';
const ses = new SES();

export const sendEmail = (async (sendFromEmailAddr: string, sendToEmailAddr: string[]) => {
  return new Promise<any>((resolve, reject) => {
    // tslint:disable-next-line: prefer-const
    let response = {
      status: "",
      data: ""
    };
    const title1 = "tittle1";
    const title2 = "tittle2";
    const title3 = "tittle3";
    const URLLink = "https://www.google.com/";
    const emailSubject = "Reminders";
    const htmlEmailFormat = `<!DOCTYPE html><html><body><h1 style='color:blue'> Heading Text </h1><p><font size='4'><u> title1: </u></font><font size='6'>${title1}</font></p><p><font size='4'><u> title2: </u></font><font size='5'>${title2}</font></p><p><font size='4'><u> title3: </u></font><font size='4'>${title3}</font></p><p><font size='4'><u> URL Link: </u></font><font size='5'>${URLLink}</font></p></body></html>`;
    const params = {
      Destination: {
        ToAddresses: sendToEmailAddr // Email address/addresses that you want to send your email
      },
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data: htmlEmailFormat
          },
          Text: {
            Charset: "UTF-8",
            Data: "No used" // This is no used for now.
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: emailSubject
        }
      },
      Source: sendFromEmailAddr
    };
    const sendEmailfunction = ses.sendEmail(params).promise();

    sendEmailfunction
      .then((data) => {
        response.status = "OK";
        response.data = data.MessageId;
        resolve(response);
      })
      .catch((error) => {
        console.log("sendEmailfunction errs: ", error);
        response.status = "Error";
        response.data = error;
        reject(response);
      });
  });

})