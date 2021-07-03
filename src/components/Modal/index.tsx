import React, { FC } from 'react';

import styles from './style.module.scss';

interface IModalProps {
    callBack: () => void;
    small?: boolean;
}

const Modal: FC<IModalProps> = ({ children, callBack, small }) => {
    return (
        <div className={styles['modal']}>
            <div className={styles['modal__content']}>
                <div className={`${styles['modal__box']} ${small && styles['modal__box--sm']}`}>
                    {children}
                    <button className={styles['modal__close']} onClick={callBack}></button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
