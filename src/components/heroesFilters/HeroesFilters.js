import { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from 'react-redux';
import { filteredHeroes } from '../../actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const [btnFilters, setBtnFilters] = useState({});
    const [filter, setFilter] = useState('all');
    const [filtered, setFiltered] = useState([]);
    const [currenntHeroes, setCurrentHeroes] = useState([]);

    const {request} = useHttp();
    const dispatch = useDispatch();

    const {heroes} = useSelector(state => state);

    useEffect(() => {
        request("http://localhost:3001/filters")
        .then(data => setBtnFilters(data))
    }, [])

    useEffect(() => {
        setCurrentHeroes(heroes);
    },[heroes])

    const filterHero = useCallback((filter) => {
        if (filter === 'all') {
            setFiltered(heroes);
        } else {
            console.log(currenntHeroes);
            setFiltered(currenntHeroes.filter(item => item.element === filter));
            dispatch(filteredHeroes(filtered));
        }
    }, [currenntHeroes]);


    const onFilter = (filter) => {
        setFilter(filter);
        filterHero(filter);
    }

    const renderFilter = (arr) => {
        if (Object.keys(btnFilters).length > 0) {
            return arr.map(({name, label, className}, i) => <button key={i} 
                                                                className={className} 
                                                                onClick={() => onFilter(name)}>
                                                                    {label}
                                                        </button>)
        }
    }

    const elements = renderFilter(btnFilters);
console.log(heroes);
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;