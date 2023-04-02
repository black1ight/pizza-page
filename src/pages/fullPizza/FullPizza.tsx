import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  addItem,
  CartItemType,
  selectCartItemById,
} from "../../redux/slices/cartSlice";
import Loader from "../../utils/Loader/Loader";
import style from "./fullPizza.module.scss";

type FullPizzaType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  types: number[];
  sizes: number[];
  count: number;
};

const FullPizza: React.FC = () => {
  const { id } = useParams();

  const [pizza, setPizza] = React.useState<FullPizzaType>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63f67ab959c944921f74dd84.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch {
        alert("Помилка при отриманні піцц");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  const typeNames = ["тонке", "традиційне"];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const cartItem: CartItemType[] = useSelector(selectCartItemById(id!));

  const addedCount = cartItem
    ? cartItem.reduce((sum, obj) => obj.count + sum, 0)
    : 0;

  const sizesPriceCreate = [1, 1.08, 1.15];

  const customPrice = Number(
    activeSize > 0
      ? (pizza!.price * sizesPriceCreate[activeSize]).toFixed()
      : pizza?.price
  );

  const btnBlockStyle = {
    margin: 0,
  };

  const btnStyle = {
    width: "40%",
  };

  const onClickAddButton = () => {
    if (pizza) {
      const item: CartItemType = {
        id: pizza.id,
        title: pizza.title,
        imageUrl: pizza.imageUrl,
        price: pizza.price,
        type: typeNames[activeType],
        size: pizza.sizes[activeSize],
        count: 0,
      };
      dispatch(addItem(item));
    }
  };

  if (!pizza) {
    return <Loader />;
  }

  return (
    <div className={style.root}>
      <div className={style.imageWrapper}>
        <img className={style.img} src={pizza.imageUrl} />
      </div>
      <div className={style.info}>
        <h2 className={style.title}>{pizza.title}</h2>
        <p className={style.descr}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi dolorem
          necessitatibus distinctio minima iste eos quibusdam quasi, ducimus
          ipsum ipsa a, nulla, aperiam error non atque ut placeat consequatur
          quos.
        </p>
        <div className={style.selectWrapper}>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types.map((typeId) => (
                <li
                  key={typeId}
                  onClick={() => setActiveType(typeId)}
                  className={activeType === typeId ? "active" : ""}
                >
                  {typeNames[typeId]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, i) => (
                <li
                  key={i}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={style.addBlock}>
          <div className="cart__bottom-buttons" style={btnBlockStyle}>
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
              style={btnStyle}
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span>назад</span>
            </Link>
            <button
              onClick={onClickAddButton}
              className="button button--outline button--add"
              style={btnStyle}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Додати</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </button>
          </div>
        </div>
        <h4 className={style.price}>Ціна: {customPrice} ₴</h4>
      </div>
      <div className={style.selectBlockHidden}>
        <div className={style.selectWrapper}>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types.map((typeId) => (
                <li
                  key={typeId}
                  onClick={() => setActiveType(typeId)}
                  className={activeType === typeId ? "active" : ""}
                >
                  {typeNames[typeId]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, i) => (
                <li
                  key={i}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={style.addBlock}>
          <div className="cart__bottom-buttons" style={btnBlockStyle}>
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
              style={btnStyle}
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span>назад</span>
            </Link>
            <button
              onClick={onClickAddButton}
              className="button button--outline button--add"
              style={btnStyle}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Додати</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </button>
          </div>
        </div>
        <h4 className={style.price}>Ціна: {customPrice} ₴</h4>
      </div>
    </div>
  );
};

export default FullPizza;
