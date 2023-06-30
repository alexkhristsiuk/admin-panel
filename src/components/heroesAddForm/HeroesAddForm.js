import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { heroesAdd } from "../../actions";
import { v4 as uuidv4 } from 'uuid'

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [hero, setHero] = useState({id: '', name: '', description: '', element: ''});
    const [section, setSection] = useState({});

    const {heroes} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters")
        .then(data => setSection(data))
    }, [])

    const addHero = ( name, description, element) => {
        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        }
        const newArr = [...heroes, newHero];
        dispatch(heroesAdd(newArr));
        return newHero;
    }

    const handleValueChange = (e) => {
        setHero({...hero, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newHeroes = addHero(hero.name, hero.description, hero.element); 
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHeroes))
        
        setHero({name: '', description: '', element: ''});
    }

    const renderSection = (arr) => {
        if (Object.keys(section).length > 0) {
            return arr.map(({name, label}, i) =>  <option value={name} key={i}>{label}</option>)
        }}
    const elements = renderSection(section);


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={hero.name || ''}
                    onChange={handleValueChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={hero.description || ''}
                    onChange={handleValueChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={hero.element}
                    onChange={handleValueChange || 'Я владею элементом...'}>
                        {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;