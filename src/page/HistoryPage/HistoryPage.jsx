import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HistoryPage.scss";

import { useEffect, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "rsuite";
import { faShirt } from "@fortawesome/free-solid-svg-icons/faShirt";
import HistoryModal from "./HistoryModal/HistoryModal";
import { useSelector } from "react-redux";
import moment from "moment";

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

  const histories = useSelector((state) => state.Histories);
  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="history-page">
      <div className="histories-list">
        {histories.map((h, index) => (
          <div className="history-item" key={index}>
            <div className="history-header">
              <div className="date-title">
                {moment(h.date).format("DD/MM/yyyy")}
              </div>
              <div className="setting">
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </div>
            <div className="clothes-list">
              {h.clothes.map((c, index) => (
                <ClothesItem key={h.date + c._id} image={c.image} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="add-btn" onClick={handleOpen}>
        <FontAwesomeIcon icon={faShirt} />
      </div>

      <HistoryModal open={open} onClose={handleClose}></HistoryModal>
    </div>
  );
};

export default HistoryPage;
