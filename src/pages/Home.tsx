import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import {
  setCategoryId,
  setSortType,
  setSortArrow,
  setCurrentPage,
  setFilter,
  FilterSliceState,
} from "../redux/slices/filterSlice";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

const sortList = ["rating", "price", "title"];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, sortArrow, currentPage } = useSelector(
    (state: RootState) => state.filter
  );

  const { searchValue } = useSelector((state: RootState) => state.filter);

  const { items, status } = useSelector((state: RootState) => state.pizzas);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangeSort = (sortId: number) => {
    dispatch(setSortType(sortId));
  };

  const onChangeArrow = () => {
    dispatch(setSortArrow(!sortArrow));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const arrow = sortArrow ? "order=desc" : "order=asc";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        arrow,
        search,
        sortList,
        sortType,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, sortArrow, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType,
        sortArrow,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, sortArrow, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FilterSliceState;
      dispatch(setFilter({ ...params }));
    }
    isSearch.current = true;
  }, []);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzasItems = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const Paggination = (
    <Pagination currentPage={currentPage} onChangePage={onChangePage} />
  );
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(id) => onChangeSort(id)}
          onChangeArrow={() => onChangeArrow()}
        />
      </div>
      <h2 className="content__title">Всі піцци</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Нажаль, виникла помилка</h2>
          <p>Спробуйте зробити запит пізніше.</p>
          <span>😕</span>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzasItems}
        </div>
      )}

      {Paggination}
    </>
  );
};
export default Home;
