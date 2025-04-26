import { useState, useEffect, useMemo } from 'react';
import { CondimentItem } from '../types/addToCartModal/types';
import { IProductWithCustomization } from '@/types';
import { MODAL_TEXTS } from '../config/constants';

export const useCondiments = (
  initialCondiments: string[] = [],
  productWithCustomization: IProductWithCustomization | null,
  isInitialized: React.MutableRefObject<boolean>,
  opened: boolean
) => {
  const [condiments, setCondiments] = useState<CondimentItem[]>([]);
  const [showCondiments, setShowCondiments] = useState(true);

  const condimentOptions = useMemo(() => {
    if (!productWithCustomization?.customization?.condimentOptions) {
      return [];
    }
    return Object.values(
      productWithCustomization.customization.condimentOptions
    );
  }, [productWithCustomization]);

  useEffect(() => {
    if (!opened || !productWithCustomization || isInitialized.current) {
      return;
    }
    if (productWithCustomization.customization?.condimentOptions) {
      const defaultCondiments = Object.values(
        productWithCustomization.customization.condimentOptions
      ).map((condiment) => ({
        name: condiment.name,
        selected: initialCondiments.includes(condiment.name),
      }));
      setCondiments(defaultCondiments);
    }
  }, [opened, productWithCustomization, initialCondiments, isInitialized]);

  const handleToggleCondiment = (index: number) => {
    const newCondiments = [...condiments];
    newCondiments[index].selected = !newCondiments[index].selected;
    const selectedCount = newCondiments.filter((c) => c.selected).length;
    const maxCondiments =
      productWithCustomization?.customization?.maxCondimentSelections || 3;
    if (selectedCount > maxCondiments) {
      newCondiments[index].selected = !newCondiments[index].selected;
      alert(
        MODAL_TEXTS.MAX_CONDIMENTS_ALERT.replace(
          '{0}',
          maxCondiments.toString()
        )
      );
      return;
    }
    setCondiments(newCondiments);
  };

  return {
    condiments,
    setCondiments,
    showCondiments,
    setShowCondiments,
    handleToggleCondiment,
    condimentOptions,
  };
};
