import React, {useState, Fragment} from 'react'
import "./selectCategory.css"
import { useDispatch, useSelector } from "react-redux"
import { allCategories } from "../../constants/categories"
import { setTopicCategory } from "../../store/actions/topicActions"
import useKeyboardEvent from "../../customHook/KeyPress"
import { getAllTopics, resetTopicCategory } from "../../store/actions/topicActions"

const SelectCategory = () => {
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

    function changeMenu(item){
        setMainMenu(item);
        setMainSelected(false);
    }

    function selectCategory(item){
        dispatch(setTopicCategory({...item, type: "item"}));
        setOpen(false);
        setMainSelected(true);
        dispatch(getAllTopics());
    }

    function selectTopLevelCategory(item){
        dispatch(setTopicCategory(item));
        dispatch(getAllTopics());
    }

    function gotoMain(){
        setMainMenu(null);
        setMainSelected(true);
    }

    function resetCategories(){
        dispatch(resetTopicCategory())
        dispatch(getAllTopics());
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
                <button onClick={() => console.log("clicked")} className="category-list-btn">Moda</button>
                <button onClick={() => console.log("clicked")} className="category-list-btn">Kitap</button>
                <button onClick={() => selectTopLevelCategory({
                    value: "pc",
                    label: "Bilgisayar",
                    type: "main"
                })} className="category-list-btn">Bilgisayar</button>
                <button onClick={() => selectTopLevelCategory({
                    value: "ev-ve-yasam",
                    label: "Ev ve Yaşam",
                    type: "main"
                })} className="category-list-btn">Ev ve Yaşam</button>
                <button onClick={() => console.log("clicked")} className="category-list-btn">Kişisel Bakım ve Kozmetik</button>
                <button onClick={() => console.log("clicked")} className="category-list-btn">En Çok Beğenilenler</button>
            </div>
            <button onClick={() => setOpen(true)} className="all-category-btn"><i className="fas fa-bars"></i> Tümü</button>
            <div className={`category-sidebar ${openSidebar && "show-category-sidebar"}`}>
                <div className="category-sidebar-top">
                    <h4>
                        <i className="fas fa-user-circle">
                        </i>Merhaba, Giriş Yapın
                    </h4>
                    <i onClick={() => setOpen(false)} className="fas fa-times close-category-btn"></i>
                </div>
                <div className="category-sidebar-body">
                    <div className={`main-category-sidebar ${mainSelected && "show-main-category-sidebar"}`}>
                        <div className="category-sidebar-item">
                            <h4>Öne Çıkanlar</h4>
                            <p>En Popüler Konular</p>
                            <p onClick={resetCategories}>En Yeniler</p>
                            <p>En Çok Beğenilenler</p>
                        </div>
                        <div className="category-sidebar-item">
                            <h4>Kategoriye Göre Seç</h4>
                            {
                                allCategories.slice(0, showAllCategory ? allCategories.length : 4)
                                .map(item => (
                                    <p onClick={() => changeMenu(item)}>{item.label} <i class="fas fa-chevron-right"></i></p>
                                ))
                            }
                            {
                                showAllCategory ?
                                <p onClick={() => setShowAllCategory(false)}>
                                    Daha Az Görüntüle <i class="fas fa-chevron-up"></i>
                                </p>
                                :
                                <p onClick={() => setShowAllCategory(true)}>
                                    Tümünü Görüntüle <i class="fas fa-chevron-down"></i>
                                </p>
                            }
                        </div>
                        <div className="category-sidebar-item">
                            <h4>Yardım Ve Ayarlar</h4>
                            <p>Hesabım</p>
                            <p>Müşteri Hizmetleri</p>
                            {/* <p>Giriş Yap</p> */}
                        </div>
                    </div>
                    <div className={`sub-category-sidebar ${!mainSelected && "show-sub-category-sidebar"}`}>
                        <div onClick={gotoMain} className="sub-category-sidebar-top">
                            <h5><i className="fas fa-arrow-left"></i> Ana Menu</h5>
                        </div>
                        {
                            mainMenu && mainMenu.categories && mainMenu.categories.map(item => (
                                <div className="category-sidebar-item">
                                    <h4>{item.label}</h4>
                                    {
                                        item.items.map(product => (
                                            <p onClick={() => selectCategory(product)}>{product.label}</p>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={`select-category-bg ${openSidebar && "show-category-bg"}`} />
        </div>
    )
}

export default SelectCategory
