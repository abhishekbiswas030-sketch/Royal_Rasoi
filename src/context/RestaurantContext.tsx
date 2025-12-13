import { createContext, useContext } from 'react';
import { useRestaurant } from '@/hooks/useRestaurant';

const RestaurantContext = createContext<
  ReturnType<typeof useRestaurant> | undefined
>(undefined);

export function RestaurantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useRestaurant();
  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurantContext() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error(
      'useRestaurantContext must be used inside RestaurantProvider'
    );
  }
  return context;
}
