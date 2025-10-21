export class Address implements IAddress {
    id?: number;
    code?: string | undefined;
    name!: string;
    line1!: string;
    line2?: string | undefined;
    line3?: string | undefined;
    location!: Location;
    contact?: Contact;
    isPostal?: boolean;
    isResidential?: boolean;
    isMineSite?: boolean;
    notes?: string | undefined;
  
    constructor(data?: IAddress) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
      if (!data) {
        this.location = new Location();
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.code = _data["code"];
        this.name = _data["name"];
        this.line1 = _data["line1"];
        this.line2 = _data["line2"];
        this.line3 = _data["line3"];
        this.location = _data["location"] ? Location.fromJS(_data["location"]) : new Location();
        this.contact = _data["contact"] ? Contact.fromJS(_data["contact"]) : <any>undefined;
        this.isPostal = _data["isPostal"];
        this.isResidential = _data["isResidential"];
        this.isMineSite = _data["isMineSite"];
        this.notes = _data["notes"];
      }
    }
  
    static fromJS(data: any): Address {
      data = typeof data === "object" ? data : {};
      let result = new Address();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["code"] = this.code;
      data["name"] = this.name;
      data["line1"] = this.line1;
      data["line2"] = this.line2;
      data["line3"] = this.line3;
      data["location"] = this.location ? this.location.toJSON() : <any>undefined;
      data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
      data["isPostal"] = this.isPostal;
      data["isResidential"] = this.isResidential;
      data["isMineSite"] = this.isMineSite;
      data["notes"] = this.notes;
      return data;
    }
  }
  
  export interface IAddress {
    id?: number;
    code?: string | undefined;
    name: string;
    line1: string;
    line2?: string | undefined;
    line3?: string | undefined;
    location: Location;
    contact?: Contact;
    isPostal?: boolean;
    isResidential?: boolean;
    isMineSite?: boolean;
    notes?: string | undefined;
  }
  
  export class AddressQuote implements IAddressQuote {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    line1?: string | undefined;
    line2?: string | undefined;
    line3?: string | undefined;
    location!: LocationQuote;
    contact?: Contact;
    isPostal?: boolean;
    isResidential?: boolean;
    isMineSite?: boolean;
    notes?: string | undefined;
  
    constructor(data?: IAddressQuote) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
      if (!data) {
        this.location = new LocationQuote();
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.code = _data["code"];
        this.name = _data["name"];
        this.line1 = _data["line1"];
        this.line2 = _data["line2"];
        this.line3 = _data["line3"];
        this.location = _data["location"] ? LocationQuote.fromJS(_data["location"]) : new LocationQuote();
        this.contact = _data["contact"] ? Contact.fromJS(_data["contact"]) : <any>undefined;
        this.isPostal = _data["isPostal"];
        this.isResidential = _data["isResidential"];
        this.isMineSite = _data["isMineSite"];
        this.notes = _data["notes"];
      }
    }
  
    static fromJS(data: any): AddressQuote {
      data = typeof data === "object" ? data : {};
      let result = new AddressQuote();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["code"] = this.code;
      data["name"] = this.name;
      data["line1"] = this.line1;
      data["line2"] = this.line2;
      data["line3"] = this.line3;
      data["location"] = this.location ? this.location.toJSON() : <any>undefined;
      data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
      data["isPostal"] = this.isPostal;
      data["isResidential"] = this.isResidential;
      data["isMineSite"] = this.isMineSite;
      data["notes"] = this.notes;
      return data;
    }
  }
  
  export interface IAddressQuote {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    line1?: string | undefined;
    line2?: string | undefined;
    line3?: string | undefined;
    location: LocationQuote;
    contact?: Contact;
    isPostal?: boolean;
    isResidential?: boolean;
    isMineSite?: boolean;
    notes?: string | undefined;
  }
  
  export class Assembly implements IAssembly {
    readonly definedTypes?: TypeInfo[] | undefined;
    readonly exportedTypes?: Type[] | undefined;
    readonly codeBase?: string | undefined;
    entryPoint?: MethodInfo;
    readonly fullName?: string | undefined;
    readonly imageRuntimeVersion?: string | undefined;
    readonly isDynamic?: boolean;
    readonly location?: string | undefined;
    readonly reflectionOnly?: boolean;
    readonly isCollectible?: boolean;
    readonly isFullyTrusted?: boolean;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly escapedCodeBase?: string | undefined;
    manifestModule?: Module;
    readonly modules?: Module[] | undefined;
    readonly globalAssemblyCache?: boolean;
    readonly hostContext?: number;
    securityRuleSet?: SecurityRuleSet;
  
    constructor(data?: IAssembly) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        if (Array.isArray(_data["definedTypes"])) {
          (<any>this).definedTypes = [] as any;
          for (let item of _data["definedTypes"]) (<any>this).definedTypes!.push(TypeInfo.fromJS(item));
        }
        if (Array.isArray(_data["exportedTypes"])) {
          (<any>this).exportedTypes = [] as any;
          for (let item of _data["exportedTypes"]) (<any>this).exportedTypes!.push(Type.fromJS(item));
        }
        (<any>this).codeBase = _data["codeBase"];
        this.entryPoint = _data["entryPoint"] ? MethodInfo.fromJS(_data["entryPoint"]) : <any>undefined;
        (<any>this).fullName = _data["fullName"];
        (<any>this).imageRuntimeVersion = _data["imageRuntimeVersion"];
        (<any>this).isDynamic = _data["isDynamic"];
        (<any>this).location = _data["location"];
        (<any>this).reflectionOnly = _data["reflectionOnly"];
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).isFullyTrusted = _data["isFullyTrusted"];
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).escapedCodeBase = _data["escapedCodeBase"];
        this.manifestModule = _data["manifestModule"] ? Module.fromJS(_data["manifestModule"]) : <any>undefined;
        if (Array.isArray(_data["modules"])) {
          (<any>this).modules = [] as any;
          for (let item of _data["modules"]) (<any>this).modules!.push(Module.fromJS(item));
        }
        (<any>this).globalAssemblyCache = _data["globalAssemblyCache"];
        (<any>this).hostContext = _data["hostContext"];
        this.securityRuleSet = _data["securityRuleSet"];
      }
    }
  
    static fromJS(data: any): Assembly {
      data = typeof data === "object" ? data : {};
      let result = new Assembly();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      if (Array.isArray(this.definedTypes)) {
        data["definedTypes"] = [];
        for (let item of this.definedTypes) data["definedTypes"].push(item.toJSON());
      }
      if (Array.isArray(this.exportedTypes)) {
        data["exportedTypes"] = [];
        for (let item of this.exportedTypes) data["exportedTypes"].push(item.toJSON());
      }
      data["codeBase"] = this.codeBase;
      data["entryPoint"] = this.entryPoint ? this.entryPoint.toJSON() : <any>undefined;
      data["fullName"] = this.fullName;
      data["imageRuntimeVersion"] = this.imageRuntimeVersion;
      data["isDynamic"] = this.isDynamic;
      data["location"] = this.location;
      data["reflectionOnly"] = this.reflectionOnly;
      data["isCollectible"] = this.isCollectible;
      data["isFullyTrusted"] = this.isFullyTrusted;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["escapedCodeBase"] = this.escapedCodeBase;
      data["manifestModule"] = this.manifestModule ? this.manifestModule.toJSON() : <any>undefined;
      if (Array.isArray(this.modules)) {
        data["modules"] = [];
        for (let item of this.modules) data["modules"].push(item.toJSON());
      }
      data["globalAssemblyCache"] = this.globalAssemblyCache;
      data["hostContext"] = this.hostContext;
      data["securityRuleSet"] = this.securityRuleSet;
      return data;
    }
  }
  
  export interface IAssembly {
    definedTypes?: TypeInfo[] | undefined;
    exportedTypes?: Type[] | undefined;
    codeBase?: string | undefined;
    entryPoint?: MethodInfo;
    fullName?: string | undefined;
    imageRuntimeVersion?: string | undefined;
    isDynamic?: boolean;
    location?: string | undefined;
    reflectionOnly?: boolean;
    isCollectible?: boolean;
    isFullyTrusted?: boolean;
    customAttributes?: CustomAttributeData[] | undefined;
    escapedCodeBase?: string | undefined;
    manifestModule?: Module;
    modules?: Module[] | undefined;
    globalAssemblyCache?: boolean;
    hostContext?: number;
    securityRuleSet?: SecurityRuleSet;
  }
  
  export class Asset implements IAsset {
    id?: number;
    code?: string | undefined;
    class?: string | undefined;
    reference?: string | undefined;
    name?: string | undefined;
    quantity?: number;
    requireExchange?: boolean;
  
    constructor(data?: IAsset) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.code = _data["code"];
        this.class = _data["class"];
        this.reference = _data["reference"];
        this.name = _data["name"];
        this.quantity = _data["quantity"];
        this.requireExchange = _data["requireExchange"];
      }
    }
  
    static fromJS(data: any): Asset {
      data = typeof data === "object" ? data : {};
      let result = new Asset();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["code"] = this.code;
      data["class"] = this.class;
      data["reference"] = this.reference;
      data["name"] = this.name;
      data["quantity"] = this.quantity;
      data["requireExchange"] = this.requireExchange;
      return data;
    }
  }
  
  export interface IAsset {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    quantity?: number;
    requireExchange?: boolean;
  }
  
  export class AuthenticateModel implements IAuthenticateModel {
    userNameOrEmailAddress!: string;
    password!: string;
    tenantName?: string | undefined;
    rememberClient?: boolean;
  
    constructor(data?: IAuthenticateModel) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.userNameOrEmailAddress = _data["userNameOrEmailAddress"];
        this.password = _data["password"];
        this.tenantName = _data["tenantName"];
        this.rememberClient = _data["rememberClient"];
      }
    }
  
    static fromJS(data: any): AuthenticateModel {
      data = typeof data === "object" ? data : {};
      let result = new AuthenticateModel();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
      data["password"] = this.password;
      data["tenantName"] = this.tenantName;
      data["rememberClient"] = this.rememberClient;
      return data;
    }
  }
  
  export interface IAuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    tenantName?: string | undefined;
    rememberClient?: boolean;
  }
  
  export enum CallingConventions {
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _32 = 32,
    _64 = 64,
  }
  
  export class CarioException implements ICarioException {
    code?: number;
    message?: string | undefined;
  
    constructor(data?: ICarioException) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.code = _data["code"];
        this.message = _data["message"];
      }
    }
  
    static fromJS(data: any): CarioException {
      data = typeof data === "object" ? data : {};
      let result = new CarioException();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["code"] = this.code;
      data["message"] = this.message;
      return data;
    }
  }
  
  export interface ICarioException {
    code?: number;
    message?: string | undefined;
  }
  
  export class Consignment implements IConsignment {
    id?: number;
    customerId!: number;
    orderId?: number;
    orderKey?: string | undefined;
    connoteNumber?: string | undefined;
    customerReference?: string | undefined;
    service?: Service;
    pickupDate!: Date;
    pickupEarliestTime?: Date | undefined;
    pickupLatestTime?: Date | undefined;
    pickupAddress?: Address;
    deliveryAddress?: Address;
    authorityToLeave?: boolean;
    authorisationCode?: string | undefined;
    bookInRequired?: boolean;
    timeSlotDate?: Date | undefined;
    timeSlotTime?: Date | undefined;
    deliverOnDate?: string | undefined;
    totalItems?: number;
    totalWeight?: number;
    totalVolume?: number;
    travelDistance?: number;
    description?: string | undefined;
    specialInstructions?: string | undefined;
    goodsValue?: number;
    amountInsured?: number;
    insuranceClass?: string | undefined;
    customsClearanceRequired?: boolean;
    dutiesAndTaxesPaid?: boolean;
    optionHandUnload?: boolean;
    optionPickupTailLift?: boolean;
    optionDeliveryTailLift?: boolean;
    transportUnits!: TransportUnit[];
    costCentre?: string | undefined;
    canConsolidate?: boolean;
    bookImmediately?: boolean;
    doNotManifest?: boolean;
    freightCharge?: number;
    additionalCharges?: number;
    netCharge?: number;
    taxCharge?: number;
    totalCharge?: number;
    consolidationKey?: string | undefined;
    references?: string[] | undefined;
    movementFlag?: string | undefined;
    customValue1?: string | undefined;
    customValue2?: string | undefined;
    customValue3?: string | undefined;
    customValue4?: string | undefined;
    customValue5?: string | undefined;
    customValue6?: string | undefined;
    customValue7?: string | undefined;
    customValue8?: string | undefined;
    includeCustomerMarkupInPrices?: boolean;
    consignmentCosts?: Price;
    consignmentCharges?: Movement[] | undefined;
    createControlledReturn?: boolean;
  
    constructor(data?: IConsignment) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
      if (!data) {
        this.transportUnits = [];
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.customerId = _data["customerId"];
        this.orderId = _data["orderId"];
        this.orderKey = _data["orderKey"];
        this.connoteNumber = _data["connoteNumber"];
        this.customerReference = _data["customerReference"];
        this.service = _data["service"] ? Service.fromJS(_data["service"]) : <any>undefined;
        this.pickupDate = _data["pickupDate"] ? new Date(_data["pickupDate"].toString()) : <any>undefined;
        this.pickupEarliestTime = _data["pickupEarliestTime"] ? new Date(_data["pickupEarliestTime"].toString()) : <any>undefined;
        this.pickupLatestTime = _data["pickupLatestTime"] ? new Date(_data["pickupLatestTime"].toString()) : <any>undefined;
        this.pickupAddress = _data["pickupAddress"] ? Address.fromJS(_data["pickupAddress"]) : <any>undefined;
        this.deliveryAddress = _data["deliveryAddress"] ? Address.fromJS(_data["deliveryAddress"]) : <any>undefined;
        this.authorityToLeave = _data["authorityToLeave"];
        this.authorisationCode = _data["authorisationCode"];
        this.bookInRequired = _data["bookInRequired"];
        this.timeSlotDate = _data["timeSlotDate"] ? new Date(_data["timeSlotDate"].toString()) : <any>undefined;
        this.timeSlotTime = _data["timeSlotTime"] ? new Date(_data["timeSlotTime"].toString()) : <any>undefined;
        this.deliverOnDate = _data["deliverOnDate"];
        this.totalItems = _data["totalItems"];
        this.totalWeight = _data["totalWeight"];
        this.totalVolume = _data["totalVolume"];
        this.travelDistance = _data["travelDistance"];
        this.description = _data["description"];
        this.specialInstructions = _data["specialInstructions"];
        this.goodsValue = _data["goodsValue"];
        this.amountInsured = _data["amountInsured"];
        this.insuranceClass = _data["insuranceClass"];
        this.customsClearanceRequired = _data["customsClearanceRequired"];
        this.dutiesAndTaxesPaid = _data["dutiesAndTaxesPaid"];
        this.optionHandUnload = _data["optionHandUnload"];
        this.optionPickupTailLift = _data["optionPickupTailLift"];
        this.optionDeliveryTailLift = _data["optionDeliveryTailLift"];
        if (Array.isArray(_data["transportUnits"])) {
          this.transportUnits = [] as any;
          for (let item of _data["transportUnits"]) this.transportUnits!.push(TransportUnit.fromJS(item));
        }
        this.costCentre = _data["costCentre"];
        this.canConsolidate = _data["canConsolidate"];
        this.bookImmediately = _data["bookImmediately"];
        this.doNotManifest = _data["doNotManifest"];
        this.freightCharge = _data["freightCharge"];
        this.additionalCharges = _data["additionalCharges"];
        this.netCharge = _data["netCharge"];
        this.taxCharge = _data["taxCharge"];
        this.totalCharge = _data["totalCharge"];
        this.consolidationKey = _data["consolidationKey"];
        if (Array.isArray(_data["references"])) {
          this.references = [] as any;
          for (let item of _data["references"]) this.references!.push(item);
        }
        this.movementFlag = _data["movementFlag"];
        this.customValue1 = _data["customValue1"];
        this.customValue2 = _data["customValue2"];
        this.customValue3 = _data["customValue3"];
        this.customValue4 = _data["customValue4"];
        this.customValue5 = _data["customValue5"];
        this.customValue6 = _data["customValue6"];
        this.customValue7 = _data["customValue7"];
        this.customValue8 = _data["customValue8"];
        this.includeCustomerMarkupInPrices = _data["includeCustomerMarkupInPrices"];
        this.consignmentCosts = _data["consignmentCosts"] ? Price.fromJS(_data["consignmentCosts"]) : <any>undefined;
        if (Array.isArray(_data["consignmentCharges"])) {
          this.consignmentCharges = [] as any;
          for (let item of _data["consignmentCharges"]) this.consignmentCharges!.push(Movement.fromJS(item));
        }
        this.createControlledReturn = _data["createControlledReturn"];
      }
    }
  
    static fromJS(data: any): Consignment {
      data = typeof data === "object" ? data : {};
      let result = new Consignment();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["customerId"] = this.customerId;
      data["orderId"] = this.orderId;
      data["orderKey"] = this.orderKey;
      data["connoteNumber"] = this.connoteNumber;
      data["customerReference"] = this.customerReference;
      data["service"] = this.service ? this.service.toJSON() : <any>undefined;
      data["pickupDate"] = this.pickupDate ? this.pickupDate.toISOString() : <any>undefined;
      data["pickupEarliestTime"] = this.pickupEarliestTime ? this.pickupEarliestTime.toISOString() : <any>undefined;
      data["pickupLatestTime"] = this.pickupLatestTime ? this.pickupLatestTime.toISOString() : <any>undefined;
      data["pickupAddress"] = this.pickupAddress ? this.pickupAddress.toJSON() : <any>undefined;
      data["deliveryAddress"] = this.deliveryAddress ? this.deliveryAddress.toJSON() : <any>undefined;
      data["authorityToLeave"] = this.authorityToLeave;
      data["authorisationCode"] = this.authorisationCode;
      data["bookInRequired"] = this.bookInRequired;
      data["timeSlotDate"] = this.timeSlotDate ? this.timeSlotDate.toISOString() : <any>undefined;
      data["timeSlotTime"] = this.timeSlotTime ? this.timeSlotTime.toISOString() : <any>undefined;
      data["deliverOnDate"] = this.deliverOnDate;
      data["totalItems"] = this.totalItems;
      data["totalWeight"] = this.totalWeight;
      data["totalVolume"] = this.totalVolume;
      data["travelDistance"] = this.travelDistance;
      data["description"] = this.description;
      data["specialInstructions"] = this.specialInstructions;
      data["goodsValue"] = this.goodsValue;
      data["amountInsured"] = this.amountInsured;
      data["insuranceClass"] = this.insuranceClass;
      data["customsClearanceRequired"] = this.customsClearanceRequired;
      data["dutiesAndTaxesPaid"] = this.dutiesAndTaxesPaid;
      data["optionHandUnload"] = this.optionHandUnload;
      data["optionPickupTailLift"] = this.optionPickupTailLift;
      data["optionDeliveryTailLift"] = this.optionDeliveryTailLift;
      if (Array.isArray(this.transportUnits)) {
        data["transportUnits"] = [];
        for (let item of this.transportUnits) data["transportUnits"].push(item.toJSON());
      }
      data["costCentre"] = this.costCentre;
      data["canConsolidate"] = this.canConsolidate;
      data["bookImmediately"] = this.bookImmediately;
      data["doNotManifest"] = this.doNotManifest;
      data["freightCharge"] = this.freightCharge;
      data["additionalCharges"] = this.additionalCharges;
      data["netCharge"] = this.netCharge;
      data["taxCharge"] = this.taxCharge;
      data["totalCharge"] = this.totalCharge;
      data["consolidationKey"] = this.consolidationKey;
      if (Array.isArray(this.references)) {
        data["references"] = [];
        for (let item of this.references) data["references"].push(item);
      }
      data["movementFlag"] = this.movementFlag;
      data["customValue1"] = this.customValue1;
      data["customValue2"] = this.customValue2;
      data["customValue3"] = this.customValue3;
      data["customValue4"] = this.customValue4;
      data["customValue5"] = this.customValue5;
      data["customValue6"] = this.customValue6;
      data["customValue7"] = this.customValue7;
      data["customValue8"] = this.customValue8;
      data["includeCustomerMarkupInPrices"] = this.includeCustomerMarkupInPrices;
      data["consignmentCosts"] = this.consignmentCosts ? this.consignmentCosts.toJSON() : <any>undefined;
      if (Array.isArray(this.consignmentCharges)) {
        data["consignmentCharges"] = [];
        for (let item of this.consignmentCharges) data["consignmentCharges"].push(item.toJSON());
      }
      data["createControlledReturn"] = this.createControlledReturn;
      return data;
    }
  }
  
  export interface IConsignment {
    id?: number;
    customerId: number;
    orderId?: number;
    orderKey?: string | undefined;
    connoteNumber?: string | undefined;
    customerReference?: string | undefined;
    service?: Service;
    pickupDate: Date;
    pickupEarliestTime?: Date | undefined;
    pickupLatestTime?: Date | undefined;
    pickupAddress?: Address;
    deliveryAddress?: Address;
    authorityToLeave?: boolean;
    authorisationCode?: string | undefined;
    bookInRequired?: boolean;
    timeSlotDate?: Date | undefined;
    timeSlotTime?: Date | undefined;
    deliverOnDate?: string | undefined;
    totalItems?: number;
    totalWeight?: number;
    totalVolume?: number;
    travelDistance?: number;
    description?: string | undefined;
    specialInstructions?: string | undefined;
    goodsValue?: number;
    amountInsured?: number;
    insuranceClass?: string | undefined;
    customsClearanceRequired?: boolean;
    dutiesAndTaxesPaid?: boolean;
    optionHandUnload?: boolean;
    optionPickupTailLift?: boolean;
    optionDeliveryTailLift?: boolean;
    transportUnits: TransportUnit[];
    costCentre?: string | undefined;
    canConsolidate?: boolean;
    bookImmediately?: boolean;
    doNotManifest?: boolean;
    freightCharge?: number;
    additionalCharges?: number;
    netCharge?: number;
    taxCharge?: number;
    totalCharge?: number;
    consolidationKey?: string | undefined;
    references?: string[] | undefined;
    movementFlag?: string | undefined;
    customValue1?: string | undefined;
    customValue2?: string | undefined;
    customValue3?: string | undefined;
    customValue4?: string | undefined;
    customValue5?: string | undefined;
    customValue6?: string | undefined;
    customValue7?: string | undefined;
    customValue8?: string | undefined;
    includeCustomerMarkupInPrices?: boolean;
    consignmentCosts?: Price;
    consignmentCharges?: Movement[] | undefined;
    createControlledReturn?: boolean;
  }
  
  export class ConsignmentQuote implements IConsignmentQuote {
    id?: number;
    customerId!: number;
    orderId?: number;
    connoteNumber?: string | undefined;
    customerReference?: string | undefined;
    service?: Service;
    pickupDate!: Date;
    pickupEarliestTime?: Date | undefined;
    pickupLatestTime?: Date | undefined;
    pickupAddress?: AddressQuote;
    deliveryAddress?: AddressQuote;
    authorityToLeave?: boolean;
    authorisationCode?: string | undefined;
    bookInRequired?: boolean;
    timeSlotDate?: Date | undefined;
    timeSlotTime?: Date | undefined;
    deliverOnDate?: string | undefined;
    totalItems?: number;
    totalWeight?: number;
    totalVolume?: number;
    travelDistance?: number;
    description?: string | undefined;
    specialInstructions?: string | undefined;
    goodsValue?: number;
    amountInsured?: number;
    insuranceClass?: string | undefined;
    customsClearanceRequired?: boolean;
    dutiesAndTaxesPaid?: boolean;
    optionHandUnload?: boolean;
    optionPickupTailLift?: boolean;
    optionDeliveryTailLift?: boolean;
    transportUnits!: TransportUnit[];
    costCentre?: string | undefined;
    canConsolidate?: boolean;
    bookImmediately?: boolean;
    doNotManifest?: boolean;
    freightCharge?: number;
    additionalCharges?: number;
    netCharge?: number;
    taxCharge?: number;
    totalCharge?: number;
    consolidationKey?: string | undefined;
    references?: string[] | undefined;
    movementFlag?: string | undefined;
    customValue1?: string | undefined;
    customValue2?: string | undefined;
    customValue3?: string | undefined;
    customValue4?: string | undefined;
    customValue5?: string | undefined;
    customValue6?: string | undefined;
    customValue7?: string | undefined;
    customValue8?: string | undefined;
    includeCustomerMarkupInPrices?: boolean;
  
    constructor(data?: IConsignmentQuote) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
      if (!data) {
        this.transportUnits = [];
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.customerId = _data["customerId"];
        this.orderId = _data["orderId"];
        this.connoteNumber = _data["connoteNumber"];
        this.customerReference = _data["customerReference"];
        this.service = _data["service"] ? Service.fromJS(_data["service"]) : <any>undefined;
        this.pickupDate = _data["pickupDate"] ? new Date(_data["pickupDate"].toString()) : <any>undefined;
        this.pickupEarliestTime = _data["pickupEarliestTime"] ? new Date(_data["pickupEarliestTime"].toString()) : <any>undefined;
        this.pickupLatestTime = _data["pickupLatestTime"] ? new Date(_data["pickupLatestTime"].toString()) : <any>undefined;
        this.pickupAddress = _data["pickupAddress"] ? AddressQuote.fromJS(_data["pickupAddress"]) : <any>undefined;
        this.deliveryAddress = _data["deliveryAddress"] ? AddressQuote.fromJS(_data["deliveryAddress"]) : <any>undefined;
        this.authorityToLeave = _data["authorityToLeave"];
        this.authorisationCode = _data["authorisationCode"];
        this.bookInRequired = _data["bookInRequired"];
        this.timeSlotDate = _data["timeSlotDate"] ? new Date(_data["timeSlotDate"].toString()) : <any>undefined;
        this.timeSlotTime = _data["timeSlotTime"] ? new Date(_data["timeSlotTime"].toString()) : <any>undefined;
        this.deliverOnDate = _data["deliverOnDate"];
        this.totalItems = _data["totalItems"];
        this.totalWeight = _data["totalWeight"];
        this.totalVolume = _data["totalVolume"];
        this.travelDistance = _data["travelDistance"];
        this.description = _data["description"];
        this.specialInstructions = _data["specialInstructions"];
        this.goodsValue = _data["goodsValue"];
        this.amountInsured = _data["amountInsured"];
        this.insuranceClass = _data["insuranceClass"];
        this.customsClearanceRequired = _data["customsClearanceRequired"];
        this.dutiesAndTaxesPaid = _data["dutiesAndTaxesPaid"];
        this.optionHandUnload = _data["optionHandUnload"];
        this.optionPickupTailLift = _data["optionPickupTailLift"];
        this.optionDeliveryTailLift = _data["optionDeliveryTailLift"];
        if (Array.isArray(_data["transportUnits"])) {
          this.transportUnits = [] as any;
          for (let item of _data["transportUnits"]) this.transportUnits!.push(TransportUnit.fromJS(item));
        }
        this.costCentre = _data["costCentre"];
        this.canConsolidate = _data["canConsolidate"];
        this.bookImmediately = _data["bookImmediately"];
        this.doNotManifest = _data["doNotManifest"];
        this.freightCharge = _data["freightCharge"];
        this.additionalCharges = _data["additionalCharges"];
        this.netCharge = _data["netCharge"];
        this.taxCharge = _data["taxCharge"];
        this.totalCharge = _data["totalCharge"];
        this.consolidationKey = _data["consolidationKey"];
        if (Array.isArray(_data["references"])) {
          this.references = [] as any;
          for (let item of _data["references"]) this.references!.push(item);
        }
        this.movementFlag = _data["movementFlag"];
        this.customValue1 = _data["customValue1"];
        this.customValue2 = _data["customValue2"];
        this.customValue3 = _data["customValue3"];
        this.customValue4 = _data["customValue4"];
        this.customValue5 = _data["customValue5"];
        this.customValue6 = _data["customValue6"];
        this.customValue7 = _data["customValue7"];
        this.customValue8 = _data["customValue8"];
        this.includeCustomerMarkupInPrices = _data["includeCustomerMarkupInPrices"];
      }
    }
  
    static fromJS(data: any): ConsignmentQuote {
      data = typeof data === "object" ? data : {};
      let result = new ConsignmentQuote();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["customerId"] = this.customerId;
      data["orderId"] = this.orderId;
      data["connoteNumber"] = this.connoteNumber;
      data["customerReference"] = this.customerReference;
      data["service"] = this.service ? this.service.toJSON() : <any>undefined;
      data["pickupDate"] = this.pickupDate ? this.pickupDate.toISOString() : <any>undefined;
      data["pickupEarliestTime"] = this.pickupEarliestTime ? this.pickupEarliestTime.toISOString() : <any>undefined;
      data["pickupLatestTime"] = this.pickupLatestTime ? this.pickupLatestTime.toISOString() : <any>undefined;
      data["pickupAddress"] = this.pickupAddress ? this.pickupAddress.toJSON() : <any>undefined;
      data["deliveryAddress"] = this.deliveryAddress ? this.deliveryAddress.toJSON() : <any>undefined;
      data["authorityToLeave"] = this.authorityToLeave;
      data["authorisationCode"] = this.authorisationCode;
      data["bookInRequired"] = this.bookInRequired;
      data["timeSlotDate"] = this.timeSlotDate ? this.timeSlotDate.toISOString() : <any>undefined;
      data["timeSlotTime"] = this.timeSlotTime ? this.timeSlotTime.toISOString() : <any>undefined;
      data["deliverOnDate"] = this.deliverOnDate;
      data["totalItems"] = this.totalItems;
      data["totalWeight"] = this.totalWeight;
      data["totalVolume"] = this.totalVolume;
      data["travelDistance"] = this.travelDistance;
      data["description"] = this.description;
      data["specialInstructions"] = this.specialInstructions;
      data["goodsValue"] = this.goodsValue;
      data["amountInsured"] = this.amountInsured;
      data["insuranceClass"] = this.insuranceClass;
      data["customsClearanceRequired"] = this.customsClearanceRequired;
      data["dutiesAndTaxesPaid"] = this.dutiesAndTaxesPaid;
      data["optionHandUnload"] = this.optionHandUnload;
      data["optionPickupTailLift"] = this.optionPickupTailLift;
      data["optionDeliveryTailLift"] = this.optionDeliveryTailLift;
      if (Array.isArray(this.transportUnits)) {
        data["transportUnits"] = [];
        for (let item of this.transportUnits) data["transportUnits"].push(item.toJSON());
      }
      data["costCentre"] = this.costCentre;
      data["canConsolidate"] = this.canConsolidate;
      data["bookImmediately"] = this.bookImmediately;
      data["doNotManifest"] = this.doNotManifest;
      data["freightCharge"] = this.freightCharge;
      data["additionalCharges"] = this.additionalCharges;
      data["netCharge"] = this.netCharge;
      data["taxCharge"] = this.taxCharge;
      data["totalCharge"] = this.totalCharge;
      data["consolidationKey"] = this.consolidationKey;
      if (Array.isArray(this.references)) {
        data["references"] = [];
        for (let item of this.references) data["references"].push(item);
      }
      data["movementFlag"] = this.movementFlag;
      data["customValue1"] = this.customValue1;
      data["customValue2"] = this.customValue2;
      data["customValue3"] = this.customValue3;
      data["customValue4"] = this.customValue4;
      data["customValue5"] = this.customValue5;
      data["customValue6"] = this.customValue6;
      data["customValue7"] = this.customValue7;
      data["customValue8"] = this.customValue8;
      data["includeCustomerMarkupInPrices"] = this.includeCustomerMarkupInPrices;
      return data;
    }
  }
  
  export interface IConsignmentQuote {
    id?: number;
    customerId: number;
    orderId?: number;
    connoteNumber?: string | undefined;
    customerReference?: string | undefined;
    service?: Service;
    pickupDate: Date;
    pickupEarliestTime?: Date | undefined;
    pickupLatestTime?: Date | undefined;
    pickupAddress?: AddressQuote;
    deliveryAddress?: AddressQuote;
    authorityToLeave?: boolean;
    authorisationCode?: string | undefined;
    bookInRequired?: boolean;
    timeSlotDate?: Date | undefined;
    timeSlotTime?: Date | undefined;
    deliverOnDate?: string | undefined;
    totalItems?: number;
    totalWeight?: number;
    totalVolume?: number;
    travelDistance?: number;
    description?: string | undefined;
    specialInstructions?: string | undefined;
    goodsValue?: number;
    amountInsured?: number;
    insuranceClass?: string | undefined;
    customsClearanceRequired?: boolean;
    dutiesAndTaxesPaid?: boolean;
    optionHandUnload?: boolean;
    optionPickupTailLift?: boolean;
    optionDeliveryTailLift?: boolean;
    transportUnits: TransportUnit[];
    costCentre?: string | undefined;
    canConsolidate?: boolean;
    bookImmediately?: boolean;
    doNotManifest?: boolean;
    freightCharge?: number;
    additionalCharges?: number;
    netCharge?: number;
    taxCharge?: number;
    totalCharge?: number;
    consolidationKey?: string | undefined;
    references?: string[] | undefined;
    movementFlag?: string | undefined;
    customValue1?: string | undefined;
    customValue2?: string | undefined;
    customValue3?: string | undefined;
    customValue4?: string | undefined;
    customValue5?: string | undefined;
    customValue6?: string | undefined;
    customValue7?: string | undefined;
    customValue8?: string | undefined;
    includeCustomerMarkupInPrices?: boolean;
  }
  
  export class ConsignmentStatus implements IConsignmentStatus {
    id?: number;
    customerName?: string | undefined;
    connoteNumber?: string | undefined;
    pickupDate?: Date;
    customerReference?: string | undefined;
    serviceCode?: string | undefined;
    serviceName?: string | undefined;
    pickupAddress?: Address;
    deliveryAddress?: Address;
    specialInstructions?: string | undefined;
    totalItems?: number;
    totalWeight?: number;
    totalVolume?: number;
    transportUnits?: TransportUnit[] | undefined;
    status?: string | undefined;
    events?: Event[] | undefined;
    documents?: Document[] | undefined;
    pickedUp?: Date | undefined;
    onBoardForDelivery?: Date | undefined;
    delivered?: Date | undefined;
    hasPOD?: boolean;
    estimatedDelivery?: Date | undefined;
    isOntime?: boolean;
    references?: string[] | undefined;
  
    constructor(data?: IConsignmentStatus) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.customerName = _data["customerName"];
        this.connoteNumber = _data["connoteNumber"];
        this.pickupDate = _data["pickupDate"] ? new Date(_data["pickupDate"].toString()) : <any>undefined;
        this.customerReference = _data["customerReference"];
        this.serviceCode = _data["serviceCode"];
        this.serviceName = _data["serviceName"];
        this.pickupAddress = _data["pickupAddress"] ? Address.fromJS(_data["pickupAddress"]) : <any>undefined;
        this.deliveryAddress = _data["deliveryAddress"] ? Address.fromJS(_data["deliveryAddress"]) : <any>undefined;
        this.specialInstructions = _data["specialInstructions"];
        this.totalItems = _data["totalItems"];
        this.totalWeight = _data["totalWeight"];
        this.totalVolume = _data["totalVolume"];
        if (Array.isArray(_data["transportUnits"])) {
          this.transportUnits = [] as any;
          for (let item of _data["transportUnits"]) this.transportUnits!.push(TransportUnit.fromJS(item));
        }
        this.status = _data["status"];
        if (Array.isArray(_data["events"])) {
          this.events = [] as any;
          for (let item of _data["events"]) this.events!.push(Event.fromJS(item));
        }
        if (Array.isArray(_data["documents"])) {
          this.documents = [] as any;
          for (let item of _data["documents"]) this.documents!.push(Document.fromJS(item));
        }
        this.pickedUp = _data["pickedUp"] ? new Date(_data["pickedUp"].toString()) : <any>undefined;
        this.onBoardForDelivery = _data["onBoardForDelivery"] ? new Date(_data["onBoardForDelivery"].toString()) : <any>undefined;
        this.delivered = _data["delivered"] ? new Date(_data["delivered"].toString()) : <any>undefined;
        this.hasPOD = _data["hasPOD"];
        this.estimatedDelivery = _data["estimatedDelivery"] ? new Date(_data["estimatedDelivery"].toString()) : <any>undefined;
        this.isOntime = _data["isOntime"];
        if (Array.isArray(_data["references"])) {
          this.references = [] as any;
          for (let item of _data["references"]) this.references!.push(item);
        }
      }
    }
  
    static fromJS(data: any): ConsignmentStatus {
      data = typeof data === "object" ? data : {};
      let result = new ConsignmentStatus();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["customerName"] = this.customerName;
      data["connoteNumber"] = this.connoteNumber;
      data["pickupDate"] = this.pickupDate ? this.pickupDate.toISOString() : <any>undefined;
      data["customerReference"] = this.customerReference;
      data["serviceCode"] = this.serviceCode;
      data["serviceName"] = this.serviceName;
      data["pickupAddress"] = this.pickupAddress ? this.pickupAddress.toJSON() : <any>undefined;
      data["deliveryAddress"] = this.deliveryAddress ? this.deliveryAddress.toJSON() : <any>undefined;
      data["specialInstructions"] = this.specialInstructions;
      data["totalItems"] = this.totalItems;
      data["totalWeight"] = this.totalWeight;
      data["totalVolume"] = this.totalVolume;
      if (Array.isArray(this.transportUnits)) {
        data["transportUnits"] = [];
        for (let item of this.transportUnits) data["transportUnits"].push(item.toJSON());
      }
      data["status"] = this.status;
      if (Array.isArray(this.events)) {
        data["events"] = [];
        for (let item of this.events) data["events"].push(item.toJSON());
      }
      if (Array.isArray(this.documents)) {
        data["documents"] = [];
        for (let item of this.documents) data["documents"].push(item.toJSON());
      }
      data["pickedUp"] = this.pickedUp ? this.pickedUp.toISOString() : <any>undefined;
      data["onBoardForDelivery"] = this.onBoardForDelivery ? this.onBoardForDelivery.toISOString() : <any>undefined;
      data["delivered"] = this.delivered ? this.delivered.toISOString() : <any>undefined;
      data["hasPOD"] = this.hasPOD;
      data["estimatedDelivery"] = this.estimatedDelivery ? this.estimatedDelivery.toISOString() : <any>undefined;
      data["isOntime"] = this.isOntime;
      if (Array.isArray(this.references)) {
        data["references"] = [];
        for (let item of this.references) data["references"].push(item);
      }
      return data;
    }
  }
  
  export interface IConsignmentStatus {
    id?: number;
    customerName?: string | undefined;
    connoteNumber?: string | undefined;
    pickupDate?: Date;
    customerReference?: string | undefined;
    serviceCode?: string | undefined;
    serviceName?: string | undefined;
    pickupAddress?: Address;
    deliveryAddress?: Address;
    specialInstructions?: string | undefined;
    totalItems?: number;
    totalWeight?: number;
    totalVolume?: number;
    transportUnits?: TransportUnit[] | undefined;
    status?: string | undefined;
    events?: Event[] | undefined;
    documents?: Document[] | undefined;
    pickedUp?: Date | undefined;
    onBoardForDelivery?: Date | undefined;
    delivered?: Date | undefined;
    hasPOD?: boolean;
    estimatedDelivery?: Date | undefined;
    isOntime?: boolean;
    references?: string[] | undefined;
  }
  
  export class ConstructorInfo implements IConstructorInfo {
    readonly name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    attributes?: MethodAttributes;
    methodImplementationFlags?: MethodImplAttributes;
    callingConvention?: CallingConventions;
    readonly isAbstract?: boolean;
    readonly isConstructor?: boolean;
    readonly isFinal?: boolean;
    readonly isHideBySig?: boolean;
    readonly isSpecialName?: boolean;
    readonly isStatic?: boolean;
    readonly isVirtual?: boolean;
    readonly isAssembly?: boolean;
    readonly isFamily?: boolean;
    readonly isFamilyAndAssembly?: boolean;
    readonly isFamilyOrAssembly?: boolean;
    readonly isPrivate?: boolean;
    readonly isPublic?: boolean;
    readonly isConstructedGenericMethod?: boolean;
    readonly isGenericMethod?: boolean;
    readonly isGenericMethodDefinition?: boolean;
    readonly containsGenericParameters?: boolean;
    methodHandle?: RuntimeMethodHandle;
    readonly isSecurityCritical?: boolean;
    readonly isSecuritySafeCritical?: boolean;
    readonly isSecurityTransparent?: boolean;
    memberType?: MemberTypes;
  
    constructor(data?: IConstructorInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).name = _data["name"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        this.attributes = _data["attributes"];
        this.methodImplementationFlags = _data["methodImplementationFlags"];
        this.callingConvention = _data["callingConvention"];
        (<any>this).isAbstract = _data["isAbstract"];
        (<any>this).isConstructor = _data["isConstructor"];
        (<any>this).isFinal = _data["isFinal"];
        (<any>this).isHideBySig = _data["isHideBySig"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        (<any>this).isStatic = _data["isStatic"];
        (<any>this).isVirtual = _data["isVirtual"];
        (<any>this).isAssembly = _data["isAssembly"];
        (<any>this).isFamily = _data["isFamily"];
        (<any>this).isFamilyAndAssembly = _data["isFamilyAndAssembly"];
        (<any>this).isFamilyOrAssembly = _data["isFamilyOrAssembly"];
        (<any>this).isPrivate = _data["isPrivate"];
        (<any>this).isPublic = _data["isPublic"];
        (<any>this).isConstructedGenericMethod = _data["isConstructedGenericMethod"];
        (<any>this).isGenericMethod = _data["isGenericMethod"];
        (<any>this).isGenericMethodDefinition = _data["isGenericMethodDefinition"];
        (<any>this).containsGenericParameters = _data["containsGenericParameters"];
        this.methodHandle = _data["methodHandle"] ? RuntimeMethodHandle.fromJS(_data["methodHandle"]) : <any>undefined;
        (<any>this).isSecurityCritical = _data["isSecurityCritical"];
        (<any>this).isSecuritySafeCritical = _data["isSecuritySafeCritical"];
        (<any>this).isSecurityTransparent = _data["isSecurityTransparent"];
        this.memberType = _data["memberType"];
      }
    }
  
    static fromJS(data: any): ConstructorInfo {
      data = typeof data === "object" ? data : {};
      let result = new ConstructorInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["name"] = this.name;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["attributes"] = this.attributes;
      data["methodImplementationFlags"] = this.methodImplementationFlags;
      data["callingConvention"] = this.callingConvention;
      data["isAbstract"] = this.isAbstract;
      data["isConstructor"] = this.isConstructor;
      data["isFinal"] = this.isFinal;
      data["isHideBySig"] = this.isHideBySig;
      data["isSpecialName"] = this.isSpecialName;
      data["isStatic"] = this.isStatic;
      data["isVirtual"] = this.isVirtual;
      data["isAssembly"] = this.isAssembly;
      data["isFamily"] = this.isFamily;
      data["isFamilyAndAssembly"] = this.isFamilyAndAssembly;
      data["isFamilyOrAssembly"] = this.isFamilyOrAssembly;
      data["isPrivate"] = this.isPrivate;
      data["isPublic"] = this.isPublic;
      data["isConstructedGenericMethod"] = this.isConstructedGenericMethod;
      data["isGenericMethod"] = this.isGenericMethod;
      data["isGenericMethodDefinition"] = this.isGenericMethodDefinition;
      data["containsGenericParameters"] = this.containsGenericParameters;
      data["methodHandle"] = this.methodHandle ? this.methodHandle.toJSON() : <any>undefined;
      data["isSecurityCritical"] = this.isSecurityCritical;
      data["isSecuritySafeCritical"] = this.isSecuritySafeCritical;
      data["isSecurityTransparent"] = this.isSecurityTransparent;
      data["memberType"] = this.memberType;
      return data;
    }
  }
  
  export interface IConstructorInfo {
    name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    attributes?: MethodAttributes;
    methodImplementationFlags?: MethodImplAttributes;
    callingConvention?: CallingConventions;
    isAbstract?: boolean;
    isConstructor?: boolean;
    isFinal?: boolean;
    isHideBySig?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isVirtual?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isConstructedGenericMethod?: boolean;
    isGenericMethod?: boolean;
    isGenericMethodDefinition?: boolean;
    containsGenericParameters?: boolean;
    methodHandle?: RuntimeMethodHandle;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    memberType?: MemberTypes;
  }
  
  export class Contact implements IContact {
    id?: number;
    name?: string | undefined;
    phone?: string | undefined;
    mobile?: string | undefined;
    fax?: string | undefined;
    email?: string | undefined;
  
    constructor(data?: IContact) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.name = _data["name"];
        this.phone = _data["phone"];
        this.mobile = _data["mobile"];
        this.fax = _data["fax"];
        this.email = _data["email"];
      }
    }
  
    static fromJS(data: any): Contact {
      data = typeof data === "object" ? data : {};
      let result = new Contact();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["name"] = this.name;
      data["phone"] = this.phone;
      data["mobile"] = this.mobile;
      data["fax"] = this.fax;
      data["email"] = this.email;
      return data;
    }
  }
  
  export interface IContact {
    id?: number;
    name?: string | undefined;
    phone?: string | undefined;
    mobile?: string | undefined;
    fax?: string | undefined;
    email?: string | undefined;
  }
  
  export class Country implements ICountry {
    id!: number;
    isO2!: string;
    isO3!: string;
    name!: string;
  
    constructor(data?: ICountry) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.isO2 = _data["isO2"];
        this.isO3 = _data["isO3"];
        this.name = _data["name"];
      }
    }
  
    static fromJS(data: any): Country {
      data = typeof data === "object" ? data : {};
      let result = new Country();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["isO2"] = this.isO2;
      data["isO3"] = this.isO3;
      data["name"] = this.name;
      return data;
    }
  }
  
  export interface ICountry {
    id: number;
    isO2: string;
    isO3: string;
    name: string;
  }
  
  export class CountryQuote implements ICountryQuote {
    id!: number;
    isO2?: string | undefined;
    isO3?: string | undefined;
    name?: string | undefined;
  
    constructor(data?: ICountryQuote) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.isO2 = _data["isO2"];
        this.isO3 = _data["isO3"];
        this.name = _data["name"];
      }
    }
  
    static fromJS(data: any): CountryQuote {
      data = typeof data === "object" ? data : {};
      let result = new CountryQuote();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["isO2"] = this.isO2;
      data["isO3"] = this.isO3;
      data["name"] = this.name;
      return data;
    }
  }
  
  export interface ICountryQuote {
    id: number;
    isO2?: string | undefined;
    isO3?: string | undefined;
    name?: string | undefined;
  }
  
  export class CreateManifest implements ICreateManifest {
    tenantId?: number;
    customerId?: number;
    pickupDate?: string | undefined;
    pickupReadyAtTime?: string | undefined;
    pickupNoLaterThanTime?: string | undefined;
    pickupAddress?: Address;
    sendPickupRequestToCarrier?: boolean;
    consignmentIDs?: number[] | undefined;
  
    constructor(data?: ICreateManifest) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.tenantId = _data["tenantId"];
        this.customerId = _data["customerId"];
        this.pickupDate = _data["pickupDate"];
        this.pickupReadyAtTime = _data["pickupReadyAtTime"];
        this.pickupNoLaterThanTime = _data["pickupNoLaterThanTime"];
        this.pickupAddress = _data["pickupAddress"] ? Address.fromJS(_data["pickupAddress"]) : <any>undefined;
        this.sendPickupRequestToCarrier = _data["sendPickupRequestToCarrier"];
        if (Array.isArray(_data["consignmentIDs"])) {
          this.consignmentIDs = [] as any;
          for (let item of _data["consignmentIDs"]) this.consignmentIDs!.push(item);
        }
      }
    }
  
    static fromJS(data: any): CreateManifest {
      data = typeof data === "object" ? data : {};
      let result = new CreateManifest();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["tenantId"] = this.tenantId;
      data["customerId"] = this.customerId;
      data["pickupDate"] = this.pickupDate;
      data["pickupReadyAtTime"] = this.pickupReadyAtTime;
      data["pickupNoLaterThanTime"] = this.pickupNoLaterThanTime;
      data["pickupAddress"] = this.pickupAddress ? this.pickupAddress.toJSON() : <any>undefined;
      data["sendPickupRequestToCarrier"] = this.sendPickupRequestToCarrier;
      if (Array.isArray(this.consignmentIDs)) {
        data["consignmentIDs"] = [];
        for (let item of this.consignmentIDs) data["consignmentIDs"].push(item);
      }
      return data;
    }
  }
  
  export interface ICreateManifest {
    tenantId?: number;
    customerId?: number;
    pickupDate?: string | undefined;
    pickupReadyAtTime?: string | undefined;
    pickupNoLaterThanTime?: string | undefined;
    pickupAddress?: Address;
    sendPickupRequestToCarrier?: boolean;
    consignmentIDs?: number[] | undefined;
  }
  
  export class CustomAttributeData implements ICustomAttributeData {
    attributeType?: Type;
    constructor_?: ConstructorInfo;
    readonly constructorArguments?: CustomAttributeTypedArgument[] | undefined;
    readonly namedArguments?: CustomAttributeNamedArgument[] | undefined;
  
    constructor(data?: ICustomAttributeData) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.attributeType = _data["attributeType"] ? Type.fromJS(_data["attributeType"]) : <any>undefined;
        this.constructor_ = _data["constructor"] ? ConstructorInfo.fromJS(_data["constructor"]) : <any>undefined;
        if (Array.isArray(_data["constructorArguments"])) {
          (<any>this).constructorArguments = [] as any;
          for (let item of _data["constructorArguments"]) (<any>this).constructorArguments!.push(CustomAttributeTypedArgument.fromJS(item));
        }
        if (Array.isArray(_data["namedArguments"])) {
          (<any>this).namedArguments = [] as any;
          for (let item of _data["namedArguments"]) (<any>this).namedArguments!.push(CustomAttributeNamedArgument.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): CustomAttributeData {
      data = typeof data === "object" ? data : {};
      let result = new CustomAttributeData();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["attributeType"] = this.attributeType ? this.attributeType.toJSON() : <any>undefined;
      data["constructor"] = this.constructor_ ? this.constructor_.toJSON() : <any>undefined;
      if (Array.isArray(this.constructorArguments)) {
        data["constructorArguments"] = [];
        for (let item of this.constructorArguments) data["constructorArguments"].push(item.toJSON());
      }
      if (Array.isArray(this.namedArguments)) {
        data["namedArguments"] = [];
        for (let item of this.namedArguments) data["namedArguments"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface ICustomAttributeData {
    attributeType?: Type;
    constructor_?: ConstructorInfo;
    constructorArguments?: CustomAttributeTypedArgument[] | undefined;
    namedArguments?: CustomAttributeNamedArgument[] | undefined;
  }
  
  export class CustomAttributeNamedArgument implements ICustomAttributeNamedArgument {
    memberInfo?: MemberInfo;
    typedValue?: CustomAttributeTypedArgument;
    readonly memberName?: string | undefined;
    readonly isField?: boolean;
  
    constructor(data?: ICustomAttributeNamedArgument) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.memberInfo = _data["memberInfo"] ? MemberInfo.fromJS(_data["memberInfo"]) : <any>undefined;
        this.typedValue = _data["typedValue"] ? CustomAttributeTypedArgument.fromJS(_data["typedValue"]) : <any>undefined;
        (<any>this).memberName = _data["memberName"];
        (<any>this).isField = _data["isField"];
      }
    }
  
    static fromJS(data: any): CustomAttributeNamedArgument {
      data = typeof data === "object" ? data : {};
      let result = new CustomAttributeNamedArgument();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["memberInfo"] = this.memberInfo ? this.memberInfo.toJSON() : <any>undefined;
      data["typedValue"] = this.typedValue ? this.typedValue.toJSON() : <any>undefined;
      data["memberName"] = this.memberName;
      data["isField"] = this.isField;
      return data;
    }
  }
  
  export interface ICustomAttributeNamedArgument {
    memberInfo?: MemberInfo;
    typedValue?: CustomAttributeTypedArgument;
    memberName?: string | undefined;
    isField?: boolean;
  }
  
  export class CustomAttributeTypedArgument implements ICustomAttributeTypedArgument {
    argumentType?: Type;
    readonly value?: any | undefined;
  
    constructor(data?: ICustomAttributeTypedArgument) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.argumentType = _data["argumentType"] ? Type.fromJS(_data["argumentType"]) : <any>undefined;
        (<any>this).value = _data["value"];
      }
    }
  
    static fromJS(data: any): CustomAttributeTypedArgument {
      data = typeof data === "object" ? data : {};
      let result = new CustomAttributeTypedArgument();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["argumentType"] = this.argumentType ? this.argumentType.toJSON() : <any>undefined;
      data["value"] = this.value;
      return data;
    }
  }
  
  export interface ICustomAttributeTypedArgument {
    argumentType?: Type;
    value?: any | undefined;
  }
  
  export class CustomerManifest implements ICustomerManifest {
    tenantId?: number;
    customerId?: number;
    customerName?: string | undefined;
    carrierName?: string | undefined;
    manifestId?: number;
    manifestNo?: string | undefined;
    pickupDate?: string | undefined;
    pickupAddress?: Address;
    hazardousContact?: string | undefined;
    hazardousPhone?: string | undefined;
    consignmentList?: ManifestedConsignment[] | undefined;
  
    constructor(data?: ICustomerManifest) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.tenantId = _data["tenantId"];
        this.customerId = _data["customerId"];
        this.customerName = _data["customerName"];
        this.carrierName = _data["carrierName"];
        this.manifestId = _data["manifestId"];
        this.manifestNo = _data["manifestNo"];
        this.pickupDate = _data["pickupDate"];
        this.pickupAddress = _data["pickupAddress"] ? Address.fromJS(_data["pickupAddress"]) : <any>undefined;
        this.hazardousContact = _data["hazardousContact"];
        this.hazardousPhone = _data["hazardousPhone"];
        if (Array.isArray(_data["consignmentList"])) {
          this.consignmentList = [] as any;
          for (let item of _data["consignmentList"]) this.consignmentList!.push(ManifestedConsignment.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): CustomerManifest {
      data = typeof data === "object" ? data : {};
      let result = new CustomerManifest();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["tenantId"] = this.tenantId;
      data["customerId"] = this.customerId;
      data["customerName"] = this.customerName;
      data["carrierName"] = this.carrierName;
      data["manifestId"] = this.manifestId;
      data["manifestNo"] = this.manifestNo;
      data["pickupDate"] = this.pickupDate;
      data["pickupAddress"] = this.pickupAddress ? this.pickupAddress.toJSON() : <any>undefined;
      data["hazardousContact"] = this.hazardousContact;
      data["hazardousPhone"] = this.hazardousPhone;
      if (Array.isArray(this.consignmentList)) {
        data["consignmentList"] = [];
        for (let item of this.consignmentList) data["consignmentList"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface ICustomerManifest {
    tenantId?: number;
    customerId?: number;
    customerName?: string | undefined;
    carrierName?: string | undefined;
    manifestId?: number;
    manifestNo?: string | undefined;
    pickupDate?: string | undefined;
    pickupAddress?: Address;
    hazardousContact?: string | undefined;
    hazardousPhone?: string | undefined;
    consignmentList?: ManifestedConsignment[] | undefined;
  }
  
  export class Document implements IDocument {
    type?: string | undefined;
    uri?: string | undefined;
  
    constructor(data?: IDocument) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.type = _data["type"];
        this.uri = _data["uri"];
      }
    }
  
    static fromJS(data: any): Document {
      data = typeof data === "object" ? data : {};
      let result = new Document();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["type"] = this.type;
      data["uri"] = this.uri;
      return data;
    }
  }
  
  export interface IDocument {
    type?: string | undefined;
    uri?: string | undefined;
  }
  
  export class Event implements IEvent {
    reference?: string | undefined;
    eventTime?: Date;
    eventType?: string | undefined;
    location?: string | undefined;
    comments?: string | undefined;
    milestone?: string | undefined;
  
    constructor(data?: IEvent) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.reference = _data["reference"];
        this.eventTime = _data["eventTime"] ? new Date(_data["eventTime"].toString()) : <any>undefined;
        this.eventType = _data["eventType"];
        this.location = _data["location"];
        this.comments = _data["comments"];
        this.milestone = _data["milestone"];
      }
    }
  
    static fromJS(data: any): Event {
      data = typeof data === "object" ? data : {};
      let result = new Event();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["reference"] = this.reference;
      data["eventTime"] = this.eventTime ? this.eventTime.toISOString() : <any>undefined;
      data["eventType"] = this.eventType;
      data["location"] = this.location;
      data["comments"] = this.comments;
      data["milestone"] = this.milestone;
      return data;
    }
  }
  
  export interface IEvent {
    reference?: string | undefined;
    eventTime?: Date;
    eventType?: string | undefined;
    location?: string | undefined;
    comments?: string | undefined;
    milestone?: string | undefined;
  }
  
  export enum EventAttributes {
    _0 = 0,
    _512 = 512,
    _1024 = 1024,
  }
  
  export class EventInfo implements IEventInfo {
    readonly name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    memberType?: MemberTypes;
    attributes?: EventAttributes;
    readonly isSpecialName?: boolean;
    addMethod?: MethodInfo;
    removeMethod?: MethodInfo;
    raiseMethod?: MethodInfo;
    readonly isMulticast?: boolean;
    eventHandlerType?: Type;
  
    constructor(data?: IEventInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).name = _data["name"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        this.memberType = _data["memberType"];
        this.attributes = _data["attributes"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        this.addMethod = _data["addMethod"] ? MethodInfo.fromJS(_data["addMethod"]) : <any>undefined;
        this.removeMethod = _data["removeMethod"] ? MethodInfo.fromJS(_data["removeMethod"]) : <any>undefined;
        this.raiseMethod = _data["raiseMethod"] ? MethodInfo.fromJS(_data["raiseMethod"]) : <any>undefined;
        (<any>this).isMulticast = _data["isMulticast"];
        this.eventHandlerType = _data["eventHandlerType"] ? Type.fromJS(_data["eventHandlerType"]) : <any>undefined;
      }
    }
  
    static fromJS(data: any): EventInfo {
      data = typeof data === "object" ? data : {};
      let result = new EventInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["name"] = this.name;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["memberType"] = this.memberType;
      data["attributes"] = this.attributes;
      data["isSpecialName"] = this.isSpecialName;
      data["addMethod"] = this.addMethod ? this.addMethod.toJSON() : <any>undefined;
      data["removeMethod"] = this.removeMethod ? this.removeMethod.toJSON() : <any>undefined;
      data["raiseMethod"] = this.raiseMethod ? this.raiseMethod.toJSON() : <any>undefined;
      data["isMulticast"] = this.isMulticast;
      data["eventHandlerType"] = this.eventHandlerType ? this.eventHandlerType.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IEventInfo {
    name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    memberType?: MemberTypes;
    attributes?: EventAttributes;
    isSpecialName?: boolean;
    addMethod?: MethodInfo;
    removeMethod?: MethodInfo;
    raiseMethod?: MethodInfo;
    isMulticast?: boolean;
    eventHandlerType?: Type;
  }
  
  export class Exception implements IException {
    targetSite?: MethodBase;
    readonly stackTrace?: string | undefined;
    readonly message?: string | undefined;
    readonly data?: { [key: string]: any } | undefined;
    innerException?: Exception;
    helpLink?: string | undefined;
    source?: string | undefined;
    hResult?: number;
  
    constructor(data?: IException) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.targetSite = _data["targetSite"] ? MethodBase.fromJS(_data["targetSite"]) : <any>undefined;
        (<any>this).stackTrace = _data["stackTrace"];
        (<any>this).message = _data["message"];
        if (_data["data"]) {
          (<any>this).data = {} as any;
          for (let key in _data["data"]) {
            if (_data["data"].hasOwnProperty(key)) (<any>(<any>this).data)![key] = _data["data"][key];
          }
        }
        this.innerException = _data["innerException"] ? Exception.fromJS(_data["innerException"]) : <any>undefined;
        this.helpLink = _data["helpLink"];
        this.source = _data["source"];
        this.hResult = _data["hResult"];
      }
    }
  
    static fromJS(data: any): Exception {
      data = typeof data === "object" ? data : {};
      let result = new Exception();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["targetSite"] = this.targetSite ? this.targetSite.toJSON() : <any>undefined;
      data["stackTrace"] = this.stackTrace;
      data["message"] = this.message;
      if (this.data) {
        data["data"] = {};
        for (let key in this.data) {
          if (this.data.hasOwnProperty(key)) (<any>data["data"])[key] = this.data[key];
        }
      }
      data["innerException"] = this.innerException ? this.innerException.toJSON() : <any>undefined;
      data["helpLink"] = this.helpLink;
      data["source"] = this.source;
      data["hResult"] = this.hResult;
      return data;
    }
  }
  
  export interface IException {
    targetSite?: MethodBase;
    stackTrace?: string | undefined;
    message?: string | undefined;
    data?: { [key: string]: any } | undefined;
    innerException?: Exception;
    helpLink?: string | undefined;
    source?: string | undefined;
    hResult?: number;
  }
  
  export class FeePrice implements IFeePrice {
    code?: string | undefined;
    name?: string | undefined;
    charge?: number;
    net?: number;
    tax?: number;
    total?: number;
  
    constructor(data?: IFeePrice) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.code = _data["code"];
        this.name = _data["name"];
        this.charge = _data["charge"];
        this.net = _data["net"];
        this.tax = _data["tax"];
        this.total = _data["total"];
      }
    }
  
    static fromJS(data: any): FeePrice {
      data = typeof data === "object" ? data : {};
      let result = new FeePrice();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["code"] = this.code;
      data["name"] = this.name;
      data["charge"] = this.charge;
      data["net"] = this.net;
      data["tax"] = this.tax;
      data["total"] = this.total;
      return data;
    }
  }
  
  export interface IFeePrice {
    code?: string | undefined;
    name?: string | undefined;
    charge?: number;
    net?: number;
    tax?: number;
    total?: number;
  }
  
  export enum FieldAttributes {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
    _6 = 6,
    _7 = 7,
    _16 = 16,
    _32 = 32,
    _64 = 64,
    _128 = 128,
    _256 = 256,
    _512 = 512,
    _1024 = 1024,
    _4096 = 4096,
    _8192 = 8192,
    _32768 = 32768,
    _38144 = 38144,
  }
  
  export class FieldInfo implements IFieldInfo {
    readonly name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    memberType?: MemberTypes;
    attributes?: FieldAttributes;
    fieldType?: Type;
    readonly isInitOnly?: boolean;
    readonly isLiteral?: boolean;
    readonly isNotSerialized?: boolean;
    readonly isPinvokeImpl?: boolean;
    readonly isSpecialName?: boolean;
    readonly isStatic?: boolean;
    readonly isAssembly?: boolean;
    readonly isFamily?: boolean;
    readonly isFamilyAndAssembly?: boolean;
    readonly isFamilyOrAssembly?: boolean;
    readonly isPrivate?: boolean;
    readonly isPublic?: boolean;
    readonly isSecurityCritical?: boolean;
    readonly isSecuritySafeCritical?: boolean;
    readonly isSecurityTransparent?: boolean;
    fieldHandle?: RuntimeFieldHandle;
  
    constructor(data?: IFieldInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).name = _data["name"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        this.memberType = _data["memberType"];
        this.attributes = _data["attributes"];
        this.fieldType = _data["fieldType"] ? Type.fromJS(_data["fieldType"]) : <any>undefined;
        (<any>this).isInitOnly = _data["isInitOnly"];
        (<any>this).isLiteral = _data["isLiteral"];
        (<any>this).isNotSerialized = _data["isNotSerialized"];
        (<any>this).isPinvokeImpl = _data["isPinvokeImpl"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        (<any>this).isStatic = _data["isStatic"];
        (<any>this).isAssembly = _data["isAssembly"];
        (<any>this).isFamily = _data["isFamily"];
        (<any>this).isFamilyAndAssembly = _data["isFamilyAndAssembly"];
        (<any>this).isFamilyOrAssembly = _data["isFamilyOrAssembly"];
        (<any>this).isPrivate = _data["isPrivate"];
        (<any>this).isPublic = _data["isPublic"];
        (<any>this).isSecurityCritical = _data["isSecurityCritical"];
        (<any>this).isSecuritySafeCritical = _data["isSecuritySafeCritical"];
        (<any>this).isSecurityTransparent = _data["isSecurityTransparent"];
        this.fieldHandle = _data["fieldHandle"] ? RuntimeFieldHandle.fromJS(_data["fieldHandle"]) : <any>undefined;
      }
    }
  
    static fromJS(data: any): FieldInfo {
      data = typeof data === "object" ? data : {};
      let result = new FieldInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["name"] = this.name;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["memberType"] = this.memberType;
      data["attributes"] = this.attributes;
      data["fieldType"] = this.fieldType ? this.fieldType.toJSON() : <any>undefined;
      data["isInitOnly"] = this.isInitOnly;
      data["isLiteral"] = this.isLiteral;
      data["isNotSerialized"] = this.isNotSerialized;
      data["isPinvokeImpl"] = this.isPinvokeImpl;
      data["isSpecialName"] = this.isSpecialName;
      data["isStatic"] = this.isStatic;
      data["isAssembly"] = this.isAssembly;
      data["isFamily"] = this.isFamily;
      data["isFamilyAndAssembly"] = this.isFamilyAndAssembly;
      data["isFamilyOrAssembly"] = this.isFamilyOrAssembly;
      data["isPrivate"] = this.isPrivate;
      data["isPublic"] = this.isPublic;
      data["isSecurityCritical"] = this.isSecurityCritical;
      data["isSecuritySafeCritical"] = this.isSecuritySafeCritical;
      data["isSecurityTransparent"] = this.isSecurityTransparent;
      data["fieldHandle"] = this.fieldHandle ? this.fieldHandle.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IFieldInfo {
    name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    memberType?: MemberTypes;
    attributes?: FieldAttributes;
    fieldType?: Type;
    isInitOnly?: boolean;
    isLiteral?: boolean;
    isNotSerialized?: boolean;
    isPinvokeImpl?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    fieldHandle?: RuntimeFieldHandle;
  }
  
  export enum GenericParameterAttributes {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _8 = 8,
    _16 = 16,
    _28 = 28,
  }
  
  export class GuidOrErrorResponse implements IGuidOrErrorResponse {
    uid?: string | undefined;
    isValid?: boolean;
    validationErrors?: ValidationError[] | undefined;
    exception?: CarioException;
  
    constructor(data?: IGuidOrErrorResponse) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.uid = _data["uid"];
        this.isValid = _data["isValid"];
        if (Array.isArray(_data["validationErrors"])) {
          this.validationErrors = [] as any;
          for (let item of _data["validationErrors"]) this.validationErrors!.push(ValidationError.fromJS(item));
        }
        this.exception = _data["exception"] ? CarioException.fromJS(_data["exception"]) : <any>undefined;
      }
    }
  
    static fromJS(data: any): GuidOrErrorResponse {
      data = typeof data === "object" ? data : {};
      let result = new GuidOrErrorResponse();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["uid"] = this.uid;
      data["isValid"] = this.isValid;
      if (Array.isArray(this.validationErrors)) {
        data["validationErrors"] = [];
        for (let item of this.validationErrors) data["validationErrors"].push(item.toJSON());
      }
      data["exception"] = this.exception ? this.exception.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IGuidOrErrorResponse {
    uid?: string | undefined;
    isValid?: boolean;
    validationErrors?: ValidationError[] | undefined;
    exception?: CarioException;
  }
  
  export class HazardousMaterial implements IHazardousMaterial {
    id?: number;
    unCode?: string | undefined;
    properShippingName?: string | undefined;
    name?: string | undefined;
    class?: string | undefined;
    subsidiaryHazard?: string | undefined;
    packingGroup?: string | undefined;
    quantity?: number;
    aggregateQuantity?: number;
    uom?: string | undefined;
    receptacle?: string | undefined;
  
    constructor(data?: IHazardousMaterial) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.unCode = _data["unCode"];
        this.properShippingName = _data["properShippingName"];
        this.name = _data["name"];
        this.class = _data["class"];
        this.subsidiaryHazard = _data["subsidiaryHazard"];
        this.packingGroup = _data["packingGroup"];
        this.quantity = _data["quantity"];
        this.aggregateQuantity = _data["aggregateQuantity"];
        this.uom = _data["uom"];
        this.receptacle = _data["receptacle"];
      }
    }
  
    static fromJS(data: any): HazardousMaterial {
      data = typeof data === "object" ? data : {};
      let result = new HazardousMaterial();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["unCode"] = this.unCode;
      data["properShippingName"] = this.properShippingName;
      data["name"] = this.name;
      data["class"] = this.class;
      data["subsidiaryHazard"] = this.subsidiaryHazard;
      data["packingGroup"] = this.packingGroup;
      data["quantity"] = this.quantity;
      data["aggregateQuantity"] = this.aggregateQuantity;
      data["uom"] = this.uom;
      data["receptacle"] = this.receptacle;
      return data;
    }
  }
  
  export interface IHazardousMaterial {
    id?: number;
    unCode?: string | undefined;
    properShippingName?: string | undefined;
    name?: string | undefined;
    class?: string | undefined;
    subsidiaryHazard?: string | undefined;
    packingGroup?: string | undefined;
    quantity?: number;
    aggregateQuantity?: number;
    uom?: string | undefined;
    receptacle?: string | undefined;
  }
  
  export class ICustomAttributeProvider implements IICustomAttributeProvider {
    constructor(data?: IICustomAttributeProvider) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {}
  
    static fromJS(data: any): ICustomAttributeProvider {
      data = typeof data === "object" ? data : {};
      let result = new ICustomAttributeProvider();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      return data;
    }
  }
  
  export interface IICustomAttributeProvider {}
  
  export class IntPtr implements IIntPtr {
    constructor(data?: IIntPtr) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {}
  
    static fromJS(data: any): IntPtr {
      data = typeof data === "object" ? data : {};
      let result = new IntPtr();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      return data;
    }
  }
  
  export interface IIntPtr {}
  
  export enum LayoutKind {
    _0 = 0,
    _2 = 2,
    _3 = 3,
  }
  
  export class Location implements ILocation {
    id!: number;
    locality!: string;
    state?: string | undefined;
    postcode?: string | undefined;
    country!: Country;
  
    constructor(data?: ILocation) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
      if (!data) {
        this.country = new Country();
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.locality = _data["locality"];
        this.state = _data["state"];
        this.postcode = _data["postcode"];
        this.country = _data["country"] ? Country.fromJS(_data["country"]) : new Country();
      }
    }
  
    static fromJS(data: any): Location {
      data = typeof data === "object" ? data : {};
      let result = new Location();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["locality"] = this.locality;
      data["state"] = this.state;
      data["postcode"] = this.postcode;
      data["country"] = this.country ? this.country.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface ILocation {
    id: number;
    locality: string;
    state?: string | undefined;
    postcode?: string | undefined;
    country: Country;
  }
  
  export class LocationQuote implements ILocationQuote {
    id!: number;
    locality?: string | undefined;
    state?: string | undefined;
    postcode?: string | undefined;
    country!: CountryQuote;
  
    constructor(data?: ILocationQuote) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
      if (!data) {
        this.country = new CountryQuote();
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.locality = _data["locality"];
        this.state = _data["state"];
        this.postcode = _data["postcode"];
        this.country = _data["country"] ? CountryQuote.fromJS(_data["country"]) : new CountryQuote();
      }
    }
  
    static fromJS(data: any): LocationQuote {
      data = typeof data === "object" ? data : {};
      let result = new LocationQuote();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["locality"] = this.locality;
      data["state"] = this.state;
      data["postcode"] = this.postcode;
      data["country"] = this.country ? this.country.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface ILocationQuote {
    id: number;
    locality?: string | undefined;
    state?: string | undefined;
    postcode?: string | undefined;
    country: CountryQuote;
  }
  
  export class LogEntry implements ILogEntry {
    id?: number;
    source?: string | undefined;
    member?: string | undefined;
    level?: string | undefined;
    message?: string | undefined;
  
    constructor(data?: ILogEntry) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.source = _data["source"];
        this.member = _data["member"];
        this.level = _data["level"];
        this.message = _data["message"];
      }
    }
  
    static fromJS(data: any): LogEntry {
      data = typeof data === "object" ? data : {};
      let result = new LogEntry();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["source"] = this.source;
      data["member"] = this.member;
      data["level"] = this.level;
      data["message"] = this.message;
      return data;
    }
  }
  
  export interface ILogEntry {
    id?: number;
    source?: string | undefined;
    member?: string | undefined;
    level?: string | undefined;
    message?: string | undefined;
  }
  
  export class LookupItem implements ILookupItem {
    id?: number;
    description?: string | undefined;
  
    constructor(data?: ILookupItem) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.description = _data["description"];
      }
    }
  
    static fromJS(data: any): LookupItem {
      data = typeof data === "object" ? data : {};
      let result = new LookupItem();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["description"] = this.description;
      return data;
    }
  }
  
  export interface ILookupItem {
    id?: number;
    description?: string | undefined;
  }
  
  export class ManifestedConsignment implements IManifestedConsignment {
    consignmentId?: number;
    connoteNumber?: string | undefined;
  
    constructor(data?: IManifestedConsignment) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.consignmentId = _data["consignmentId"];
        this.connoteNumber = _data["connoteNumber"];
      }
    }
  
    static fromJS(data: any): ManifestedConsignment {
      data = typeof data === "object" ? data : {};
      let result = new ManifestedConsignment();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["consignmentId"] = this.consignmentId;
      data["connoteNumber"] = this.connoteNumber;
      return data;
    }
  }
  
  export interface IManifestedConsignment {
    consignmentId?: number;
    connoteNumber?: string | undefined;
  }
  
  export class MemberInfo implements IMemberInfo {
    memberType?: MemberTypes;
    declaringType?: Type;
    reflectedType?: Type;
    readonly name?: string | undefined;
    module?: Module;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
  
    constructor(data?: IMemberInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.memberType = _data["memberType"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        (<any>this).name = _data["name"];
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
      }
    }
  
    static fromJS(data: any): MemberInfo {
      data = typeof data === "object" ? data : {};
      let result = new MemberInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["memberType"] = this.memberType;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["name"] = this.name;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      return data;
    }
  }
  
  export interface IMemberInfo {
    memberType?: MemberTypes;
    declaringType?: Type;
    reflectedType?: Type;
    name?: string | undefined;
    module?: Module;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
  }
  
  export enum MemberTypes {
    _1 = 1,
    _2 = 2,
    _4 = 4,
    _8 = 8,
    _16 = 16,
    _32 = 32,
    _64 = 64,
    _128 = 128,
    _191 = 191,
  }
  
  export enum MethodAttributes {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
    _6 = 6,
    _7 = 7,
    _8 = 8,
    _16 = 16,
    _32 = 32,
    _64 = 64,
    _128 = 128,
    _256 = 256,
    _512 = 512,
    _1024 = 1024,
    _2048 = 2048,
    _4096 = 4096,
    _8192 = 8192,
    _16384 = 16384,
    _32768 = 32768,
    _53248 = 53248,
  }
  
  export class MethodBase implements IMethodBase {
    memberType?: MemberTypes;
    readonly name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    attributes?: MethodAttributes;
    methodImplementationFlags?: MethodImplAttributes;
    callingConvention?: CallingConventions;
    readonly isAbstract?: boolean;
    readonly isConstructor?: boolean;
    readonly isFinal?: boolean;
    readonly isHideBySig?: boolean;
    readonly isSpecialName?: boolean;
    readonly isStatic?: boolean;
    readonly isVirtual?: boolean;
    readonly isAssembly?: boolean;
    readonly isFamily?: boolean;
    readonly isFamilyAndAssembly?: boolean;
    readonly isFamilyOrAssembly?: boolean;
    readonly isPrivate?: boolean;
    readonly isPublic?: boolean;
    readonly isConstructedGenericMethod?: boolean;
    readonly isGenericMethod?: boolean;
    readonly isGenericMethodDefinition?: boolean;
    readonly containsGenericParameters?: boolean;
    methodHandle?: RuntimeMethodHandle;
    readonly isSecurityCritical?: boolean;
    readonly isSecuritySafeCritical?: boolean;
    readonly isSecurityTransparent?: boolean;
  
    constructor(data?: IMethodBase) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.memberType = _data["memberType"];
        (<any>this).name = _data["name"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        this.attributes = _data["attributes"];
        this.methodImplementationFlags = _data["methodImplementationFlags"];
        this.callingConvention = _data["callingConvention"];
        (<any>this).isAbstract = _data["isAbstract"];
        (<any>this).isConstructor = _data["isConstructor"];
        (<any>this).isFinal = _data["isFinal"];
        (<any>this).isHideBySig = _data["isHideBySig"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        (<any>this).isStatic = _data["isStatic"];
        (<any>this).isVirtual = _data["isVirtual"];
        (<any>this).isAssembly = _data["isAssembly"];
        (<any>this).isFamily = _data["isFamily"];
        (<any>this).isFamilyAndAssembly = _data["isFamilyAndAssembly"];
        (<any>this).isFamilyOrAssembly = _data["isFamilyOrAssembly"];
        (<any>this).isPrivate = _data["isPrivate"];
        (<any>this).isPublic = _data["isPublic"];
        (<any>this).isConstructedGenericMethod = _data["isConstructedGenericMethod"];
        (<any>this).isGenericMethod = _data["isGenericMethod"];
        (<any>this).isGenericMethodDefinition = _data["isGenericMethodDefinition"];
        (<any>this).containsGenericParameters = _data["containsGenericParameters"];
        this.methodHandle = _data["methodHandle"] ? RuntimeMethodHandle.fromJS(_data["methodHandle"]) : <any>undefined;
        (<any>this).isSecurityCritical = _data["isSecurityCritical"];
        (<any>this).isSecuritySafeCritical = _data["isSecuritySafeCritical"];
        (<any>this).isSecurityTransparent = _data["isSecurityTransparent"];
      }
    }
  
    static fromJS(data: any): MethodBase {
      data = typeof data === "object" ? data : {};
      let result = new MethodBase();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["memberType"] = this.memberType;
      data["name"] = this.name;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["attributes"] = this.attributes;
      data["methodImplementationFlags"] = this.methodImplementationFlags;
      data["callingConvention"] = this.callingConvention;
      data["isAbstract"] = this.isAbstract;
      data["isConstructor"] = this.isConstructor;
      data["isFinal"] = this.isFinal;
      data["isHideBySig"] = this.isHideBySig;
      data["isSpecialName"] = this.isSpecialName;
      data["isStatic"] = this.isStatic;
      data["isVirtual"] = this.isVirtual;
      data["isAssembly"] = this.isAssembly;
      data["isFamily"] = this.isFamily;
      data["isFamilyAndAssembly"] = this.isFamilyAndAssembly;
      data["isFamilyOrAssembly"] = this.isFamilyOrAssembly;
      data["isPrivate"] = this.isPrivate;
      data["isPublic"] = this.isPublic;
      data["isConstructedGenericMethod"] = this.isConstructedGenericMethod;
      data["isGenericMethod"] = this.isGenericMethod;
      data["isGenericMethodDefinition"] = this.isGenericMethodDefinition;
      data["containsGenericParameters"] = this.containsGenericParameters;
      data["methodHandle"] = this.methodHandle ? this.methodHandle.toJSON() : <any>undefined;
      data["isSecurityCritical"] = this.isSecurityCritical;
      data["isSecuritySafeCritical"] = this.isSecuritySafeCritical;
      data["isSecurityTransparent"] = this.isSecurityTransparent;
      return data;
    }
  }
  
  export interface IMethodBase {
    memberType?: MemberTypes;
    name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    attributes?: MethodAttributes;
    methodImplementationFlags?: MethodImplAttributes;
    callingConvention?: CallingConventions;
    isAbstract?: boolean;
    isConstructor?: boolean;
    isFinal?: boolean;
    isHideBySig?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isVirtual?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isConstructedGenericMethod?: boolean;
    isGenericMethod?: boolean;
    isGenericMethodDefinition?: boolean;
    containsGenericParameters?: boolean;
    methodHandle?: RuntimeMethodHandle;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
  }
  
  export enum MethodImplAttributes {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _8 = 8,
    _16 = 16,
    _32 = 32,
    _64 = 64,
    _128 = 128,
    _256 = 256,
    _512 = 512,
    _4096 = 4096,
    _65535 = 65535,
  }
  
  export class MethodInfo implements IMethodInfo {
    readonly name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    attributes?: MethodAttributes;
    methodImplementationFlags?: MethodImplAttributes;
    callingConvention?: CallingConventions;
    readonly isAbstract?: boolean;
    readonly isConstructor?: boolean;
    readonly isFinal?: boolean;
    readonly isHideBySig?: boolean;
    readonly isSpecialName?: boolean;
    readonly isStatic?: boolean;
    readonly isVirtual?: boolean;
    readonly isAssembly?: boolean;
    readonly isFamily?: boolean;
    readonly isFamilyAndAssembly?: boolean;
    readonly isFamilyOrAssembly?: boolean;
    readonly isPrivate?: boolean;
    readonly isPublic?: boolean;
    readonly isConstructedGenericMethod?: boolean;
    readonly isGenericMethod?: boolean;
    readonly isGenericMethodDefinition?: boolean;
    readonly containsGenericParameters?: boolean;
    methodHandle?: RuntimeMethodHandle;
    readonly isSecurityCritical?: boolean;
    readonly isSecuritySafeCritical?: boolean;
    readonly isSecurityTransparent?: boolean;
    memberType?: MemberTypes;
    returnParameter?: ParameterInfo;
    returnType?: Type;
    returnTypeCustomAttributes?: ICustomAttributeProvider;
  
    constructor(data?: IMethodInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).name = _data["name"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        this.attributes = _data["attributes"];
        this.methodImplementationFlags = _data["methodImplementationFlags"];
        this.callingConvention = _data["callingConvention"];
        (<any>this).isAbstract = _data["isAbstract"];
        (<any>this).isConstructor = _data["isConstructor"];
        (<any>this).isFinal = _data["isFinal"];
        (<any>this).isHideBySig = _data["isHideBySig"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        (<any>this).isStatic = _data["isStatic"];
        (<any>this).isVirtual = _data["isVirtual"];
        (<any>this).isAssembly = _data["isAssembly"];
        (<any>this).isFamily = _data["isFamily"];
        (<any>this).isFamilyAndAssembly = _data["isFamilyAndAssembly"];
        (<any>this).isFamilyOrAssembly = _data["isFamilyOrAssembly"];
        (<any>this).isPrivate = _data["isPrivate"];
        (<any>this).isPublic = _data["isPublic"];
        (<any>this).isConstructedGenericMethod = _data["isConstructedGenericMethod"];
        (<any>this).isGenericMethod = _data["isGenericMethod"];
        (<any>this).isGenericMethodDefinition = _data["isGenericMethodDefinition"];
        (<any>this).containsGenericParameters = _data["containsGenericParameters"];
        this.methodHandle = _data["methodHandle"] ? RuntimeMethodHandle.fromJS(_data["methodHandle"]) : <any>undefined;
        (<any>this).isSecurityCritical = _data["isSecurityCritical"];
        (<any>this).isSecuritySafeCritical = _data["isSecuritySafeCritical"];
        (<any>this).isSecurityTransparent = _data["isSecurityTransparent"];
        this.memberType = _data["memberType"];
        this.returnParameter = _data["returnParameter"] ? ParameterInfo.fromJS(_data["returnParameter"]) : <any>undefined;
        this.returnType = _data["returnType"] ? Type.fromJS(_data["returnType"]) : <any>undefined;
        this.returnTypeCustomAttributes = _data["returnTypeCustomAttributes"]
          ? ICustomAttributeProvider.fromJS(_data["returnTypeCustomAttributes"])
          : <any>undefined;
      }
    }
  
    static fromJS(data: any): MethodInfo {
      data = typeof data === "object" ? data : {};
      let result = new MethodInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["name"] = this.name;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["attributes"] = this.attributes;
      data["methodImplementationFlags"] = this.methodImplementationFlags;
      data["callingConvention"] = this.callingConvention;
      data["isAbstract"] = this.isAbstract;
      data["isConstructor"] = this.isConstructor;
      data["isFinal"] = this.isFinal;
      data["isHideBySig"] = this.isHideBySig;
      data["isSpecialName"] = this.isSpecialName;
      data["isStatic"] = this.isStatic;
      data["isVirtual"] = this.isVirtual;
      data["isAssembly"] = this.isAssembly;
      data["isFamily"] = this.isFamily;
      data["isFamilyAndAssembly"] = this.isFamilyAndAssembly;
      data["isFamilyOrAssembly"] = this.isFamilyOrAssembly;
      data["isPrivate"] = this.isPrivate;
      data["isPublic"] = this.isPublic;
      data["isConstructedGenericMethod"] = this.isConstructedGenericMethod;
      data["isGenericMethod"] = this.isGenericMethod;
      data["isGenericMethodDefinition"] = this.isGenericMethodDefinition;
      data["containsGenericParameters"] = this.containsGenericParameters;
      data["methodHandle"] = this.methodHandle ? this.methodHandle.toJSON() : <any>undefined;
      data["isSecurityCritical"] = this.isSecurityCritical;
      data["isSecuritySafeCritical"] = this.isSecuritySafeCritical;
      data["isSecurityTransparent"] = this.isSecurityTransparent;
      data["memberType"] = this.memberType;
      data["returnParameter"] = this.returnParameter ? this.returnParameter.toJSON() : <any>undefined;
      data["returnType"] = this.returnType ? this.returnType.toJSON() : <any>undefined;
      data["returnTypeCustomAttributes"] = this.returnTypeCustomAttributes ? this.returnTypeCustomAttributes.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IMethodInfo {
    name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    attributes?: MethodAttributes;
    methodImplementationFlags?: MethodImplAttributes;
    callingConvention?: CallingConventions;
    isAbstract?: boolean;
    isConstructor?: boolean;
    isFinal?: boolean;
    isHideBySig?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isVirtual?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isConstructedGenericMethod?: boolean;
    isGenericMethod?: boolean;
    isGenericMethodDefinition?: boolean;
    containsGenericParameters?: boolean;
    methodHandle?: RuntimeMethodHandle;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    memberType?: MemberTypes;
    returnParameter?: ParameterInfo;
    returnType?: Type;
    returnTypeCustomAttributes?: ICustomAttributeProvider;
  }
  
  export class ModelError implements IModelError {
    exception?: Exception;
    readonly errorMessage?: string | undefined;
  
    constructor(data?: IModelError) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.exception = _data["exception"] ? Exception.fromJS(_data["exception"]) : <any>undefined;
        (<any>this).errorMessage = _data["errorMessage"];
      }
    }
  
    static fromJS(data: any): ModelError {
      data = typeof data === "object" ? data : {};
      let result = new ModelError();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["exception"] = this.exception ? this.exception.toJSON() : <any>undefined;
      data["errorMessage"] = this.errorMessage;
      return data;
    }
  }
  
  export interface IModelError {
    exception?: Exception;
    errorMessage?: string | undefined;
  }
  
  export class ModelStateEntry implements IModelStateEntry {
    rawValue?: any | undefined;
    attemptedValue?: string | undefined;
    readonly errors?: ModelError[] | undefined;
    validationState?: ModelValidationState;
    readonly isContainerNode?: boolean;
    readonly children?: ModelStateEntry[] | undefined;
  
    constructor(data?: IModelStateEntry) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.rawValue = _data["rawValue"];
        this.attemptedValue = _data["attemptedValue"];
        if (Array.isArray(_data["errors"])) {
          (<any>this).errors = [] as any;
          for (let item of _data["errors"]) (<any>this).errors!.push(ModelError.fromJS(item));
        }
        this.validationState = _data["validationState"];
        (<any>this).isContainerNode = _data["isContainerNode"];
        if (Array.isArray(_data["children"])) {
          (<any>this).children = [] as any;
          for (let item of _data["children"]) (<any>this).children!.push(ModelStateEntry.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): ModelStateEntry {
      data = typeof data === "object" ? data : {};
      let result = new ModelStateEntry();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["rawValue"] = this.rawValue;
      data["attemptedValue"] = this.attemptedValue;
      if (Array.isArray(this.errors)) {
        data["errors"] = [];
        for (let item of this.errors) data["errors"].push(item.toJSON());
      }
      data["validationState"] = this.validationState;
      data["isContainerNode"] = this.isContainerNode;
      if (Array.isArray(this.children)) {
        data["children"] = [];
        for (let item of this.children) data["children"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface IModelStateEntry {
    rawValue?: any | undefined;
    attemptedValue?: string | undefined;
    errors?: ModelError[] | undefined;
    validationState?: ModelValidationState;
    isContainerNode?: boolean;
    children?: ModelStateEntry[] | undefined;
  }
  
  export enum ModelValidationState {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
  }
  
  export class Module implements IModule {
    assembly?: Assembly;
    readonly fullyQualifiedName?: string | undefined;
    readonly name?: string | undefined;
    readonly mdStreamVersion?: number;
    readonly moduleVersionId?: string;
    readonly scopeName?: string | undefined;
    moduleHandle?: ModuleHandle;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly metadataToken?: number;
  
    constructor(data?: IModule) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.assembly = _data["assembly"] ? Assembly.fromJS(_data["assembly"]) : <any>undefined;
        (<any>this).fullyQualifiedName = _data["fullyQualifiedName"];
        (<any>this).name = _data["name"];
        (<any>this).mdStreamVersion = _data["mdStreamVersion"];
        (<any>this).moduleVersionId = _data["moduleVersionId"];
        (<any>this).scopeName = _data["scopeName"];
        this.moduleHandle = _data["moduleHandle"] ? ModuleHandle.fromJS(_data["moduleHandle"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).metadataToken = _data["metadataToken"];
      }
    }
  
    static fromJS(data: any): Module {
      data = typeof data === "object" ? data : {};
      let result = new Module();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["assembly"] = this.assembly ? this.assembly.toJSON() : <any>undefined;
      data["fullyQualifiedName"] = this.fullyQualifiedName;
      data["name"] = this.name;
      data["mdStreamVersion"] = this.mdStreamVersion;
      data["moduleVersionId"] = this.moduleVersionId;
      data["scopeName"] = this.scopeName;
      data["moduleHandle"] = this.moduleHandle ? this.moduleHandle.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["metadataToken"] = this.metadataToken;
      return data;
    }
  }
  
  export interface IModule {
    assembly?: Assembly;
    fullyQualifiedName?: string | undefined;
    name?: string | undefined;
    mdStreamVersion?: number;
    moduleVersionId?: string;
    scopeName?: string | undefined;
    moduleHandle?: ModuleHandle;
    customAttributes?: CustomAttributeData[] | undefined;
    metadataToken?: number;
  }
  
  export class ModuleHandle implements IModuleHandle {
    readonly mdStreamVersion?: number;
  
    constructor(data?: IModuleHandle) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).mdStreamVersion = _data["mdStreamVersion"];
      }
    }
  
    static fromJS(data: any): ModuleHandle {
      data = typeof data === "object" ? data : {};
      let result = new ModuleHandle();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["mdStreamVersion"] = this.mdStreamVersion;
      return data;
    }
  }
  
  export interface IModuleHandle {
    mdStreamVersion?: number;
  }
  
  export class Movement implements IMovement {
    tenantServiceId?: number;
    displayName?: string | undefined;
    legNo?: number;
    freight?: number;
    fees?: number;
    feeDetails?: FeePrice[] | undefined;
    net?: number;
    tax?: number;
    total?: number;
    eta?: Date | undefined;
    isHandRated?: boolean;
    notes?: string | undefined;
  
    constructor(data?: IMovement) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.tenantServiceId = _data["tenantServiceId"];
        this.displayName = _data["displayName"];
        this.legNo = _data["legNo"];
        this.freight = _data["freight"];
        this.fees = _data["fees"];
        if (Array.isArray(_data["feeDetails"])) {
          this.feeDetails = [] as any;
          for (let item of _data["feeDetails"]) this.feeDetails!.push(FeePrice.fromJS(item));
        }
        this.net = _data["net"];
        this.tax = _data["tax"];
        this.total = _data["total"];
        this.eta = _data["eta"] ? new Date(_data["eta"].toString()) : <any>undefined;
        this.isHandRated = _data["isHandRated"];
        this.notes = _data["notes"];
      }
    }
  
    static fromJS(data: any): Movement {
      data = typeof data === "object" ? data : {};
      let result = new Movement();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["tenantServiceId"] = this.tenantServiceId;
      data["displayName"] = this.displayName;
      data["legNo"] = this.legNo;
      data["freight"] = this.freight;
      data["fees"] = this.fees;
      if (Array.isArray(this.feeDetails)) {
        data["feeDetails"] = [];
        for (let item of this.feeDetails) data["feeDetails"].push(item.toJSON());
      }
      data["net"] = this.net;
      data["tax"] = this.tax;
      data["total"] = this.total;
      data["eta"] = this.eta ? this.eta.toISOString() : <any>undefined;
      data["isHandRated"] = this.isHandRated;
      data["notes"] = this.notes;
      return data;
    }
  }
  
  export interface IMovement {
    tenantServiceId?: number;
    displayName?: string | undefined;
    legNo?: number;
    freight?: number;
    fees?: number;
    feeDetails?: FeePrice[] | undefined;
    net?: number;
    tax?: number;
    total?: number;
    eta?: Date | undefined;
    isHandRated?: boolean;
    notes?: string | undefined;
  }
  
  export class Order implements IOrder {
    id?: number;
    customerId?: number;
    warehouseId?: number;
    saleOrderNo?: string | undefined;
    purchaseOrderNo?: string | undefined;
    ordered?: Date;
    consignmentId?: number;
    connoteNumber?: string | undefined;
    service?: Service;
    dispatched?: Date | undefined;
    estimatedPickupDate?: Date | undefined;
    requiredDeliveryDate?: Date | undefined;
    shipTo?: Address;
    authorityToLeave?: boolean;
    authorisationCode?: string | undefined;
    bookInRequired?: boolean;
    timeSlot?: Date | undefined;
    lineItems?: OrderLineItem[] | undefined;
    packedItems?: OrderPackedItem[] | undefined;
    customValue1?: string | undefined;
    customValue2?: string | undefined;
    customValue3?: string | undefined;
    customValue4?: string | undefined;
    customValue5?: string | undefined;
    customValue6?: string | undefined;
    customValue7?: string | undefined;
    customValue8?: string | undefined;
    errors?: string[] | undefined;
    references?: string[] | undefined;
  
    constructor(data?: IOrder) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.customerId = _data["customerId"];
        this.warehouseId = _data["warehouseId"];
        this.saleOrderNo = _data["saleOrderNo"];
        this.purchaseOrderNo = _data["purchaseOrderNo"];
        this.ordered = _data["ordered"] ? new Date(_data["ordered"].toString()) : <any>undefined;
        this.consignmentId = _data["consignmentId"];
        this.connoteNumber = _data["connoteNumber"];
        this.service = _data["service"] ? Service.fromJS(_data["service"]) : <any>undefined;
        this.dispatched = _data["dispatched"] ? new Date(_data["dispatched"].toString()) : <any>undefined;
        this.estimatedPickupDate = _data["estimatedPickupDate"] ? new Date(_data["estimatedPickupDate"].toString()) : <any>undefined;
        this.requiredDeliveryDate = _data["requiredDeliveryDate"] ? new Date(_data["requiredDeliveryDate"].toString()) : <any>undefined;
        this.shipTo = _data["shipTo"] ? Address.fromJS(_data["shipTo"]) : <any>undefined;
        this.authorityToLeave = _data["authorityToLeave"];
        this.authorisationCode = _data["authorisationCode"];
        this.bookInRequired = _data["bookInRequired"];
        this.timeSlot = _data["timeSlot"] ? new Date(_data["timeSlot"].toString()) : <any>undefined;
        if (Array.isArray(_data["lineItems"])) {
          this.lineItems = [] as any;
          for (let item of _data["lineItems"]) this.lineItems!.push(OrderLineItem.fromJS(item));
        }
        if (Array.isArray(_data["packedItems"])) {
          this.packedItems = [] as any;
          for (let item of _data["packedItems"]) this.packedItems!.push(OrderPackedItem.fromJS(item));
        }
        this.customValue1 = _data["customValue1"];
        this.customValue2 = _data["customValue2"];
        this.customValue3 = _data["customValue3"];
        this.customValue4 = _data["customValue4"];
        this.customValue5 = _data["customValue5"];
        this.customValue6 = _data["customValue6"];
        this.customValue7 = _data["customValue7"];
        this.customValue8 = _data["customValue8"];
        if (Array.isArray(_data["errors"])) {
          this.errors = [] as any;
          for (let item of _data["errors"]) this.errors!.push(item);
        }
        if (Array.isArray(_data["references"])) {
          this.references = [] as any;
          for (let item of _data["references"]) this.references!.push(item);
        }
      }
    }
  
    static fromJS(data: any): Order {
      data = typeof data === "object" ? data : {};
      let result = new Order();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["customerId"] = this.customerId;
      data["warehouseId"] = this.warehouseId;
      data["saleOrderNo"] = this.saleOrderNo;
      data["purchaseOrderNo"] = this.purchaseOrderNo;
      data["ordered"] = this.ordered ? this.ordered.toISOString() : <any>undefined;
      data["consignmentId"] = this.consignmentId;
      data["connoteNumber"] = this.connoteNumber;
      data["service"] = this.service ? this.service.toJSON() : <any>undefined;
      data["dispatched"] = this.dispatched ? this.dispatched.toISOString() : <any>undefined;
      data["estimatedPickupDate"] = this.estimatedPickupDate ? this.estimatedPickupDate.toISOString() : <any>undefined;
      data["requiredDeliveryDate"] = this.requiredDeliveryDate ? this.requiredDeliveryDate.toISOString() : <any>undefined;
      data["shipTo"] = this.shipTo ? this.shipTo.toJSON() : <any>undefined;
      data["authorityToLeave"] = this.authorityToLeave;
      data["authorisationCode"] = this.authorisationCode;
      data["bookInRequired"] = this.bookInRequired;
      data["timeSlot"] = this.timeSlot ? this.timeSlot.toISOString() : <any>undefined;
      if (Array.isArray(this.lineItems)) {
        data["lineItems"] = [];
        for (let item of this.lineItems) data["lineItems"].push(item.toJSON());
      }
      if (Array.isArray(this.packedItems)) {
        data["packedItems"] = [];
        for (let item of this.packedItems) data["packedItems"].push(item.toJSON());
      }
      data["customValue1"] = this.customValue1;
      data["customValue2"] = this.customValue2;
      data["customValue3"] = this.customValue3;
      data["customValue4"] = this.customValue4;
      data["customValue5"] = this.customValue5;
      data["customValue6"] = this.customValue6;
      data["customValue7"] = this.customValue7;
      data["customValue8"] = this.customValue8;
      if (Array.isArray(this.errors)) {
        data["errors"] = [];
        for (let item of this.errors) data["errors"].push(item);
      }
      if (Array.isArray(this.references)) {
        data["references"] = [];
        for (let item of this.references) data["references"].push(item);
      }
      return data;
    }
  }
  
  export interface IOrder {
    id?: number;
    customerId?: number;
    warehouseId?: number;
    saleOrderNo?: string | undefined;
    purchaseOrderNo?: string | undefined;
    ordered?: Date;
    consignmentId?: number;
    connoteNumber?: string | undefined;
    service?: Service;
    dispatched?: Date | undefined;
    estimatedPickupDate?: Date | undefined;
    requiredDeliveryDate?: Date | undefined;
    shipTo?: Address;
    authorityToLeave?: boolean;
    authorisationCode?: string | undefined;
    bookInRequired?: boolean;
    timeSlot?: Date | undefined;
    lineItems?: OrderLineItem[] | undefined;
    packedItems?: OrderPackedItem[] | undefined;
    customValue1?: string | undefined;
    customValue2?: string | undefined;
    customValue3?: string | undefined;
    customValue4?: string | undefined;
    customValue5?: string | undefined;
    customValue6?: string | undefined;
    customValue7?: string | undefined;
    customValue8?: string | undefined;
    errors?: string[] | undefined;
    references?: string[] | undefined;
  }
  
  export class OrderLineItem implements IOrderLineItem {
    id?: number;
    product?: Product;
    quantity?: number;
    hazardousMaterial?: HazardousMaterial[] | undefined;
  
    constructor(data?: IOrderLineItem) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.product = _data["product"] ? Product.fromJS(_data["product"]) : <any>undefined;
        this.quantity = _data["quantity"];
        if (Array.isArray(_data["hazardousMaterial"])) {
          this.hazardousMaterial = [] as any;
          for (let item of _data["hazardousMaterial"]) this.hazardousMaterial!.push(HazardousMaterial.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): OrderLineItem {
      data = typeof data === "object" ? data : {};
      let result = new OrderLineItem();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["product"] = this.product ? this.product.toJSON() : <any>undefined;
      data["quantity"] = this.quantity;
      if (Array.isArray(this.hazardousMaterial)) {
        data["hazardousMaterial"] = [];
        for (let item of this.hazardousMaterial) data["hazardousMaterial"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface IOrderLineItem {
    id?: number;
    product?: Product;
    quantity?: number;
    hazardousMaterial?: HazardousMaterial[] | undefined;
  }
  
  export class OrderPackedItem implements IOrderPackedItem {
    reference?: string | undefined;
    containerType?: string | undefined;
    isPalletised?: boolean;
    description?: string | undefined;
    length?: number;
    width?: number;
    height?: number;
    volume?: number;
    weight?: number;
    sscc?: string | undefined;
    hazardousMaterial?: HazardousMaterial[] | undefined;
  
    constructor(data?: IOrderPackedItem) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.reference = _data["reference"];
        this.containerType = _data["containerType"];
        this.isPalletised = _data["isPalletised"];
        this.description = _data["description"];
        this.length = _data["length"];
        this.width = _data["width"];
        this.height = _data["height"];
        this.volume = _data["volume"];
        this.weight = _data["weight"];
        this.sscc = _data["sscc"];
        if (Array.isArray(_data["hazardousMaterial"])) {
          this.hazardousMaterial = [] as any;
          for (let item of _data["hazardousMaterial"]) this.hazardousMaterial!.push(HazardousMaterial.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): OrderPackedItem {
      data = typeof data === "object" ? data : {};
      let result = new OrderPackedItem();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["reference"] = this.reference;
      data["containerType"] = this.containerType;
      data["isPalletised"] = this.isPalletised;
      data["description"] = this.description;
      data["length"] = this.length;
      data["width"] = this.width;
      data["height"] = this.height;
      data["volume"] = this.volume;
      data["weight"] = this.weight;
      data["sscc"] = this.sscc;
      if (Array.isArray(this.hazardousMaterial)) {
        data["hazardousMaterial"] = [];
        for (let item of this.hazardousMaterial) data["hazardousMaterial"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface IOrderPackedItem {
    reference?: string | undefined;
    containerType?: string | undefined;
    isPalletised?: boolean;
    description?: string | undefined;
    length?: number;
    width?: number;
    height?: number;
    volume?: number;
    weight?: number;
    sscc?: string | undefined;
    hazardousMaterial?: HazardousMaterial[] | undefined;
  }
  
  export enum ParameterAttributes {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _4 = 4,
    _8 = 8,
    _16 = 16,
    _4096 = 4096,
    _8192 = 8192,
    _16384 = 16384,
    _32768 = 32768,
    _61440 = 61440,
  }
  
  export class ParameterInfo implements IParameterInfo {
    attributes?: ParameterAttributes;
    member?: MemberInfo;
    readonly name?: string | undefined;
    parameterType?: Type;
    readonly position?: number;
    readonly isIn?: boolean;
    readonly isLcid?: boolean;
    readonly isOptional?: boolean;
    readonly isOut?: boolean;
    readonly isRetval?: boolean;
    readonly defaultValue?: any | undefined;
    readonly rawDefaultValue?: any | undefined;
    readonly hasDefaultValue?: boolean;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly metadataToken?: number;
  
    constructor(data?: IParameterInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.attributes = _data["attributes"];
        this.member = _data["member"] ? MemberInfo.fromJS(_data["member"]) : <any>undefined;
        (<any>this).name = _data["name"];
        this.parameterType = _data["parameterType"] ? Type.fromJS(_data["parameterType"]) : <any>undefined;
        (<any>this).position = _data["position"];
        (<any>this).isIn = _data["isIn"];
        (<any>this).isLcid = _data["isLcid"];
        (<any>this).isOptional = _data["isOptional"];
        (<any>this).isOut = _data["isOut"];
        (<any>this).isRetval = _data["isRetval"];
        (<any>this).defaultValue = _data["defaultValue"];
        (<any>this).rawDefaultValue = _data["rawDefaultValue"];
        (<any>this).hasDefaultValue = _data["hasDefaultValue"];
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).metadataToken = _data["metadataToken"];
      }
    }
  
    static fromJS(data: any): ParameterInfo {
      data = typeof data === "object" ? data : {};
      let result = new ParameterInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["attributes"] = this.attributes;
      data["member"] = this.member ? this.member.toJSON() : <any>undefined;
      data["name"] = this.name;
      data["parameterType"] = this.parameterType ? this.parameterType.toJSON() : <any>undefined;
      data["position"] = this.position;
      data["isIn"] = this.isIn;
      data["isLcid"] = this.isLcid;
      data["isOptional"] = this.isOptional;
      data["isOut"] = this.isOut;
      data["isRetval"] = this.isRetval;
      data["defaultValue"] = this.defaultValue;
      data["rawDefaultValue"] = this.rawDefaultValue;
      data["hasDefaultValue"] = this.hasDefaultValue;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["metadataToken"] = this.metadataToken;
      return data;
    }
  }
  
  export interface IParameterInfo {
    attributes?: ParameterAttributes;
    member?: MemberInfo;
    name?: string | undefined;
    parameterType?: Type;
    position?: number;
    isIn?: boolean;
    isLcid?: boolean;
    isOptional?: boolean;
    isOut?: boolean;
    isRetval?: boolean;
    defaultValue?: any | undefined;
    rawDefaultValue?: any | undefined;
    hasDefaultValue?: boolean;
    customAttributes?: CustomAttributeData[] | undefined;
    metadataToken?: number;
  }
  
  export class Price implements IPrice {
    customerServiceID?: number;
    displayName?: string | undefined;
    freight?: number;
    fees?: number;
    feeDetails?: FeePrice[] | undefined;
    net?: number;
    tax?: number;
    total?: number;
    eta?: Date | undefined;
    markupPercentage?: number;
    isHandRated?: boolean;
  
    constructor(data?: IPrice) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.customerServiceID = _data["customerServiceID"];
        this.displayName = _data["displayName"];
        this.freight = _data["freight"];
        this.fees = _data["fees"];
        if (Array.isArray(_data["feeDetails"])) {
          this.feeDetails = [] as any;
          for (let item of _data["feeDetails"]) this.feeDetails!.push(FeePrice.fromJS(item));
        }
        this.net = _data["net"];
        this.tax = _data["tax"];
        this.total = _data["total"];
        this.eta = _data["eta"] ? new Date(_data["eta"].toString()) : <any>undefined;
        this.markupPercentage = _data["markupPercentage"];
        this.isHandRated = _data["isHandRated"];
      }
    }
  
    static fromJS(data: any): Price {
      data = typeof data === "object" ? data : {};
      let result = new Price();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["customerServiceID"] = this.customerServiceID;
      data["displayName"] = this.displayName;
      data["freight"] = this.freight;
      data["fees"] = this.fees;
      if (Array.isArray(this.feeDetails)) {
        data["feeDetails"] = [];
        for (let item of this.feeDetails) data["feeDetails"].push(item.toJSON());
      }
      data["net"] = this.net;
      data["tax"] = this.tax;
      data["total"] = this.total;
      data["eta"] = this.eta ? this.eta.toISOString() : <any>undefined;
      data["markupPercentage"] = this.markupPercentage;
      data["isHandRated"] = this.isHandRated;
      return data;
    }
  }
  
  export interface IPrice {
    customerServiceID?: number;
    displayName?: string | undefined;
    freight?: number;
    fees?: number;
    feeDetails?: FeePrice[] | undefined;
    net?: number;
    tax?: number;
    total?: number;
    eta?: Date | undefined;
    markupPercentage?: number;
    isHandRated?: boolean;
  }
  
  export class Product implements IProduct {
    id?: number;
    customerId?: number;
    code?: string | undefined;
    name?: string | undefined;
    transportUnitType?: string | undefined;
    gtin?: string | undefined;
    length?: number;
    width?: number;
    height?: number;
    volume?: number;
    weight?: number;
    hazardousMaterial?: HazardousMaterial[] | undefined;
  
    constructor(data?: IProduct) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.customerId = _data["customerId"];
        this.code = _data["code"];
        this.name = _data["name"];
        this.transportUnitType = _data["transportUnitType"];
        this.gtin = _data["gtin"];
        this.length = _data["length"];
        this.width = _data["width"];
        this.height = _data["height"];
        this.volume = _data["volume"];
        this.weight = _data["weight"];
        if (Array.isArray(_data["hazardousMaterial"])) {
          this.hazardousMaterial = [] as any;
          for (let item of _data["hazardousMaterial"]) this.hazardousMaterial!.push(HazardousMaterial.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): Product {
      data = typeof data === "object" ? data : {};
      let result = new Product();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["customerId"] = this.customerId;
      data["code"] = this.code;
      data["name"] = this.name;
      data["transportUnitType"] = this.transportUnitType;
      data["gtin"] = this.gtin;
      data["length"] = this.length;
      data["width"] = this.width;
      data["height"] = this.height;
      data["volume"] = this.volume;
      data["weight"] = this.weight;
      if (Array.isArray(this.hazardousMaterial)) {
        data["hazardousMaterial"] = [];
        for (let item of this.hazardousMaterial) data["hazardousMaterial"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface IProduct {
    id?: number;
    customerId?: number;
    code?: string | undefined;
    name?: string | undefined;
    transportUnitType?: string | undefined;
    gtin?: string | undefined;
    length?: number;
    width?: number;
    height?: number;
    volume?: number;
    weight?: number;
    hazardousMaterial?: HazardousMaterial[] | undefined;
  }
  
  export enum PropertyAttributes {
    _0 = 0,
    _512 = 512,
    _1024 = 1024,
    _4096 = 4096,
    _8192 = 8192,
    _16384 = 16384,
    _32768 = 32768,
    _62464 = 62464,
  }
  
  export class PropertyInfo implements IPropertyInfo {
    readonly name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    memberType?: MemberTypes;
    propertyType?: Type;
    attributes?: PropertyAttributes;
    readonly isSpecialName?: boolean;
    readonly canRead?: boolean;
    readonly canWrite?: boolean;
    getMethod?: MethodInfo;
    setMethod?: MethodInfo;
  
    constructor(data?: IPropertyInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).name = _data["name"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        this.memberType = _data["memberType"];
        this.propertyType = _data["propertyType"] ? Type.fromJS(_data["propertyType"]) : <any>undefined;
        this.attributes = _data["attributes"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        (<any>this).canRead = _data["canRead"];
        (<any>this).canWrite = _data["canWrite"];
        this.getMethod = _data["getMethod"] ? MethodInfo.fromJS(_data["getMethod"]) : <any>undefined;
        this.setMethod = _data["setMethod"] ? MethodInfo.fromJS(_data["setMethod"]) : <any>undefined;
      }
    }
  
    static fromJS(data: any): PropertyInfo {
      data = typeof data === "object" ? data : {};
      let result = new PropertyInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["name"] = this.name;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["memberType"] = this.memberType;
      data["propertyType"] = this.propertyType ? this.propertyType.toJSON() : <any>undefined;
      data["attributes"] = this.attributes;
      data["isSpecialName"] = this.isSpecialName;
      data["canRead"] = this.canRead;
      data["canWrite"] = this.canWrite;
      data["getMethod"] = this.getMethod ? this.getMethod.toJSON() : <any>undefined;
      data["setMethod"] = this.setMethod ? this.setMethod.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IPropertyInfo {
    name?: string | undefined;
    declaringType?: Type;
    reflectedType?: Type;
    module?: Module;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    memberType?: MemberTypes;
    propertyType?: Type;
    attributes?: PropertyAttributes;
    isSpecialName?: boolean;
    canRead?: boolean;
    canWrite?: boolean;
    getMethod?: MethodInfo;
    setMethod?: MethodInfo;
  }
  
  export class Quote implements IQuote {
    id?: number;
    carrierId?: number;
    carrierCode?: string | undefined;
    carrierName?: string | undefined;
    serviceId?: number;
    serviceCode?: string | undefined;
    serviceName?: string | undefined;
    freight?: number;
    fees?: number;
    net?: number;
    tax?: number;
    total?: number;
    eta?: Date | undefined;
  
    constructor(data?: IQuote) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.carrierId = _data["carrierId"];
        this.carrierCode = _data["carrierCode"];
        this.carrierName = _data["carrierName"];
        this.serviceId = _data["serviceId"];
        this.serviceCode = _data["serviceCode"];
        this.serviceName = _data["serviceName"];
        this.freight = _data["freight"];
        this.fees = _data["fees"];
        this.net = _data["net"];
        this.tax = _data["tax"];
        this.total = _data["total"];
        this.eta = _data["eta"] ? new Date(_data["eta"].toString()) : <any>undefined;
      }
    }
  
    static fromJS(data: any): Quote {
      data = typeof data === "object" ? data : {};
      let result = new Quote();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["carrierId"] = this.carrierId;
      data["carrierCode"] = this.carrierCode;
      data["carrierName"] = this.carrierName;
      data["serviceId"] = this.serviceId;
      data["serviceCode"] = this.serviceCode;
      data["serviceName"] = this.serviceName;
      data["freight"] = this.freight;
      data["fees"] = this.fees;
      data["net"] = this.net;
      data["tax"] = this.tax;
      data["total"] = this.total;
      data["eta"] = this.eta ? this.eta.toISOString() : <any>undefined;
      return data;
    }
  }
  
  export interface IQuote {
    id?: number;
    carrierId?: number;
    carrierCode?: string | undefined;
    carrierName?: string | undefined;
    serviceId?: number;
    serviceCode?: string | undefined;
    serviceName?: string | undefined;
    freight?: number;
    fees?: number;
    net?: number;
    tax?: number;
    total?: number;
    eta?: Date | undefined;
  }
  
  export class RuntimeFieldHandle implements IRuntimeFieldHandle {
    value?: IntPtr;
  
    constructor(data?: IRuntimeFieldHandle) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.value = _data["value"] ? IntPtr.fromJS(_data["value"]) : <any>undefined;
      }
    }
  
    static fromJS(data: any): RuntimeFieldHandle {
      data = typeof data === "object" ? data : {};
      let result = new RuntimeFieldHandle();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["value"] = this.value ? this.value.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IRuntimeFieldHandle {
    value?: IntPtr;
  }
  
  export class RuntimeMethodHandle implements IRuntimeMethodHandle {
    value?: IntPtr;
  
    constructor(data?: IRuntimeMethodHandle) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.value = _data["value"] ? IntPtr.fromJS(_data["value"]) : <any>undefined;
      }
    }
  
    static fromJS(data: any): RuntimeMethodHandle {
      data = typeof data === "object" ? data : {};
      let result = new RuntimeMethodHandle();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["value"] = this.value ? this.value.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IRuntimeMethodHandle {
    value?: IntPtr;
  }
  
  export class RuntimeTypeHandle implements IRuntimeTypeHandle {
    value?: IntPtr;
  
    constructor(data?: IRuntimeTypeHandle) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.value = _data["value"] ? IntPtr.fromJS(_data["value"]) : <any>undefined;
      }
    }
  
    static fromJS(data: any): RuntimeTypeHandle {
      data = typeof data === "object" ? data : {};
      let result = new RuntimeTypeHandle();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["value"] = this.value ? this.value.toJSON() : <any>undefined;
      return data;
    }
  }
  
  export interface IRuntimeTypeHandle {
    value?: IntPtr;
  }
  
  export enum SecurityRuleSet {
    _0 = 0,
    _1 = 1,
    _2 = 2,
  }
  
  export class Service implements IService {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
  
    constructor(data?: IService) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.code = _data["code"];
        this.name = _data["name"];
      }
    }
  
    static fromJS(data: any): Service {
      data = typeof data === "object" ? data : {};
      let result = new Service();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["code"] = this.code;
      data["name"] = this.name;
      return data;
    }
  }
  
  export interface IService {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
  }
  
  export class SessionModel implements ISessionModel {
    accessToken?: string | undefined;
    tenantId?: string | undefined;
    customerId?: number;
    userId?: number;
    expires?: Date;
  
    constructor(data?: ISessionModel) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.accessToken = _data["accessToken"];
        this.tenantId = _data["tenantId"];
        this.customerId = _data["customerId"];
        this.userId = _data["userId"];
        this.expires = _data["expires"] ? new Date(_data["expires"].toString()) : <any>undefined;
      }
    }
  
    static fromJS(data: any): SessionModel {
      data = typeof data === "object" ? data : {};
      let result = new SessionModel();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["accessToken"] = this.accessToken;
      data["tenantId"] = this.tenantId;
      data["customerId"] = this.customerId;
      data["userId"] = this.userId;
      data["expires"] = this.expires ? this.expires.toISOString() : <any>undefined;
      return data;
    }
  }
  
  export interface ISessionModel {
    accessToken?: string | undefined;
    tenantId?: string | undefined;
    customerId?: number;
    userId?: number;
    expires?: Date;
  }
  
  export class StructLayoutAttribute implements IStructLayoutAttribute {
    readonly typeId?: any | undefined;
    value?: LayoutKind;
  
    constructor(data?: IStructLayoutAttribute) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).typeId = _data["typeId"];
        this.value = _data["value"];
      }
    }
  
    static fromJS(data: any): StructLayoutAttribute {
      data = typeof data === "object" ? data : {};
      let result = new StructLayoutAttribute();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["typeId"] = this.typeId;
      data["value"] = this.value;
      return data;
    }
  }
  
  export interface IStructLayoutAttribute {
    typeId?: any | undefined;
    value?: LayoutKind;
  }
  
  export class TransportUnit implements ITransportUnit {
    id?: number;
    itemNo?: number;
    code?: string | undefined;
    description?: string | undefined;
    transportUnitType?: string | undefined;
    reference?: string | undefined;
    quantity?: number;
    length?: number;
    width?: number;
    height?: number;
    volume?: number;
    weight?: number;
    shortIdentifier?: string | undefined;
    barcode?: string | undefined;
    packID?: string | undefined;
    itemInstructions?: string | undefined;
    hazardousMaterial?: HazardousMaterial[] | undefined;
    assets?: Asset[] | undefined;
  
    constructor(data?: ITransportUnit) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.itemNo = _data["itemNo"];
        this.code = _data["code"];
        this.description = _data["description"];
        this.transportUnitType = _data["transportUnitType"];
        this.reference = _data["reference"];
        this.quantity = _data["quantity"];
        this.length = _data["length"];
        this.width = _data["width"];
        this.height = _data["height"];
        this.volume = _data["volume"];
        this.weight = _data["weight"];
        this.shortIdentifier = _data["shortIdentifier"];
        this.barcode = _data["barcode"];
        this.packID = _data["packID"];
        this.itemInstructions = _data["itemInstructions"];
        if (Array.isArray(_data["hazardousMaterial"])) {
          this.hazardousMaterial = [] as any;
          for (let item of _data["hazardousMaterial"]) this.hazardousMaterial!.push(HazardousMaterial.fromJS(item));
        }
        if (Array.isArray(_data["assets"])) {
          this.assets = [] as any;
          for (let item of _data["assets"]) this.assets!.push(Asset.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): TransportUnit {
      data = typeof data === "object" ? data : {};
      let result = new TransportUnit();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["itemNo"] = this.itemNo;
      data["code"] = this.code;
      data["description"] = this.description;
      data["transportUnitType"] = this.transportUnitType;
      data["reference"] = this.reference;
      data["quantity"] = this.quantity;
      data["length"] = this.length;
      data["width"] = this.width;
      data["height"] = this.height;
      data["volume"] = this.volume;
      data["weight"] = this.weight;
      data["shortIdentifier"] = this.shortIdentifier;
      data["barcode"] = this.barcode;
      data["packID"] = this.packID;
      data["itemInstructions"] = this.itemInstructions;
      if (Array.isArray(this.hazardousMaterial)) {
        data["hazardousMaterial"] = [];
        for (let item of this.hazardousMaterial) data["hazardousMaterial"].push(item.toJSON());
      }
      if (Array.isArray(this.assets)) {
        data["assets"] = [];
        for (let item of this.assets) data["assets"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface ITransportUnit {
    id?: number;
    itemNo?: number;
    code?: string | undefined;
    description?: string | undefined;
    transportUnitType?: string | undefined;
    reference?: string | undefined;
    quantity?: number;
    length?: number;
    width?: number;
    height?: number;
    volume?: number;
    weight?: number;
    shortIdentifier?: string | undefined;
    barcode?: string | undefined;
    packID?: string | undefined;
    itemInstructions?: string | undefined;
    hazardousMaterial?: HazardousMaterial[] | undefined;
    assets?: Asset[] | undefined;
  }
  
  export class Type implements IType {
    readonly name?: string | undefined;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    readonly isInterface?: boolean;
    memberType?: MemberTypes;
    readonly namespace?: string | undefined;
    readonly assemblyQualifiedName?: string | undefined;
    readonly fullName?: string | undefined;
    assembly?: Assembly;
    module?: Module;
    readonly isNested?: boolean;
    declaringType?: Type;
    declaringMethod?: MethodBase;
    reflectedType?: Type;
    underlyingSystemType?: Type;
    readonly isTypeDefinition?: boolean;
    readonly isArray?: boolean;
    readonly isByRef?: boolean;
    readonly isPointer?: boolean;
    readonly isConstructedGenericType?: boolean;
    readonly isGenericParameter?: boolean;
    readonly isGenericTypeParameter?: boolean;
    readonly isGenericMethodParameter?: boolean;
    readonly isGenericType?: boolean;
    readonly isGenericTypeDefinition?: boolean;
    readonly isSZArray?: boolean;
    readonly isVariableBoundArray?: boolean;
    readonly isByRefLike?: boolean;
    readonly hasElementType?: boolean;
    readonly genericTypeArguments?: Type[] | undefined;
    readonly genericParameterPosition?: number;
    genericParameterAttributes?: GenericParameterAttributes;
    attributes?: TypeAttributes;
    readonly isAbstract?: boolean;
    readonly isImport?: boolean;
    readonly isSealed?: boolean;
    readonly isSpecialName?: boolean;
    readonly isClass?: boolean;
    readonly isNestedAssembly?: boolean;
    readonly isNestedFamANDAssem?: boolean;
    readonly isNestedFamily?: boolean;
    readonly isNestedFamORAssem?: boolean;
    readonly isNestedPrivate?: boolean;
    readonly isNestedPublic?: boolean;
    readonly isNotPublic?: boolean;
    readonly isPublic?: boolean;
    readonly isAutoLayout?: boolean;
    readonly isExplicitLayout?: boolean;
    readonly isLayoutSequential?: boolean;
    readonly isAnsiClass?: boolean;
    readonly isAutoClass?: boolean;
    readonly isUnicodeClass?: boolean;
    readonly isCOMObject?: boolean;
    readonly isContextful?: boolean;
    readonly isEnum?: boolean;
    readonly isMarshalByRef?: boolean;
    readonly isPrimitive?: boolean;
    readonly isValueType?: boolean;
    readonly isSignatureType?: boolean;
    readonly isSecurityCritical?: boolean;
    readonly isSecuritySafeCritical?: boolean;
    readonly isSecurityTransparent?: boolean;
    structLayoutAttribute?: StructLayoutAttribute;
    typeInitializer?: ConstructorInfo;
    typeHandle?: RuntimeTypeHandle;
    readonly guid?: string;
    baseType?: Type;
    readonly isSerializable?: boolean;
    readonly containsGenericParameters?: boolean;
    readonly isVisible?: boolean;
  
    constructor(data?: IType) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).name = _data["name"];
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        (<any>this).isInterface = _data["isInterface"];
        this.memberType = _data["memberType"];
        (<any>this).namespace = _data["namespace"];
        (<any>this).assemblyQualifiedName = _data["assemblyQualifiedName"];
        (<any>this).fullName = _data["fullName"];
        this.assembly = _data["assembly"] ? Assembly.fromJS(_data["assembly"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        (<any>this).isNested = _data["isNested"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.declaringMethod = _data["declaringMethod"] ? MethodBase.fromJS(_data["declaringMethod"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.underlyingSystemType = _data["underlyingSystemType"] ? Type.fromJS(_data["underlyingSystemType"]) : <any>undefined;
        (<any>this).isTypeDefinition = _data["isTypeDefinition"];
        (<any>this).isArray = _data["isArray"];
        (<any>this).isByRef = _data["isByRef"];
        (<any>this).isPointer = _data["isPointer"];
        (<any>this).isConstructedGenericType = _data["isConstructedGenericType"];
        (<any>this).isGenericParameter = _data["isGenericParameter"];
        (<any>this).isGenericTypeParameter = _data["isGenericTypeParameter"];
        (<any>this).isGenericMethodParameter = _data["isGenericMethodParameter"];
        (<any>this).isGenericType = _data["isGenericType"];
        (<any>this).isGenericTypeDefinition = _data["isGenericTypeDefinition"];
        (<any>this).isSZArray = _data["isSZArray"];
        (<any>this).isVariableBoundArray = _data["isVariableBoundArray"];
        (<any>this).isByRefLike = _data["isByRefLike"];
        (<any>this).hasElementType = _data["hasElementType"];
        if (Array.isArray(_data["genericTypeArguments"])) {
          (<any>this).genericTypeArguments = [] as any;
          for (let item of _data["genericTypeArguments"]) (<any>this).genericTypeArguments!.push(Type.fromJS(item));
        }
        (<any>this).genericParameterPosition = _data["genericParameterPosition"];
        this.genericParameterAttributes = _data["genericParameterAttributes"];
        this.attributes = _data["attributes"];
        (<any>this).isAbstract = _data["isAbstract"];
        (<any>this).isImport = _data["isImport"];
        (<any>this).isSealed = _data["isSealed"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        (<any>this).isClass = _data["isClass"];
        (<any>this).isNestedAssembly = _data["isNestedAssembly"];
        (<any>this).isNestedFamANDAssem = _data["isNestedFamANDAssem"];
        (<any>this).isNestedFamily = _data["isNestedFamily"];
        (<any>this).isNestedFamORAssem = _data["isNestedFamORAssem"];
        (<any>this).isNestedPrivate = _data["isNestedPrivate"];
        (<any>this).isNestedPublic = _data["isNestedPublic"];
        (<any>this).isNotPublic = _data["isNotPublic"];
        (<any>this).isPublic = _data["isPublic"];
        (<any>this).isAutoLayout = _data["isAutoLayout"];
        (<any>this).isExplicitLayout = _data["isExplicitLayout"];
        (<any>this).isLayoutSequential = _data["isLayoutSequential"];
        (<any>this).isAnsiClass = _data["isAnsiClass"];
        (<any>this).isAutoClass = _data["isAutoClass"];
        (<any>this).isUnicodeClass = _data["isUnicodeClass"];
        (<any>this).isCOMObject = _data["isCOMObject"];
        (<any>this).isContextful = _data["isContextful"];
        (<any>this).isEnum = _data["isEnum"];
        (<any>this).isMarshalByRef = _data["isMarshalByRef"];
        (<any>this).isPrimitive = _data["isPrimitive"];
        (<any>this).isValueType = _data["isValueType"];
        (<any>this).isSignatureType = _data["isSignatureType"];
        (<any>this).isSecurityCritical = _data["isSecurityCritical"];
        (<any>this).isSecuritySafeCritical = _data["isSecuritySafeCritical"];
        (<any>this).isSecurityTransparent = _data["isSecurityTransparent"];
        this.structLayoutAttribute = _data["structLayoutAttribute"]
          ? StructLayoutAttribute.fromJS(_data["structLayoutAttribute"])
          : <any>undefined;
        this.typeInitializer = _data["typeInitializer"] ? ConstructorInfo.fromJS(_data["typeInitializer"]) : <any>undefined;
        this.typeHandle = _data["typeHandle"] ? RuntimeTypeHandle.fromJS(_data["typeHandle"]) : <any>undefined;
        (<any>this).guid = _data["guid"];
        this.baseType = _data["baseType"] ? Type.fromJS(_data["baseType"]) : <any>undefined;
        (<any>this).isSerializable = _data["isSerializable"];
        (<any>this).containsGenericParameters = _data["containsGenericParameters"];
        (<any>this).isVisible = _data["isVisible"];
      }
    }
  
    static fromJS(data: any): Type {
      data = typeof data === "object" ? data : {};
      let result = new Type();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["name"] = this.name;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["isInterface"] = this.isInterface;
      data["memberType"] = this.memberType;
      data["namespace"] = this.namespace;
      data["assemblyQualifiedName"] = this.assemblyQualifiedName;
      data["fullName"] = this.fullName;
      data["assembly"] = this.assembly ? this.assembly.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      data["isNested"] = this.isNested;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["declaringMethod"] = this.declaringMethod ? this.declaringMethod.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["underlyingSystemType"] = this.underlyingSystemType ? this.underlyingSystemType.toJSON() : <any>undefined;
      data["isTypeDefinition"] = this.isTypeDefinition;
      data["isArray"] = this.isArray;
      data["isByRef"] = this.isByRef;
      data["isPointer"] = this.isPointer;
      data["isConstructedGenericType"] = this.isConstructedGenericType;
      data["isGenericParameter"] = this.isGenericParameter;
      data["isGenericTypeParameter"] = this.isGenericTypeParameter;
      data["isGenericMethodParameter"] = this.isGenericMethodParameter;
      data["isGenericType"] = this.isGenericType;
      data["isGenericTypeDefinition"] = this.isGenericTypeDefinition;
      data["isSZArray"] = this.isSZArray;
      data["isVariableBoundArray"] = this.isVariableBoundArray;
      data["isByRefLike"] = this.isByRefLike;
      data["hasElementType"] = this.hasElementType;
      if (Array.isArray(this.genericTypeArguments)) {
        data["genericTypeArguments"] = [];
        for (let item of this.genericTypeArguments) data["genericTypeArguments"].push(item.toJSON());
      }
      data["genericParameterPosition"] = this.genericParameterPosition;
      data["genericParameterAttributes"] = this.genericParameterAttributes;
      data["attributes"] = this.attributes;
      data["isAbstract"] = this.isAbstract;
      data["isImport"] = this.isImport;
      data["isSealed"] = this.isSealed;
      data["isSpecialName"] = this.isSpecialName;
      data["isClass"] = this.isClass;
      data["isNestedAssembly"] = this.isNestedAssembly;
      data["isNestedFamANDAssem"] = this.isNestedFamANDAssem;
      data["isNestedFamily"] = this.isNestedFamily;
      data["isNestedFamORAssem"] = this.isNestedFamORAssem;
      data["isNestedPrivate"] = this.isNestedPrivate;
      data["isNestedPublic"] = this.isNestedPublic;
      data["isNotPublic"] = this.isNotPublic;
      data["isPublic"] = this.isPublic;
      data["isAutoLayout"] = this.isAutoLayout;
      data["isExplicitLayout"] = this.isExplicitLayout;
      data["isLayoutSequential"] = this.isLayoutSequential;
      data["isAnsiClass"] = this.isAnsiClass;
      data["isAutoClass"] = this.isAutoClass;
      data["isUnicodeClass"] = this.isUnicodeClass;
      data["isCOMObject"] = this.isCOMObject;
      data["isContextful"] = this.isContextful;
      data["isEnum"] = this.isEnum;
      data["isMarshalByRef"] = this.isMarshalByRef;
      data["isPrimitive"] = this.isPrimitive;
      data["isValueType"] = this.isValueType;
      data["isSignatureType"] = this.isSignatureType;
      data["isSecurityCritical"] = this.isSecurityCritical;
      data["isSecuritySafeCritical"] = this.isSecuritySafeCritical;
      data["isSecurityTransparent"] = this.isSecurityTransparent;
      data["structLayoutAttribute"] = this.structLayoutAttribute ? this.structLayoutAttribute.toJSON() : <any>undefined;
      data["typeInitializer"] = this.typeInitializer ? this.typeInitializer.toJSON() : <any>undefined;
      data["typeHandle"] = this.typeHandle ? this.typeHandle.toJSON() : <any>undefined;
      data["guid"] = this.guid;
      data["baseType"] = this.baseType ? this.baseType.toJSON() : <any>undefined;
      data["isSerializable"] = this.isSerializable;
      data["containsGenericParameters"] = this.containsGenericParameters;
      data["isVisible"] = this.isVisible;
      return data;
    }
  }
  
  export interface IType {
    name?: string | undefined;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    isInterface?: boolean;
    memberType?: MemberTypes;
    namespace?: string | undefined;
    assemblyQualifiedName?: string | undefined;
    fullName?: string | undefined;
    assembly?: Assembly;
    module?: Module;
    isNested?: boolean;
    declaringType?: Type;
    declaringMethod?: MethodBase;
    reflectedType?: Type;
    underlyingSystemType?: Type;
    isTypeDefinition?: boolean;
    isArray?: boolean;
    isByRef?: boolean;
    isPointer?: boolean;
    isConstructedGenericType?: boolean;
    isGenericParameter?: boolean;
    isGenericTypeParameter?: boolean;
    isGenericMethodParameter?: boolean;
    isGenericType?: boolean;
    isGenericTypeDefinition?: boolean;
    isSZArray?: boolean;
    isVariableBoundArray?: boolean;
    isByRefLike?: boolean;
    hasElementType?: boolean;
    genericTypeArguments?: Type[] | undefined;
    genericParameterPosition?: number;
    genericParameterAttributes?: GenericParameterAttributes;
    attributes?: TypeAttributes;
    isAbstract?: boolean;
    isImport?: boolean;
    isSealed?: boolean;
    isSpecialName?: boolean;
    isClass?: boolean;
    isNestedAssembly?: boolean;
    isNestedFamANDAssem?: boolean;
    isNestedFamily?: boolean;
    isNestedFamORAssem?: boolean;
    isNestedPrivate?: boolean;
    isNestedPublic?: boolean;
    isNotPublic?: boolean;
    isPublic?: boolean;
    isAutoLayout?: boolean;
    isExplicitLayout?: boolean;
    isLayoutSequential?: boolean;
    isAnsiClass?: boolean;
    isAutoClass?: boolean;
    isUnicodeClass?: boolean;
    isCOMObject?: boolean;
    isContextful?: boolean;
    isEnum?: boolean;
    isMarshalByRef?: boolean;
    isPrimitive?: boolean;
    isValueType?: boolean;
    isSignatureType?: boolean;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    structLayoutAttribute?: StructLayoutAttribute;
    typeInitializer?: ConstructorInfo;
    typeHandle?: RuntimeTypeHandle;
    guid?: string;
    baseType?: Type;
    isSerializable?: boolean;
    containsGenericParameters?: boolean;
    isVisible?: boolean;
  }
  
  export enum TypeAttributes {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
    _6 = 6,
    _7 = 7,
    _8 = 8,
    _16 = 16,
    _24 = 24,
    _32 = 32,
    _128 = 128,
    _256 = 256,
    _1024 = 1024,
    _2048 = 2048,
    _4096 = 4096,
    _8192 = 8192,
    _16384 = 16384,
    _65536 = 65536,
    _131072 = 131072,
    _196608 = 196608,
    _262144 = 262144,
    _264192 = 264192,
    _1048576 = 1048576,
    _12582912 = 12582912,
  }
  
  export class TypeInfo implements ITypeInfo {
    readonly name?: string | undefined;
    readonly customAttributes?: CustomAttributeData[] | undefined;
    readonly isCollectible?: boolean;
    readonly metadataToken?: number;
    readonly isInterface?: boolean;
    memberType?: MemberTypes;
    readonly namespace?: string | undefined;
    readonly assemblyQualifiedName?: string | undefined;
    readonly fullName?: string | undefined;
    assembly?: Assembly;
    module?: Module;
    readonly isNested?: boolean;
    declaringType?: Type;
    declaringMethod?: MethodBase;
    reflectedType?: Type;
    underlyingSystemType?: Type;
    readonly isTypeDefinition?: boolean;
    readonly isArray?: boolean;
    readonly isByRef?: boolean;
    readonly isPointer?: boolean;
    readonly isConstructedGenericType?: boolean;
    readonly isGenericParameter?: boolean;
    readonly isGenericTypeParameter?: boolean;
    readonly isGenericMethodParameter?: boolean;
    readonly isGenericType?: boolean;
    readonly isGenericTypeDefinition?: boolean;
    readonly isSZArray?: boolean;
    readonly isVariableBoundArray?: boolean;
    readonly isByRefLike?: boolean;
    readonly hasElementType?: boolean;
    readonly genericTypeArguments?: Type[] | undefined;
    readonly genericParameterPosition?: number;
    genericParameterAttributes?: GenericParameterAttributes;
    attributes?: TypeAttributes;
    readonly isAbstract?: boolean;
    readonly isImport?: boolean;
    readonly isSealed?: boolean;
    readonly isSpecialName?: boolean;
    readonly isClass?: boolean;
    readonly isNestedAssembly?: boolean;
    readonly isNestedFamANDAssem?: boolean;
    readonly isNestedFamily?: boolean;
    readonly isNestedFamORAssem?: boolean;
    readonly isNestedPrivate?: boolean;
    readonly isNestedPublic?: boolean;
    readonly isNotPublic?: boolean;
    readonly isPublic?: boolean;
    readonly isAutoLayout?: boolean;
    readonly isExplicitLayout?: boolean;
    readonly isLayoutSequential?: boolean;
    readonly isAnsiClass?: boolean;
    readonly isAutoClass?: boolean;
    readonly isUnicodeClass?: boolean;
    readonly isCOMObject?: boolean;
    readonly isContextful?: boolean;
    readonly isEnum?: boolean;
    readonly isMarshalByRef?: boolean;
    readonly isPrimitive?: boolean;
    readonly isValueType?: boolean;
    readonly isSignatureType?: boolean;
    readonly isSecurityCritical?: boolean;
    readonly isSecuritySafeCritical?: boolean;
    readonly isSecurityTransparent?: boolean;
    structLayoutAttribute?: StructLayoutAttribute;
    typeInitializer?: ConstructorInfo;
    typeHandle?: RuntimeTypeHandle;
    readonly guid?: string;
    baseType?: Type;
    readonly isSerializable?: boolean;
    readonly containsGenericParameters?: boolean;
    readonly isVisible?: boolean;
    readonly genericTypeParameters?: Type[] | undefined;
    readonly declaredConstructors?: ConstructorInfo[] | undefined;
    readonly declaredEvents?: EventInfo[] | undefined;
    readonly declaredFields?: FieldInfo[] | undefined;
    readonly declaredMembers?: MemberInfo[] | undefined;
    readonly declaredMethods?: MethodInfo[] | undefined;
    readonly declaredNestedTypes?: TypeInfo[] | undefined;
    readonly declaredProperties?: PropertyInfo[] | undefined;
    readonly implementedInterfaces?: Type[] | undefined;
  
    constructor(data?: ITypeInfo) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        (<any>this).name = _data["name"];
        if (Array.isArray(_data["customAttributes"])) {
          (<any>this).customAttributes = [] as any;
          for (let item of _data["customAttributes"]) (<any>this).customAttributes!.push(CustomAttributeData.fromJS(item));
        }
        (<any>this).isCollectible = _data["isCollectible"];
        (<any>this).metadataToken = _data["metadataToken"];
        (<any>this).isInterface = _data["isInterface"];
        this.memberType = _data["memberType"];
        (<any>this).namespace = _data["namespace"];
        (<any>this).assemblyQualifiedName = _data["assemblyQualifiedName"];
        (<any>this).fullName = _data["fullName"];
        this.assembly = _data["assembly"] ? Assembly.fromJS(_data["assembly"]) : <any>undefined;
        this.module = _data["module"] ? Module.fromJS(_data["module"]) : <any>undefined;
        (<any>this).isNested = _data["isNested"];
        this.declaringType = _data["declaringType"] ? Type.fromJS(_data["declaringType"]) : <any>undefined;
        this.declaringMethod = _data["declaringMethod"] ? MethodBase.fromJS(_data["declaringMethod"]) : <any>undefined;
        this.reflectedType = _data["reflectedType"] ? Type.fromJS(_data["reflectedType"]) : <any>undefined;
        this.underlyingSystemType = _data["underlyingSystemType"] ? Type.fromJS(_data["underlyingSystemType"]) : <any>undefined;
        (<any>this).isTypeDefinition = _data["isTypeDefinition"];
        (<any>this).isArray = _data["isArray"];
        (<any>this).isByRef = _data["isByRef"];
        (<any>this).isPointer = _data["isPointer"];
        (<any>this).isConstructedGenericType = _data["isConstructedGenericType"];
        (<any>this).isGenericParameter = _data["isGenericParameter"];
        (<any>this).isGenericTypeParameter = _data["isGenericTypeParameter"];
        (<any>this).isGenericMethodParameter = _data["isGenericMethodParameter"];
        (<any>this).isGenericType = _data["isGenericType"];
        (<any>this).isGenericTypeDefinition = _data["isGenericTypeDefinition"];
        (<any>this).isSZArray = _data["isSZArray"];
        (<any>this).isVariableBoundArray = _data["isVariableBoundArray"];
        (<any>this).isByRefLike = _data["isByRefLike"];
        (<any>this).hasElementType = _data["hasElementType"];
        if (Array.isArray(_data["genericTypeArguments"])) {
          (<any>this).genericTypeArguments = [] as any;
          for (let item of _data["genericTypeArguments"]) (<any>this).genericTypeArguments!.push(Type.fromJS(item));
        }
        (<any>this).genericParameterPosition = _data["genericParameterPosition"];
        this.genericParameterAttributes = _data["genericParameterAttributes"];
        this.attributes = _data["attributes"];
        (<any>this).isAbstract = _data["isAbstract"];
        (<any>this).isImport = _data["isImport"];
        (<any>this).isSealed = _data["isSealed"];
        (<any>this).isSpecialName = _data["isSpecialName"];
        (<any>this).isClass = _data["isClass"];
        (<any>this).isNestedAssembly = _data["isNestedAssembly"];
        (<any>this).isNestedFamANDAssem = _data["isNestedFamANDAssem"];
        (<any>this).isNestedFamily = _data["isNestedFamily"];
        (<any>this).isNestedFamORAssem = _data["isNestedFamORAssem"];
        (<any>this).isNestedPrivate = _data["isNestedPrivate"];
        (<any>this).isNestedPublic = _data["isNestedPublic"];
        (<any>this).isNotPublic = _data["isNotPublic"];
        (<any>this).isPublic = _data["isPublic"];
        (<any>this).isAutoLayout = _data["isAutoLayout"];
        (<any>this).isExplicitLayout = _data["isExplicitLayout"];
        (<any>this).isLayoutSequential = _data["isLayoutSequential"];
        (<any>this).isAnsiClass = _data["isAnsiClass"];
        (<any>this).isAutoClass = _data["isAutoClass"];
        (<any>this).isUnicodeClass = _data["isUnicodeClass"];
        (<any>this).isCOMObject = _data["isCOMObject"];
        (<any>this).isContextful = _data["isContextful"];
        (<any>this).isEnum = _data["isEnum"];
        (<any>this).isMarshalByRef = _data["isMarshalByRef"];
        (<any>this).isPrimitive = _data["isPrimitive"];
        (<any>this).isValueType = _data["isValueType"];
        (<any>this).isSignatureType = _data["isSignatureType"];
        (<any>this).isSecurityCritical = _data["isSecurityCritical"];
        (<any>this).isSecuritySafeCritical = _data["isSecuritySafeCritical"];
        (<any>this).isSecurityTransparent = _data["isSecurityTransparent"];
        this.structLayoutAttribute = _data["structLayoutAttribute"]
          ? StructLayoutAttribute.fromJS(_data["structLayoutAttribute"])
          : <any>undefined;
        this.typeInitializer = _data["typeInitializer"] ? ConstructorInfo.fromJS(_data["typeInitializer"]) : <any>undefined;
        this.typeHandle = _data["typeHandle"] ? RuntimeTypeHandle.fromJS(_data["typeHandle"]) : <any>undefined;
        (<any>this).guid = _data["guid"];
        this.baseType = _data["baseType"] ? Type.fromJS(_data["baseType"]) : <any>undefined;
        (<any>this).isSerializable = _data["isSerializable"];
        (<any>this).containsGenericParameters = _data["containsGenericParameters"];
        (<any>this).isVisible = _data["isVisible"];
        if (Array.isArray(_data["genericTypeParameters"])) {
          (<any>this).genericTypeParameters = [] as any;
          for (let item of _data["genericTypeParameters"]) (<any>this).genericTypeParameters!.push(Type.fromJS(item));
        }
        if (Array.isArray(_data["declaredConstructors"])) {
          (<any>this).declaredConstructors = [] as any;
          for (let item of _data["declaredConstructors"]) (<any>this).declaredConstructors!.push(ConstructorInfo.fromJS(item));
        }
        if (Array.isArray(_data["declaredEvents"])) {
          (<any>this).declaredEvents = [] as any;
          for (let item of _data["declaredEvents"]) (<any>this).declaredEvents!.push(EventInfo.fromJS(item));
        }
        if (Array.isArray(_data["declaredFields"])) {
          (<any>this).declaredFields = [] as any;
          for (let item of _data["declaredFields"]) (<any>this).declaredFields!.push(FieldInfo.fromJS(item));
        }
        if (Array.isArray(_data["declaredMembers"])) {
          (<any>this).declaredMembers = [] as any;
          for (let item of _data["declaredMembers"]) (<any>this).declaredMembers!.push(MemberInfo.fromJS(item));
        }
        if (Array.isArray(_data["declaredMethods"])) {
          (<any>this).declaredMethods = [] as any;
          for (let item of _data["declaredMethods"]) (<any>this).declaredMethods!.push(MethodInfo.fromJS(item));
        }
        if (Array.isArray(_data["declaredNestedTypes"])) {
          (<any>this).declaredNestedTypes = [] as any;
          for (let item of _data["declaredNestedTypes"]) (<any>this).declaredNestedTypes!.push(TypeInfo.fromJS(item));
        }
        if (Array.isArray(_data["declaredProperties"])) {
          (<any>this).declaredProperties = [] as any;
          for (let item of _data["declaredProperties"]) (<any>this).declaredProperties!.push(PropertyInfo.fromJS(item));
        }
        if (Array.isArray(_data["implementedInterfaces"])) {
          (<any>this).implementedInterfaces = [] as any;
          for (let item of _data["implementedInterfaces"]) (<any>this).implementedInterfaces!.push(Type.fromJS(item));
        }
      }
    }
  
    static fromJS(data: any): TypeInfo {
      data = typeof data === "object" ? data : {};
      let result = new TypeInfo();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["name"] = this.name;
      if (Array.isArray(this.customAttributes)) {
        data["customAttributes"] = [];
        for (let item of this.customAttributes) data["customAttributes"].push(item.toJSON());
      }
      data["isCollectible"] = this.isCollectible;
      data["metadataToken"] = this.metadataToken;
      data["isInterface"] = this.isInterface;
      data["memberType"] = this.memberType;
      data["namespace"] = this.namespace;
      data["assemblyQualifiedName"] = this.assemblyQualifiedName;
      data["fullName"] = this.fullName;
      data["assembly"] = this.assembly ? this.assembly.toJSON() : <any>undefined;
      data["module"] = this.module ? this.module.toJSON() : <any>undefined;
      data["isNested"] = this.isNested;
      data["declaringType"] = this.declaringType ? this.declaringType.toJSON() : <any>undefined;
      data["declaringMethod"] = this.declaringMethod ? this.declaringMethod.toJSON() : <any>undefined;
      data["reflectedType"] = this.reflectedType ? this.reflectedType.toJSON() : <any>undefined;
      data["underlyingSystemType"] = this.underlyingSystemType ? this.underlyingSystemType.toJSON() : <any>undefined;
      data["isTypeDefinition"] = this.isTypeDefinition;
      data["isArray"] = this.isArray;
      data["isByRef"] = this.isByRef;
      data["isPointer"] = this.isPointer;
      data["isConstructedGenericType"] = this.isConstructedGenericType;
      data["isGenericParameter"] = this.isGenericParameter;
      data["isGenericTypeParameter"] = this.isGenericTypeParameter;
      data["isGenericMethodParameter"] = this.isGenericMethodParameter;
      data["isGenericType"] = this.isGenericType;
      data["isGenericTypeDefinition"] = this.isGenericTypeDefinition;
      data["isSZArray"] = this.isSZArray;
      data["isVariableBoundArray"] = this.isVariableBoundArray;
      data["isByRefLike"] = this.isByRefLike;
      data["hasElementType"] = this.hasElementType;
      if (Array.isArray(this.genericTypeArguments)) {
        data["genericTypeArguments"] = [];
        for (let item of this.genericTypeArguments) data["genericTypeArguments"].push(item.toJSON());
      }
      data["genericParameterPosition"] = this.genericParameterPosition;
      data["genericParameterAttributes"] = this.genericParameterAttributes;
      data["attributes"] = this.attributes;
      data["isAbstract"] = this.isAbstract;
      data["isImport"] = this.isImport;
      data["isSealed"] = this.isSealed;
      data["isSpecialName"] = this.isSpecialName;
      data["isClass"] = this.isClass;
      data["isNestedAssembly"] = this.isNestedAssembly;
      data["isNestedFamANDAssem"] = this.isNestedFamANDAssem;
      data["isNestedFamily"] = this.isNestedFamily;
      data["isNestedFamORAssem"] = this.isNestedFamORAssem;
      data["isNestedPrivate"] = this.isNestedPrivate;
      data["isNestedPublic"] = this.isNestedPublic;
      data["isNotPublic"] = this.isNotPublic;
      data["isPublic"] = this.isPublic;
      data["isAutoLayout"] = this.isAutoLayout;
      data["isExplicitLayout"] = this.isExplicitLayout;
      data["isLayoutSequential"] = this.isLayoutSequential;
      data["isAnsiClass"] = this.isAnsiClass;
      data["isAutoClass"] = this.isAutoClass;
      data["isUnicodeClass"] = this.isUnicodeClass;
      data["isCOMObject"] = this.isCOMObject;
      data["isContextful"] = this.isContextful;
      data["isEnum"] = this.isEnum;
      data["isMarshalByRef"] = this.isMarshalByRef;
      data["isPrimitive"] = this.isPrimitive;
      data["isValueType"] = this.isValueType;
      data["isSignatureType"] = this.isSignatureType;
      data["isSecurityCritical"] = this.isSecurityCritical;
      data["isSecuritySafeCritical"] = this.isSecuritySafeCritical;
      data["isSecurityTransparent"] = this.isSecurityTransparent;
      data["structLayoutAttribute"] = this.structLayoutAttribute ? this.structLayoutAttribute.toJSON() : <any>undefined;
      data["typeInitializer"] = this.typeInitializer ? this.typeInitializer.toJSON() : <any>undefined;
      data["typeHandle"] = this.typeHandle ? this.typeHandle.toJSON() : <any>undefined;
      data["guid"] = this.guid;
      data["baseType"] = this.baseType ? this.baseType.toJSON() : <any>undefined;
      data["isSerializable"] = this.isSerializable;
      data["containsGenericParameters"] = this.containsGenericParameters;
      data["isVisible"] = this.isVisible;
      if (Array.isArray(this.genericTypeParameters)) {
        data["genericTypeParameters"] = [];
        for (let item of this.genericTypeParameters) data["genericTypeParameters"].push(item.toJSON());
      }
      if (Array.isArray(this.declaredConstructors)) {
        data["declaredConstructors"] = [];
        for (let item of this.declaredConstructors) data["declaredConstructors"].push(item.toJSON());
      }
      if (Array.isArray(this.declaredEvents)) {
        data["declaredEvents"] = [];
        for (let item of this.declaredEvents) data["declaredEvents"].push(item.toJSON());
      }
      if (Array.isArray(this.declaredFields)) {
        data["declaredFields"] = [];
        for (let item of this.declaredFields) data["declaredFields"].push(item.toJSON());
      }
      if (Array.isArray(this.declaredMembers)) {
        data["declaredMembers"] = [];
        for (let item of this.declaredMembers) data["declaredMembers"].push(item.toJSON());
      }
      if (Array.isArray(this.declaredMethods)) {
        data["declaredMethods"] = [];
        for (let item of this.declaredMethods) data["declaredMethods"].push(item.toJSON());
      }
      if (Array.isArray(this.declaredNestedTypes)) {
        data["declaredNestedTypes"] = [];
        for (let item of this.declaredNestedTypes) data["declaredNestedTypes"].push(item.toJSON());
      }
      if (Array.isArray(this.declaredProperties)) {
        data["declaredProperties"] = [];
        for (let item of this.declaredProperties) data["declaredProperties"].push(item.toJSON());
      }
      if (Array.isArray(this.implementedInterfaces)) {
        data["implementedInterfaces"] = [];
        for (let item of this.implementedInterfaces) data["implementedInterfaces"].push(item.toJSON());
      }
      return data;
    }
  }
  
  export interface ITypeInfo {
    name?: string | undefined;
    customAttributes?: CustomAttributeData[] | undefined;
    isCollectible?: boolean;
    metadataToken?: number;
    isInterface?: boolean;
    memberType?: MemberTypes;
    namespace?: string | undefined;
    assemblyQualifiedName?: string | undefined;
    fullName?: string | undefined;
    assembly?: Assembly;
    module?: Module;
    isNested?: boolean;
    declaringType?: Type;
    declaringMethod?: MethodBase;
    reflectedType?: Type;
    underlyingSystemType?: Type;
    isTypeDefinition?: boolean;
    isArray?: boolean;
    isByRef?: boolean;
    isPointer?: boolean;
    isConstructedGenericType?: boolean;
    isGenericParameter?: boolean;
    isGenericTypeParameter?: boolean;
    isGenericMethodParameter?: boolean;
    isGenericType?: boolean;
    isGenericTypeDefinition?: boolean;
    isSZArray?: boolean;
    isVariableBoundArray?: boolean;
    isByRefLike?: boolean;
    hasElementType?: boolean;
    genericTypeArguments?: Type[] | undefined;
    genericParameterPosition?: number;
    genericParameterAttributes?: GenericParameterAttributes;
    attributes?: TypeAttributes;
    isAbstract?: boolean;
    isImport?: boolean;
    isSealed?: boolean;
    isSpecialName?: boolean;
    isClass?: boolean;
    isNestedAssembly?: boolean;
    isNestedFamANDAssem?: boolean;
    isNestedFamily?: boolean;
    isNestedFamORAssem?: boolean;
    isNestedPrivate?: boolean;
    isNestedPublic?: boolean;
    isNotPublic?: boolean;
    isPublic?: boolean;
    isAutoLayout?: boolean;
    isExplicitLayout?: boolean;
    isLayoutSequential?: boolean;
    isAnsiClass?: boolean;
    isAutoClass?: boolean;
    isUnicodeClass?: boolean;
    isCOMObject?: boolean;
    isContextful?: boolean;
    isEnum?: boolean;
    isMarshalByRef?: boolean;
    isPrimitive?: boolean;
    isValueType?: boolean;
    isSignatureType?: boolean;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    structLayoutAttribute?: StructLayoutAttribute;
    typeInitializer?: ConstructorInfo;
    typeHandle?: RuntimeTypeHandle;
    guid?: string;
    baseType?: Type;
    isSerializable?: boolean;
    containsGenericParameters?: boolean;
    isVisible?: boolean;
    genericTypeParameters?: Type[] | undefined;
    declaredConstructors?: ConstructorInfo[] | undefined;
    declaredEvents?: EventInfo[] | undefined;
    declaredFields?: FieldInfo[] | undefined;
    declaredMembers?: MemberInfo[] | undefined;
    declaredMethods?: MethodInfo[] | undefined;
    declaredNestedTypes?: TypeInfo[] | undefined;
    declaredProperties?: PropertyInfo[] | undefined;
    implementedInterfaces?: Type[] | undefined;
  }
  
  export class ValidationError implements IValidationError {
    property?: string | undefined;
    reason?: string | undefined;
  
    constructor(data?: IValidationError) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.property = _data["property"];
        this.reason = _data["reason"];
      }
    }
  
    static fromJS(data: any): ValidationError {
      data = typeof data === "object" ? data : {};
      let result = new ValidationError();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["property"] = this.property;
      data["reason"] = this.reason;
      return data;
    }
  }
  
  export interface IValidationError {
    property?: string | undefined;
    reason?: string | undefined;
  }
  
  export class Warehouse implements IWarehouse {
    id?: number;
    code?: string | undefined;
    name!: string;
    line1!: string;
    line2?: string | undefined;
    line3?: string | undefined;
    location!: Location;
    contact?: Contact;
    isPostal?: boolean;
    isResidential?: boolean;
    isMineSite?: boolean;
    notes?: string | undefined;
  
    constructor(data?: IWarehouse) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
        }
      }
      if (!data) {
        this.location = new Location();
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.code = _data["code"];
        this.name = _data["name"];
        this.line1 = _data["line1"];
        this.line2 = _data["line2"];
        this.line3 = _data["line3"];
        this.location = _data["location"] ? Location.fromJS(_data["location"]) : new Location();
        this.contact = _data["contact"] ? Contact.fromJS(_data["contact"]) : <any>undefined;
        this.isPostal = _data["isPostal"];
        this.isResidential = _data["isResidential"];
        this.isMineSite = _data["isMineSite"];
        this.notes = _data["notes"];
      }
    }
  
    static fromJS(data: any): Warehouse {
      data = typeof data === "object" ? data : {};
      let result = new Warehouse();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["id"] = this.id;
      data["code"] = this.code;
      data["name"] = this.name;
      data["line1"] = this.line1;
      data["line2"] = this.line2;
      data["line3"] = this.line3;
      data["location"] = this.location ? this.location.toJSON() : <any>undefined;
      data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
      data["isPostal"] = this.isPostal;
      data["isResidential"] = this.isResidential;
      data["isMineSite"] = this.isMineSite;
      data["notes"] = this.notes;
      return data;
    }
  }
  
  export interface IWarehouse {
    id?: number;
    code?: string | undefined;
    name: string;
    line1: string;
    line2?: string | undefined;
    line3?: string | undefined;
    location: Location;
    contact?: Contact;
    isPostal?: boolean;
    isResidential?: boolean;
    isMineSite?: boolean;
    notes?: string | undefined;
  }
  
  export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any };
    result: any;
  
    constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
      super();
  
      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
    }
  
    protected isApiException = true;
  
    static isApiException(obj: any): obj is ApiException {
      return obj.isApiException === true;
    }
  }
  
  function throwException(message: string, status: number, response: string, headers: { [key: string]: any }, result?: any): any {
    if (result !== null && result !== undefined) throw result;
    else throw new ApiException(message, status, response, headers, null);
  }
  