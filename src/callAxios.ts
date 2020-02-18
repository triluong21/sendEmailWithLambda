import { AxiosSingleton } from "../singletons/AxiosSingleton"

export const listPRnumbers = (async (token: string, orgName: string, repoName: string) => {
  const baseUrl = "https://api.github.com";
  const basePath = "/repos/"
  const requestPath = "/pulls";
  let completeUrl = "";
  let result: any[] = [];
  // tslint:disable-next-line: prefer-const
  let response: any[] = [];
  completeUrl = baseUrl + basePath + orgName + "/" + repoName + requestPath
  result = await axiosGetAllPRs(completeUrl, token);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < result.length; i++) {
    response.push(result[i].number);
  };
  return response;
})

export const axiosGetAllPRs = (serviceUrl: string, accessToken: string) => {
  if (!serviceUrl) {
    throw new Error("The serviceUrl was not set.  Unable to make POST.");
  }
  const axios = AxiosSingleton.getInstance().getAxios();
  return new Promise<any[]>((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '.concat(accessToken),
    };
    axios.get(serviceUrl, { headers })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
        const errorResponse = {
          Error: error,
          Message: "No Data"
        }
        reject(errorResponse);
      });
  });
}

export const listPRinfo = (async (token: string, orgName: string, repoName: string, pullNumbers: number[]) => {
  const baseUrl = "https://api.github.com";
  const basePath = "/repos/"
  const requestPath = "/pulls";
  const slash = "/";
  let completeUrl = "";
  // tslint:disable-next-line: prefer-const
  let response: any[] = [];
  // tslint:disable-next-line: prefer-const
  let reviewerArray: any[] = [];
  // tslint:disable-next-line: prefer-const
  let workReviewerArray: any[] = [];
  // tslint:disable-next-line: prefer-const
  let teamArray: any[] = [];

  // tslint:disable-next-line: prefer-const
  let tableObject = {
    repository: "",
    title: "",
    prLink: "",
    loginUser: "",
    requestedReviewers: reviewerArray,
    requestedTeams: teamArray
  };
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < pullNumbers.length; i++) {
    completeUrl = baseUrl + basePath + orgName + "/" + repoName + requestPath + slash + pullNumbers;
    const result = await axiosGetEachPR(completeUrl, token);
    tableObject.repository = repoName;
    tableObject.title = result.title;
    tableObject.prLink = result.html_url;
    tableObject.loginUser = result.user.login;
    // tslint:disable-next-line: prefer-for-of
    for (let t = 0; t < result.requested_reviewers.length; t++) {
      workReviewerArray.push(result.requested_reviewers[t].login);
    }
    // Remove duplicates in workReviewerArray
    workReviewerArray.forEach((item) => {
      if (tableObject.requestedReviewers.indexOf(item) < 0) {
        tableObject.requestedReviewers.push(item);
      }
    });
    tableObject.requestedTeams = result.requested_teams;
    response.push(tableObject);
  }
  return response;
})

export const axiosGetEachPR = (serviceUrl: string, accessToken: string) => {
  if (!serviceUrl) {
    throw new Error("The serviceUrl was not set.  Unable to make POST.");
  }
  const axios = AxiosSingleton.getInstance().getAxios();
  return new Promise<any>((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '.concat(accessToken),
    };
    axios.get(serviceUrl, { headers })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
        const errorResponse = {
          Error: error,
          Message: "No Data"
        }
        reject(errorResponse);
      });
  });
}