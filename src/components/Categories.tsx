import { type } from "@testing-library/user-event/dist/type";
import React from "react"


type CategoriesProps = {
    value: number;
    onChangeCategory: (id: number) => void;
}
const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {

    const categories = [
        'Всі',
        'М\'ясні',
        'Вегетаріанські',
        'Гриль',
        'Гострі',
        'Закриті'
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((name, i) => {
                        return <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>{name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Categories