import React from "react";
import Style from './Search.module.scss'
import Close from '../../assets/img/close.svg'
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 500), []
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  React.useEffect(() => {
    return () => {
      dispatch(setSearchValue(''))
    }
  }, [])

  return (
    <div className={Style.root}>
      <input ref={inputRef} value={value} onChange={onChangeInput} className={Style.input} placeholder="пошук піцци" />
      <svg width="24" height="24" viewBox="0 0 24 24" className={Style.icon}>
        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
        </path>
      </svg>
      {value && <img onClick={onClickClear} src={Close} className={Style.closeIcon} alt="close" />}

    </div>
  )
}

export default Search