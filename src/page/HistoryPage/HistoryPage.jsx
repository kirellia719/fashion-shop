import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HistoryPage.scss";

import { useEffect, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "rsuite";
import { faShirt } from "@fortawesome/free-solid-svg-icons/faShirt";
import HistoryModal from "./HistoryModal/HistoryModal";

const ClothesItem = ({
  image = "https://i.pinimg.com/564x/43/68/be/4368be35f084ae89a75475c5ec0d7feb.jpg",
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="clothes-item">
      <img onClick={handleOpen} src={image} alt="" />

      <Modal onClose={handleClose} open={open} size="min(100%, 350px)">
        <Modal.Header></Modal.Header>
        <img src={image} alt="" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

const HistoryPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="history-page">
      <div className="histories-list">
        <div className="history-item">
          <div className="history-header">
            <div className="date-title">29/12/2023</div>
            <div className="setting">
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          </div>
          <div className="clothes-list">
            <ClothesItem image="https://res.cloudinary.com/dnvpdjbx0/image/upload/v1713062093/fashion/dbjizj3x3zjmrcxdphu9.jpg" />
            <ClothesItem image="https://res.cloudinary.com/dnvpdjbx0/image/upload/v1713062162/fashion/pznyy2rlpmlmulme5jgq.jpg" />
            <ClothesItem />
            <ClothesItem image="https://res.cloudinary.com/dnvpdjbx0/image/upload/v1713062680/fashion/mqwqthxibr9ctce4ecwk.jpg" />
          </div>
        </div>

        <div className="history-item">
          <div className="history-header">
            <div className="date-title">27/12/2023</div>
            <div className="setting">
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          </div>
          <div className="clothes-list">
            <ClothesItem image="https://res.cloudinary.com/dnvpdjbx0/image/upload/v1713062093/fashion/dbjizj3x3zjmrcxdphu9.jpg" />
            <ClothesItem image="https://res.cloudinary.com/dnvpdjbx0/image/upload/v1713062162/fashion/pznyy2rlpmlmulme5jgq.jpg" />
            <ClothesItem image="https://res.cloudinary.com/dnvpdjbx0/image/upload/v1713062680/fashion/mqwqthxibr9ctce4ecwk.jpg" />
            <ClothesItem />
          </div>
        </div>
      </div>
      <div className="add-btn" onClick={handleOpen}>
        <FontAwesomeIcon icon={faShirt} />
      </div>

      <HistoryModal open={open} onClose={handleClose}></HistoryModal>
    </div>
  );
};

export default HistoryPage;
