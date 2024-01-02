'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { Event } from '@/interfaces/event';
import { TicketType } from '@/interfaces/ticketType';
import { TicketContextProps, TicketProviderProps } from './props';

export const TicketContext = createContext({} as TicketContextProps);

export function TicketProvider({ children }: TicketProviderProps) {
  const [ticketType, setTicketType] = useState<TicketType | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const handleCalculateAmount = (action: 'remove' | 'add', value: number) => {
    if (action === 'remove') {
      setAmount((amount) => amount + value);
    } else if (action === 'add') {
      setAmount((amount) => amount - value);
    }
  };

  const providerValues = useMemo(
    () => ({
      ticketType,
      setTicketType,

      amount,
      setAmount,

      handleCalculateAmount,
    }),
    [ticketType, setTicketType, amount, setAmount, handleCalculateAmount],
  );

  return (
    <TicketContext.Provider value={providerValues}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);

  if (context) {
    return context;
  }

  throw new Error('useTicket must be used within a TicketContextProvider');
}
