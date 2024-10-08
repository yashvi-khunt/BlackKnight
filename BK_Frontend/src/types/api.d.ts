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
    gstNumber?: string;
  };

  type updateClient = {
    companyName?: string;
    userName?: string;
    userPassword?: string;
    phoneNumber?: string;
    gstNumber?: string;
  };

  type clientDetails = {
    id: string;
    companyName: string;
    userName: string;
    userPassword: string;
    phoneNumber: string;
    gstNumber?: string;
  };

  type getClients = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      data: clientDetails[];
    };
  };
  type getClient = Global.apiResponse<addClient>;
}

declare namespace jobWorkerTypes {
  type addJobWorker = {
    companyName: string;
    userName: string;
    userPassword: string;
    phoneNumber: string;
    fluteRate: number;
    linerRate?: number;
    gstNumber?: string;
  };

  type updateJobWorker = {
    companyName?: string;
    userName?: string;
    userPassword?: string;
    phoneNumber?: string;
    fluteRate?: number;
    linerRate?: number;
    gstNumber?: string;
  };

  type jobWorkerDetails = {
    id: string;
    companyName: string;
    userName: string;
    userPassword: string;
    phoneNumber: string;
    fluteRate: number;
    linerRate: number;
    gstNumber: string;
  };

  type getJobWorkers = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      data: jobWorkerDetails[];
    };
  };
  type getJobWorker = Global.apiResponse<addJobWorker>;
}

declare namespace productTypes {
  type addProduct = {
    boxName: string;
    brandId: number;
    topPaperTypeId: number;
    flutePaperTypeId: number;
    backPaperTypeId: number;
    length?: number;
    width?: number;
    height?: number;
    flap1?: number;
    flap2?: number;
    deckle: number;
    cutting: number;
    top: number;
    flute: number;
    back: number;
    noOfSheetPerBox: number;
    printTypeId: number;
    printingPlate?: string;
    ply: number;
    printRate: number;
    isLamination: boolean;
    dieCode?: number;
    jobWorkerId: number;
    linerJobWorkerId?: number;
    profitPercent: number;
    remarks?: string;
    images: {
      imagePath: string;
      isPrimary: string;
    }[];
  };

  type updateProduct = {
    boxName?: string;
    brandId?: number;
    topPaperTypeId?: number;
    flutePaperTypeId?: number;
    backPaperTypeId?: number;
    length?: number;
    width?: number;
    height?: number;
    flap1?: number;
    flap2?: number;
    deckle?: number;
    cutting?: number;
    top?: number;
    flute?: number;
    back?: number;
    noOfSheetPerBox?: number;
    printTypeId?: number;
    printingPlate?: string;
    ply?: number;
    printRate?: number;
    isLamination?: boolean;
    dieCode?: number;
    jobWorkerId?: number;
    linerJobWorkerId?: number;
    profitPercent?: number;
    remarks?: string;
    images?: {
      imagePath: string;
      isPrimary: string;
    }[];
  };

  type productDetails = {
    id: string;
    boxName: string;
    brandName: string;
    clientName: string;
    jobWorkerId: number;
    jobWorkerName: string;
    profitPercent: number;
    linerJobworerId?: number;
    remarks?: string;
    images?: {
      imagePath: string;
      isPrimary: string;
    }[];
    length?: number;
    width?: number;
    height?: number;
    flap1?: number;
    flap2?: number;
    deckle: number;
    cutting: number;
    topPaperTypeName: string;
    flutePaperTypeName: string;
    backPaperTypeName: string;
    top: number;
    flute: number;
    back: number;
    ply: number;
    noOfSheetPerBox: number;
    isLamination: boolean;
    dieCode?: number;
    printTypeName: string;
    printingPlate: string;
    topPrice: number;
    flutePrice: number;
    backPrice: number;
    printRate: number;
    laminationPrice: number;
    jobWorkerPrice: number;
    finalRate: number;
  };

  type getProducts = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      data: Array<{
        id: number;
        primaryImage: string;
        boxName: string;
        clientName: string;
        jobWorkerName: string;
        jobWorkerPrice: number;
        profitPercent: number;
        finalRate: number;
      }>;
    };
  };
  type getProduct = Global.apiResponse<productDetails>;
}

declare namespace orderTypes {
  type getOrders = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      data: Array<{
        primaryImage: string;
        quantity: number;
        orderDate: string;
        boxName: string;
        clientName: string;
        jobWorkerName: string;
        jobWorkerRate: number;
        profitPercent: number;
        finalRate: number;
      }>;
    };
  };

  type getOrderById = Omit<Global.apiResponse, "data"> & {
    data: {
      quantity: number;
      orderDate: string;
      id: number;
      productId: number;
      jobWorkerRate: number;
      isCompleted: boolean;
      finalRate: number;
    };
  };
}
declare namespace paperTypes {
  type addPaperType = {
    type: string;
    bf: string;
    price: number;
    laminationPercent?: number;
  };

  type updatePaperType = {
    type?: string;
    bf?: string;
    price?: number;
    laminationPercent?: number;
  };

  type paperTypeDetails = {
    id: number;
    type: string;
    bf: string;
    price: number;
    laminationPercent: number;
  };

  type getPaperTypes = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      data: paperTypeDetails[];
    };
  };

  type getPaperType = Global.apiResponse<paperTypeDetails>;
}

declare namespace brandTypes {
  type addBrand = {
    clientId: string;
    name: string;
  };

  type updateBrand = {
    clientId?: string;
    name?: string;
  };

  type brandDetails = {
    id: string;
    clientId: string;
    name: string;
    clientName: string;
  };
}

declare namespace wishListTypes {
  type VMGetCartItem = {
    id: number;
    productId: number;
    clientId: string;
    wishlisterId: string;
    quantity: number;
    dateAdded: string;
    image: string;
    boxName: string;
    clientName: string;
    brandName: string;
    wishlisterName: string;
    jobWorkerRate: number;
    finalRate: number;
  };

  type VMWishlistItem = Omit<Global.apiResponse, "data"> & {
    productId: number;
    quantity: number;
  };
}
