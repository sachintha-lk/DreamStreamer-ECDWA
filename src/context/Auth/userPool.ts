import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

export const userPool = new CognitoUserPool(poolData);


export const getAuthHeaders = async () => {
  const token = await getIdToken();
  return {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };
};


const getIdToken = (): string | null => {
  const currentUser = userPool.getCurrentUser();

  if (currentUser) {
    let idToken = null;
    currentUser.getSession((err: Error , session: any) => {
      if (err) {
        console.log(err);
      } else if (!session.isValid()) {
        console.log("Invalid session.");
      } else {
        // console.log("IdToken: " + session.getIdToken().getJwtToken());
        idToken = session.getIdToken().getJwtToken();
      }
    }
    );
    return idToken
  }
  return null;
};