import "./FashionPage.scss";

import { useState } from "react";
import api from "api";

import { useSelector, useDispatch } from "react-redux";
import { UpdateFashionAction } from "~/redux/FashionReducer";

import SearchIcon from "@rsuite/icons/Search";
import { Input, InputGroup, Tag } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

import FashionModal from "./FashionModal/FashionModal";
import FashionEdit from "./FashionEdit/FashionEdit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartBold } from "@fortawesome/free-solid-svg-icons";

const getDistinctCategory = (arr) => {
  const valueAppearance = arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  return valueAppearance;
};

const FashionItem = (props) => {
  const dispatch = useDispatch();
  const fashions = useSelector((state) => state.Fashions);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLike = async () => {
    try {
      const { data } = await api.put(`/fashion/like/${_id}`, {});
      dispatch(UpdateFashionAction(data));
    } catch (error) {}
  };

  const { _id, name, image, liked, category, price, color, date, size } = props;

  const categories = getDistinctCategory(fashions.map((f) => f.category));

  const CategoryList = Object.keys(categories);

  return (
    <div className="fashion-item">
      {_id && (
        <>
          <div className="image">
            <img src={image} alt="" onClick={handleOpen} />
            <div className="like-btn" onClick={handleLike}>
              <FontAwesomeIcon icon={liked ? faHeartBold : faHeart} />
            </div>
          </div>
          <div className="name">{name}</div>
          {open && (
            <FashionEdit
              open={open}
              onClose={handleClose}
              categoryList={CategoryList}
              fashion={{
                name,
                image,
                liked,
                category,
                price,
                color,
                date,
                size,
              }}
              _id={_id}
            />
          )}
        </>
      )}
    </div>
  );
};

const FashionPage = () => {
  const fashions = useSelector((state) => state.Fashions);
  const [type, setType] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const categories = getDistinctCategory(fashions.map((f) => f.category));

  const CategoryList = Object.keys(categories);

  const newFashions = fashions
    .filter((f) => !type || f.category === type)
    .filter(
      (f) =>
        !searchText || f.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="fashion-page">
      <div className="sum">Tổng số tiền mua đồ: 20.020.202 đồng</div>
      <div className="filter-container">
        <div className="filter-box custom-scrollbar">
          <div className="search-box item">
            <InputGroup>
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
              <Input
                placeholder="Search ..."
                value={searchText}
                onChange={(value) => setSearchText(value)}
              />
            </InputGroup>
          </div>

          <div className="category-box item">
            <Tag
              size="lg"
              className={!type ? "tag-active" : "tag"}
              onClick={() => setType(null)}
            >
              Tất cả (<code>{fashions.length}</code>)
            </Tag>
            {CategoryList.map((t) => (
              <Tag
                size="lg"
                className={type == t ? "tag-active" : "tag"}
                onClick={() => setType(t)}
                key={"category" + t}
              >
                {t} (<code>{categories[t]}</code>)
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="fashion-wr custom-scrollbar">
        <div className="fashion-container">
          {newFashions.map((f) => (
            <FashionItem key={f._id} {...f} />
          ))}
        </div>
      </div>

      <div className="add-btn" onClick={handleOpen}>
        <PlusIcon />
      </div>

      <FashionModal
        open={open}
        onClose={handleClose}
        categoryList={CategoryList}
      />
    </div>
  );
};

export default FashionPage;
