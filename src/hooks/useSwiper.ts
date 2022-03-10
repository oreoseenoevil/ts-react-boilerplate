import SwiperClass from 'swiper/types/swiper-class';
import { useCallback, useEffect, useState } from 'react';

const useSwiper = () => {
  const [atEnd, setAtEnd] = useState(false);
  const [atBeginning, setAtBeginning] = useState(true);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const swiperChangeHandler = useCallback(
    (newSwiper: SwiperClass) => {
      if (!swiper) return;
      setAtBeginning(newSwiper.isBeginning);
      setAtEnd(newSwiper.isEnd);
    },
    [swiper]
  );

  useEffect(() => {
    if (swiper) {
      setAtBeginning(swiper.isBeginning);
      setAtEnd(swiper.isEnd);
      swiper.on('slideChange', swiperChangeHandler);
    }

    return () => {
      if (swiper) {
        swiper.off('slideChange', swiperChangeHandler);
      }
    };
  }, [swiper, swiperChangeHandler]);

  return {
    swiper,
    setSwiper,
    atEnd,
    atBeginning,
    prevSlide: () => swiper && swiper.slidePrev(),
    nextSlide: () => swiper && swiper.slideNext()
  };
};

export default useSwiper;
