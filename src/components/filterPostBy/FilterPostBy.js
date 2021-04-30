import React from 'react'
import "./FilterPostBy.css"

const FilterPostBy = () => {
    return (
        <div className="filter-box">
            <h6>Filter post by :</h6>
            <label className="selectbox">
                <select name="" id="">
                    <option value="">Popular</option>
                    <option value="">Newest</option>
                    <option value="">Followed</option>
                </select>
                <i className="fas fa-chevron-down"></i>
            </label>
        </div>
    )
}

export default FilterPostBy
