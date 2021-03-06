import React, {useState, Fragment, useEffect} from 'react'
import "./selectCategory.css"
import { useDispatch, useSelector } from "react-redux"
import {  useHistory  } from 'react-router-dom'
import { allCategories } from "../../constants/categories"
import { setTopicCategory } from "../../store/actions/topicActions"
import useKeyboardEvent from "../../customHook/KeyPress"
import { getAllTopics, resetTopicCategory } from "../../store/actions/topicActions"

const SelectCategory = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    useKeyboardEvent('Escape', () => {
        setOpen(false);
    })
    
    const [openSidebar, setOpen] = useState(false);
    const [mainSelected, setMainSelected] = useState(true);
    const [mainMenu, setMainMenu] = useState(null);
    const [showAllCategory, setShowAllCategory] = useState(false);

    useEffect(() => {
        setMainSelected(true)
    }, [openSidebar])

    function changeMenu(item){
        setMainMenu(item);
        setMainSelected(false);
    }  

    function selectCategory(item){
        dispatch(setTopicCategory({...item, type: "item"}));
        setOpen(false);
        setMainSelected(true);
        dispatch(getAllTopics(null));
    }

    function selectTopLevelCategory(item){
        history.push(`/home/${item.value}?label=${item.label}`);
        dispatch(setTopicCategory(item));
        dispatch(getAllTopics(null));
    }

    function gotoMain(){
        setMainMenu(null);
        setMainSelected(true);
    }

    function resetCategories(){
        dispatch(resetTopicCategory())
        dispatch(getAllTopics(null));
        setOpen(false);
        setMainSelected(true);
    }

    if(!userInfo){
        return null
    }

    return (
        <div className="select-category">
            <div className="main-category-list">
                <button onClick={() => selectTopLevelCategory({
                    value: "elektronik",
                    label: "Elektronik",
                    type: "main"
                })} className="category-list-btn">Elektronik</button>
                <button onClick={() => selectTopLevelCategory({
                    value: "kadin-moda",
                    label: "Kad??n Moda",
                    type: "main"
                })} className="category-list-btn">Kad??n Moda</button>
                <button onClick={() => selectTopLevelCategory({
                    value: "kitap",
                    label: "Kitap",
                    type: "main"
                })} className="category-list-btn" id="book-link">Kitap</button>
                <button onClick={() => selectTopLevelCategory({
                    value: "pc",
                    label: "Bilgisayar",
                    type: "main"
                })} className="category-list-btn">Bilgisayar</button>
                <button onClick={() => selectTopLevelCategory({
                    value: "ev-ve-yasam",
                    label: "Ev ve Ya??am",
                    type: "main"
                })} className="category-list-btn" id="personal-care-link">Ev ve Ya??am</button>
                <button onClick={() => selectTopLevelCategory({
                    value: "telefon",
                    label: "Telefon",
                    type: "main"
                })} className="category-list-btn">Telefon</button>
            </div>
            <button onClick={() => setOpen(true)} className="all-category-btn"><i className="fas fa-bars"></i> T??m??</button>
            <div className={`category-sidebar ${openSidebar && "show-category-sidebar"}`} > 
                <div className="category-sidebar-top">
                    <h4>
                        <i className="fas fa-user-circle">
                        </i>Merhaba, {userInfo.name}
                    </h4>
                    <i onClick={() => setOpen(false)} className="fas fa-times close-category-btn"></i>
                </div>
                <div className="category-sidebar-body">
                    <div className={`main-category-sidebar ${mainSelected && "show-main-category-sidebar"}`}>
                        <div className="category-sidebar-item">
                            <h4>??ne ????kanlar</h4>
                            <p>En Pop??ler Konular</p>
                            <p onClick={resetCategories}>En Yeniler</p>
                        </div>
                        <div className="category-sidebar-item">
                            <h4>Kategoriye G??re Se??</h4>
                            {
                                allCategories.slice(0, showAllCategory ? allCategories.length : 4)
                                .map(item => (
                                    <p key={item.value} onClick={() => changeMenu(item)}>{item.label} <i className="fas fa-chevron-right"></i></p>
                                ))
                            }
                            {
                                showAllCategory ?
                                <p onClick={() => setShowAllCategory(false)}>
                                    Daha Az G??r??nt??le <i className="fas fa-chevron-up"></i>
                                </p>
                                :
                                <p onClick={() => setShowAllCategory(true)}>
                                    T??m??n?? G??r??nt??le <i className="fas fa-chevron-down"></i>
                                </p>
                            }
                        </div>
                        <div className="category-sidebar-item">
                            <h4>Yard??m Ve Ayarlar</h4>
                            <p>Hesab??m</p>
                            <p>M????teri Hizmetleri</p>
                            {/* <p>Giri?? Yap</p> */}
                        </div>
                    </div>
                    <div className={`sub-category-sidebar ${!mainSelected && "show-sub-category-sidebar"}`}>
                        <div onClick={gotoMain} className="sub-category-sidebar-top">
                            <h5><i className="fas fa-arrow-left"></i> Ana Menu</h5>
                        </div>
                        {
                            mainMenu && mainMenu.categories && mainMenu.categories.map(item => (
                                <div key={item.value} className="category-sidebar-item">
                                    <h4>{item.label}</h4>
                                    {
                                        item.items.map((product, index) => (
                                            <p key={index} onClick={() => selectCategory(product)}>{product.label}</p>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={`select-category-bg ${openSidebar && "show-category-bg"}`} onClick={() => setOpen(false)} />
        </div>
    )
}

export default SelectCategory
