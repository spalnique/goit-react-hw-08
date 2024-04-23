import { useDispatch, useSelector } from 'react-redux';

import { selectFiltersName } from '../../redux/filter/slice';
import { changeFilter } from '../../redux/filter/slice';

import css from '../SearchBox/SearchBox.module.css';

const SearchBox = () => {
  const filterValue = useSelector(selectFiltersName);

  const dispatch = useDispatch();

  const handleChange = (e) => dispatch(changeFilter(e.target.value));

  return (
    <div className={css.searchContainer}>
      <p className={css.searchTitle}>Find contact:</p>
      <input
        className={css.searchInput}
        type="text"
        value={filterValue}
        onChange={handleChange}></input>
    </div>
  );
};
export default SearchBox;
