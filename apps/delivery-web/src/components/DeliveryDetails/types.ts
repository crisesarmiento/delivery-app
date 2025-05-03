export interface DeliveryDetailsProps {
  deliveryMethod: string;
  setDeliveryMethod: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  province: string;
  setProvince: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  paymentAmount: number | '' | string;
  setPaymentAmount: (value: number | '' | string) => void;
}
