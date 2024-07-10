declare namespace authTypes {
  type loginRegisterParams = {
    email: string;
    password: string;
  };

  type confirmEmailParams = {
    id: stirng;
    token: stirng;
  };

  type forgotPasswordParams = { email: stirng };

  type resetPasswordParams = {
    email: string;
    newPassword: string;
    token: string;
  };

  type apiResponse = {
    success: boolean;
    data: object;
    message: string;
  };

  type userDetails = {
    firstName: string | null;
    lastName: string | null;
    roleId: string | null;
  };

  type updateUserProps = {
    firstName?: string;
    lastName?: string;
  };

  type UpdateUserRoleParams = {
    userId: string;
    roleId: string;
  };
}

declare namespace clientTypes {
  type addClient = {
    companyName: string;
    userName: string;
    userPassword: string;
    phoneNumber: string;
    gSTNumber?: string;
  };

  type getClients = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      data: addClient[];
    };
  };
  type getClient = Global.apiResponse<addClient>;
}
