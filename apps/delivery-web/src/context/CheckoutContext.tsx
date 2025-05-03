import React, { createContext, useContext, useState, ReactNode } from 'react';

// Updated type for paymentAmount and setPaymentAmount to match Mantine's NumberInput expectations
export interface CheckoutInfo {
  deliveryMethod: string;
  setDeliveryMethod: (v: string) => void;
  fullName: string;
  setFullName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  province: string;
  setProvince: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  paymentAmount: number | '' | string;
  setPaymentAmount: (v: number | '' | string) => void;
}

const CheckoutContext = createContext<CheckoutInfo | undefined>(undefined);

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentAmount, setPaymentAmount] = useState<number | '' | string>('');

  return (
    <CheckoutContext.Provider
      value={{
        deliveryMethod, setDeliveryMethod,
        fullName, setFullName,
        phone, setPhone,
        address, setAddress,
        city, setCity,
        province, setProvince,
        note, setNote,
        paymentMethod, setPaymentMethod,
        paymentAmount, setPaymentAmount,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
