import React, { FC, useState } from 'react';

import mockData, { CategoryType, getSvg } from '../../mockDataProduct';
import Modal from '../Modal';
import ModalBuy from '../ModalBuy';

import styles from './style.module.scss';
import { Player } from '@lottiefiles/react-lottie-player';

type ModalContentType = {
  img: string;
  title: string;
  price: number;
  size: JSX.Element | string;
  sale: boolean;
  category: CategoryType[];
  id: string;
};

const Products: FC = () => {
  let [modalContent, setModalContent] = useState<ModalContentType | null>(null);
  let [productList, setProductList] = useState(mockData);
  let [filter, setFilter] = useState<'all' | 'towel' | 'linens'>('all');
  let [openPayModal, setOpenPayModal] = useState<boolean>(false);
  let [greetingUser, setGreetingUser] = useState('Здравствуйте! Хотел бы заказать ');
  let [modalPrice, setModalPrice] = useState<number>(0);
  let [modalCategory, setModalCategory] = useState<CategoryType[]>([]);

  let copyProductList = productList;

  if (filter === 'towel') {
    copyProductList = productList.filter((item) => item.type === 'towel');
  }
  if (filter === 'linens') {
    copyProductList = productList.filter((item) => item.type === 'linens');
  }

  const modalPriceHandler = (money: number) => {
    setModalPrice(money);
  };

  const modalOpenHandler = (
    img: string,
    title: string,
    price: number,
    size: JSX.Element | string,
    sale: boolean,
    category: CategoryType[],
    id: string,
  ) => {
    setModalContent({ img, title, price, size, sale, category, id });
    setModalPrice(sale ? price * 0.75 : price);
  };

  const modalInModal = (title: string, category: CategoryType[]) => {
    setModalContent(null);
    setOpenPayModal(true);
    setGreetingUser(`Здравствуйте! Хотел бы заказать ${title}`);
    setModalCategory(category);
  };

  const infoProductForm = (title: string, category: CategoryType[]) => {
    setOpenPayModal(true);
    setGreetingUser(`Здравствуйте! Хотел бы заказать ${title}`);
    setModalCategory(category);
  };

  const closeModal = () => {
    setOpenPayModal(false);
  };

  return (
    <>
      <section className={styles['products']} id={'products'}>
        <div className={'container'}>
          <h2 className={'title'}>Каталог</h2>

          <ul className={styles['products__list']}>
            <li className={styles['products__list-item']}>
              <button
                className={`${styles['products__list-button']} ${
                  filter === 'all' ? styles['products__list-button--active'] : ''
                }`}
                onClick={() => setFilter('all')}>
                Все товары
              </button>
            </li>
            <li className={styles['products__list-item']}>
              <button
                className={`${styles['products__list-button']} ${
                  filter === 'towel' ? styles['products__list-button--active'] : ''
                }`}
                onClick={() => setFilter('towel')}>
                Полотенца
              </button>
            </li>
            <li className={styles['products__list-item']}>
              <button
                className={`${styles['products__list-button']} ${
                  filter === 'linens' ? styles['products__list-button--active'] : ''
                }`}
                onClick={() => setFilter('linens')}>
                Постельное белье
              </button>
            </li>
          </ul>
          <ul className={styles['products__items']}>
            {copyProductList.map((item) => {
              return (
                <li key={item.id} className={styles['products__item']}>
                  <article className={'card'}>
                    <img className={'card__img'} src={getSvg(item.id)} alt="" />
                    <h2 className={'card__title'}>{item.title}</h2>
                    <div className={'card__prices'}>
                      <span className={'card__price'}>{item.category[0].count} грн</span>

                      {item.sale && <span className={'card__oldprice'}>{item.price} грн</span>}
                    </div>
                    <div className={'buttons'}>
                      <button
                        className={'card__btn-more'}
                        onClick={() =>
                          modalOpenHandler(
                            item.img,
                            item.title,
                            item.price,
                            item.description,
                            item.sale,
                            item.category,
                            item.id,
                          )
                        }>
                        Подробнее
                      </button>
                      <button
                        className={'card__btn-buy'}
                        onClick={() => infoProductForm(item.title, item.category)}>
                        Купить
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {modalContent && (
        <Modal callBack={() => setModalContent(null)}>
          <div className={styles['modal-product__img']}>
            <img src={getSvg(modalContent.id)} alt="" />
          </div>
          <div className={styles['modal-product__info']}>
            <h2 className={styles['modal-product__title']}>{modalContent?.title}</h2>
            {modalContent?.category.map((item) => {
              return (
                <button
                  key={item.id}
                  className={`${styles['modal-product__type-btn']} ${
                    item.count === modalPrice ? styles['modal-product__type-btn--active'] : ''
                  }`}
                  onClick={() => modalPriceHandler(item.count)}>
                  {item.descr}
                </button>
              );
            })}

            {modalContent.sale && (
              <Player
                autoplay
                loop
                className={styles['modal-product__star']}
                src="https://assets6.lottiefiles.com/packages/lf20_AdKXsL.json"
              />
            )}
            <p className={styles['modal-product__price']}>
              <span className={styles['modal-product__price-sale']}>{modalPrice} грн</span>
              <span className={styles['modal-product__price-main']}>
                <span>{modalContent?.sale}</span>
              </span>
            </p>
            <div className={styles['modal-product__description']}>{modalContent?.size}</div>
            <button
              className={styles['modal-product__btn']}
              onClick={() => {
                modalInModal(
                  modalContent?.title ? modalContent?.title : '',
                  modalContent?.category ? modalContent?.category : [],
                );
              }}>
              Заказать
            </button>
          </div>
        </Modal>
      )}
      {openPayModal && (
        <Modal callBack={closeModal} small>
          <ModalBuy
            greetingUser={greetingUser}
            closeModal={closeModal}
            modalCategory={modalCategory}
          />
        </Modal>
      )}
    </>
  );
};

export default Products;
