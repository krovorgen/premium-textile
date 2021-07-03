import React, { FC } from 'react';

import styles from './style.module.scss';

const About: FC = () => {
  return (
    <section className={styles['about']} id={'about'}>
      <div className={'container'}>
        <div className={styles['about__inner']}>
          <h2 className={'title'}>О доставке</h2>
          <ul className={styles['about__items']}>
            <li className={`${styles['about__item']} ${styles['about__item--delivery']}`}>
              <p className={styles['about__text']}>
                Доставка осуществляется курьерской службой "Новая Почта" наложенным платежом или по
                полной предоплате на банковскую карту.
              </p>
            </li>
            <li className={`${styles['about__item']} ${styles['about__item--view']}`}>
              <p className={styles['about__text']}>
                У вас всегда есть возможность предварительного осмотра и проверки товара перед его
                оплатой.
              </p>
            </li>
            <li className={`${styles['about__item']} ${styles['about__item--clock']}`}>
              <p className={styles['about__text']}>
                Доставка от 1-го до 3-ех дней по всей територии Украины.
              </p>
            </li>
          </ul>
        </div>
        <div className={styles['about__inner']}>
          <h2 className={'title'}>Гарантии</h2>
          <ul className={styles['about__items']}>
            <li className={`${styles['about__item']} ${styles['about__item--box']}`}>
              <p className={styles['about__text']}>
                -Товар полностью соотвествуют описанию и фото на сайте
              </p>
            </li>
            <li className={`${styles['about__item']} ${styles['about__item--no']}`}>
              <p className={styles['about__text']}>
                -Мы не берем с вас предоплату, оплачиваете товар только на отделении почтового
                отделения
              </p>
            </li>
            <li className={`${styles['about__item']} ${styles['about__item--check']}`}>
              <p className={styles['about__text']}>
                -Перед отправкой товар проходит 100% проверку. Мы вернем вам деньги если что-то с
                вашим заказом будет не так.
              </p>
            </li>
            <li className={`${styles['about__item']} ${styles['about__item--return']}`}>
              <p className={styles['about__text']}>-Обмен/Возврат товара до 14 дней</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
