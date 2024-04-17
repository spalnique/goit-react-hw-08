import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter } from '../../redux/selectors';
import { changeFilter } from '../../redux/filtersSlice';

import css from '../SearchBox/SearchBox.module.css';

const SearchBox = () => {
  const filterValue = useSelector(selectNameFilter);

  const dispatch = useDispatch();

  const handleChange = (e) => dispatch(changeFilter(e.target.value));

  return (
    <div className={css.searchContainer}>
      <p className={css.searchTitle}>Find contacts by name:</p>
      <input
        className={css.searchInput}
        type="text"
        value={filterValue}
        onChange={handleChange}></input>
    </div>
  );
};
export default SearchBox;
