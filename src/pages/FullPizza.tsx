import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams();

  const [pizza, setPizza] = React.useState<{
    title: string;
    imageUrl: string;
    price: number;
  }>();
  const navigate = useNavigate();

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

  if (!pizza) {
    return <>loading...</>;
  }

  return (
    <div className="">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} />
      <h4>Ціна: {pizza.price} ₴</h4>
    </div>
  );
};

export default FullPizza;
