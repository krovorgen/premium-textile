import React, { FC } from 'react';

import styles from './style.module.scss';

const Footer: FC = () => {
  return (
    <section className={styles['footer']}>
      <div className={'container'}>
        <p className={styles['footer__text']}>Copyright.PremiumTextile.Все права защищены</p>
      </div>
    </section>
  );
};

export default Footer;
