import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-number-input';
import { CategoryType } from '../../mockDataProduct';

import styles from './style.module.scss';

interface IModalBuyProps {
  greetingUser?: string;
  closeModal?: () => void;
  modalCategory?: CategoryType[];
}

const ModalBuy: FC<IModalBuyProps> = ({ greetingUser, closeModal, modalCategory }) => {
  let copyModalCategory = modalCategory;
  const [value, setValue] = useState('');
  const [textareaValue, setTextareaValue] = useState(greetingUser);
  const [buttonText, setButtonText] = useState('Отправить заявку');
  const [categoryDefault, setCategoryDefault] = useState<any>(
    copyModalCategory && copyModalCategory[0],
  );
  const [modalPrice, setModalPrice] = useState<number | undefined>(
    categoryDefault && categoryDefault.count,
  );
  let [countProduct, setCountProduct] = useState<number>(1);

  const modalPriceHandler = (countProduct: number) => {
    setModalPrice(countProduct * categoryDefault.count);
  };

  console.log(categoryDefault);

  const changeSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
    let currentCategory = copyModalCategory?.filter(
      (item) => item.descr === e.currentTarget.value,
    )[0];
    setCategoryDefault(currentCategory);
    setModalPrice(currentCategory && currentCategory.count);
    setCountProduct(1);
  };

  const textareaValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.currentTarget.value);
  };

  const countProductHandler = (operation: 'plus' | 'minus') => {
    if (countProduct <= 1 && operation === 'minus') {
      return;
    }
    operation === 'plus' && setCountProduct((countProduct += 1));
    operation === 'minus' && setCountProduct((countProduct -= 1));
    modalPriceHandler(countProduct);
  };

  function sendEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const element = e.target as HTMLFormElement;

    emailjs
      .sendForm('service_zwzcuj8', 'template_nnofpol', element, 'user_lMzDOCxB7FMfmgkx2Qr4C')
      .then();

    element.reset();
    setTextareaValue('');
    setButtonText('Сообщение отправлено');
    setValue('');
    setCountProduct(1);
    setTimeout(function () {
      setButtonText('Отправить заявку');
      closeModal && closeModal();
    }, 3000);
  }

  return (
    <form className={styles['contact-form']} onSubmit={sendEmail}>
      <input
        className={styles['contact-form__name']}
        type="text"
        name="name"
        id="name"
        placeholder="Ваше имя"
        required
      />
      <PhoneInput
        className={styles['contact-form__phone']}
        placeholder="Ваш телефон"
        international
        defaultCountry="UA"
        value={value}
        onChange={setValue}
        name="phone"
        id="phone"
        required
      />

      {modalCategory && (
        <>
          <div className={styles['contact-form__category-inner']}>
            <select
              className={styles['contact-form__category']}
              id="category"
              name="category"
              onChange={changeSelectValue}
              required>
              {modalCategory.map((item) => {
                return (
                  <option key={item.id} value={item.descr}>
                    {item.descr}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles['contact-form__counter']}>
            <button
              className={`${styles['contact-form__button']} ${styles['contact-form__button--minus']}`}
              onClick={() => countProductHandler('minus')}
              type={'button'}
            />
            <input
              className={styles['contact-form__count']}
              id="count"
              name="count"
              readOnly
              value={countProduct}
            />
            <button
              className={`${styles['contact-form__button']} ${styles['contact-form__button--plus']}`}
              onClick={() => countProductHandler('plus')}
              type={'button'}
            />
            <span className={styles['contact-form__price']}>{modalPrice} грн</span>
          </div>
        </>
      )}
      <input
        type="text"
        id="totalPrice"
        name="totalPrice"
        value={modalPrice}
        style={{ display: 'none' }}
      />
      <textarea
        className={styles['contact-form__text']}
        placeholder="Введите ваше сообщение"
        name="message"
        id="message"
        value={textareaValue}
        onChange={textareaValueHandler}
      />
      <input className={styles['contact-form__btn']} type="submit" value={buttonText} />
    </form>
  );
};

export default ModalBuy;
