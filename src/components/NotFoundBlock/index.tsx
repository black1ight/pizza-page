import React from "react";
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.body}>
            <h1>
                &#128533;
                <br />
                Нічого не знайдено
            </h1>
            <span className={styles.descr}>Нажаль, ця сторінка відсутня в нашому інтернет-магазині</span>
        </div>
    )
}

export default NotFoundBlock