
export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
  UNDER_RENOVATION = 'UNDER_RENOVATION',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  OFF_MARKET = 'OFF_MARKET',
}

export enum OwnershipStatus {
  OWNED = 'OWNED',
  MORTGAGED = 'MORTGAGED',
  RENTED = 'RENTED',
  LEASED = 'LEASED',
  INHERITED = 'INHERITED',
  TRANSFER_PENDING = 'TRANSFER_PENDING',
  SOLD = 'SOLD',
  OTHER = 'OTHER',
}

export enum ElevatorPresence {
  YES = 'YES',
  NO = 'NO',
  PLANNED = 'PLANNED',
  NOT_REQUIRED = 'NOT_REQUIRED',
  UNKNOWN = 'UNKNOWN',
}

export enum PropertyType {
  APARTMENT = 'Apartment',
  HOUSE = 'House',
  DUPLEX = 'Duplex',
  PENTHOUSE = 'Penthouse',
  STUDIO = 'Studio',
  VILLA = 'Villa',
  TOWNHOUSE = 'Townhouse',
  COTTAGE = 'Cottage',
  LOFT = 'Loft',
  BUNGALOW = 'Bungalow',
  FARMHOUSE = 'Farmhouse',
  COMMERCIAL = 'Commercial',
  OFFICE = 'Office',
  WAREHOUSE = 'Warehouse',
  OTHER = 'Other',
}

export interface PropertyData {
  id?: number;
  nickname: string;
  ownershipStatus: OwnershipStatus;
  propertyType: PropertyType;
  city: string;
  street: string;
  blockNumber: string;
  floor: number | null;
  floorsCount: number | null;
  apartmentNumber: string;
  elevator: ElevatorPresence;
  sizeUtil: number;
  sizeYard: number;
  bedRooms: number;
  bathNumber: number;
  toilets: number;
  propertyStatus: PropertyStatus;
  datePurchase: Date | null;
  dateOfSell: Date | null;
  zip:number;
}
