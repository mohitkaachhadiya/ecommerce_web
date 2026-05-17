import React from "react";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { PRODUCT_COLORS } from "../../constants/appConfig";

const ProductFilterSidebar = ({
  isOpen,
  selectedColors,
  minprice,
  maxprice,
  onClose,
  onColorChange,
  onMinPriceChange,
  onMaxPriceChange,
  onApply,
}) => {
  return (
    <div className={`sidebar ${isOpen ? "show" : ""}`}>
      <div className="sidebar-content">
        <h2>Filter Options</h2>
        <ClearSharpIcon onClick={onClose} />
        <div>
          <h4>Price Range ($)</h4>
          <input
            type="number"
            value={minprice ?? ""}
            placeholder="Min"
            onChange={(e) => onMinPriceChange(e.target.value)}
            style={{ width: "80px", marginRight: "10px" }}
          />
          <input
            type="number"
            value={maxprice ?? ""}
            placeholder="Max"
            onChange={(e) => onMaxPriceChange(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>
        <div>
          <h4>Colors</h4>
          {PRODUCT_COLORS.map((color) => (
            <label key={color} style={{ display: "block", cursor: "pointer" }}>
              <input
                checked={selectedColors.includes(color)}
                onChange={onColorChange}
                type="checkbox"
                value={color}
              />{" "}
              {color === "mix" ? "Multi-color" : color}
            </label>
          ))}
        </div>
        <button
          style={{ marginTop: "20px", padding: "8px 12px", cursor: "pointer" }}
          onClick={onApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilterSidebar;
