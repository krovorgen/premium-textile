import React, {FC} from 'react';
import {v1} from 'uuid';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay, Pagination, Navigation} from 'swiper/core';

import sliderMockData from './sliderMockData';

import styles from './style.module.scss';

const Feedback: FC = () => {
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  return (
    <section className={styles['feedback']} id={'feedback'}>
      <div className={'container'}>
        <h2 className={'title'}>Отзывы</h2>
        <Swiper
          slidesPerView={3}
          loop={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}>
          {sliderMockData.map((slide) => {
            return (
              <SwiperSlide key={v1()} className={styles['feedback__slide']}>
                <div className={styles['feedback__card']}>
                  <div className={styles['feedback__header']}>
                    <img
                      className={styles['feedback__card-img']}
                      src={`${process.env.PUBLIC_URL}../assets/images/${slide.img}`}
                      alt="аватар"
                    />
                    <div className={styles['feedback__card-name']}>
                      {slide.name}
                    </div>
                  </div>
                  <p className={styles['feedback__card-text']}>{slide.text}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedback;
