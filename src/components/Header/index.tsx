import React, { FC } from 'react';

import logo from '../../images/logo.svg';

import styles from './style.module.scss';

import {Link} from 'react-scroll';


const Header: FC = () => {
    return (
        <header className={styles['header']}>
            <div className={'container'}>
                <nav className={styles['menu']}>
                    <Link className={styles['logo']} to={'main'} smooth={true}
                          duration={1000}>
                        <img className={styles['header__img']} src={logo} alt="Premium Textile" />
                        <h1 className={styles['header__title']}>Premium Textile</h1>
                    </Link>
                    <ul className={styles['menu__list']}>
                        <li className={styles['menu__list-item']}>
                            <Link className={styles['menu__btn']} to={'products'} smooth={true}
                               duration={1000}>
                                Товары
                            </Link>
                        </li>
                        <li className={styles['menu__list-item']}>
                            <Link className={styles['menu__btn']} to={'about'} smooth={true}
                               duration={1000}>
                                О нас
                            </Link>
                        </li>
                        <li className={styles['menu__list-item']}>
                            <Link className={styles['menu__btn']} to={'feedback'} smooth={true}
                               duration={1000}>
                                Отзывы
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
