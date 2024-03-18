export interface Order {
    name: string;
    local_id:number;
    payMethod: string;
    shippingMethod: string;
    direction: string;
    streetNumber: string;
    amountReceived: number;
    reference: string | null;
    defineCostShipping: boolean;
    ubication: Ubication;
    costShipping:number;
    subtotal:number;
    cart:ItemCart[]
    status:statusType
}

interface BaseOrderValue {
    id: number;
    order_date: Date;
    customer_name: string;
    total_amount: number;
    local_id: number;
    payment_method: string;
    shipping_address: string;
    shipping_reference: string | null;
  }
  
  export interface OrderEntity extends BaseOrderValue {}
  
  export interface PostOrderValue extends Omit<BaseOrderValue, 'order_date' | 'id'> {}

type statusType = 'pendiente'|'procesada'|'enviada'|'entregada'|'cancelada';

interface Ubication {
    type: string;
    id: string;
    score: number;
    address: {
        streetName: string;
        municipality: string;
        countrySecondarySubdivision: string;
        countrySubdivision: string;
        countrySubdivisionName: string;
        countrySubdivisionCode: string;
        countryCode: string;
        country: string;
        countryCodeISO3: string;
        freeformAddress: string;
        localName: string;
    };
    position: {
        lng: number;
        lat: number;
    };
    viewport: {
        topLeftPoint: {
            lng: number;
            lat: number;
        };
        btmRightPoint: {
            lng: number;
            lat: number;
        };
    };
}

export interface ItemCart {
    idCart: number;
    idProduct: number | string;
    name: string;
    quantity: number;
    total: number;
    userOptions: Array<userOptions>;
    especifications: string;
    productImage: string;
    category: string;
    productPrice?:number
  }
  
  interface userOptions {
    multiple: boolean;
    nameOption: string;
    multipleOptions?:Array<DetailsOptions>
    nameVariation: string;
    price: number;
    required: boolean;
    typePrice: number;
  }
  
  export interface DetailsOptions {
    nameOption: string;
    price: number;
    active?:boolean;
  }
  