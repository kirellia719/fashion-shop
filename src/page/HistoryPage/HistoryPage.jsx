import "./HistoryPage.scss";

import moment from "moment";
import api from "api";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { faShirt, faHeart } from "@fortawesome/free-solid-svg-icons";

import { Button, Message, Modal, useToaster } from "rsuite";
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";

import HistoryModal from "./HistoryModal/HistoryModal";
import HistoryEdit from "./HistoryEdit/HistoryEdit";

import { useDispatch, useSelector } from "react-redux";
import { DeleteHistoryAction } from "../../redux/HistoryReducer";

const ClothesItem = ({
  image = "https://i.pinimg.com/564x/43/68/be/4368be35f084ae89a75475c5ec0d7feb.jpg",
  liked = false,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="clothes-item">
      <img onClick={handleOpen} src={image} alt="" />
      {liked && (
        <div className="like-btn">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      )}

      <Modal onClose={handleClose} open={open} size="min(100%, 350px)">
        <Modal.Header></Modal.Header>
        <img src={image} alt="" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

const HistoryItem = (h) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [remove, setRemove] = useState(false);
  const openRemove = () => setRemove(true);
  const closeRemove = () => setRemove(false);

  const toaster = useToaster();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const { data } = await api.delete(`/history/${h._id}`);
      toaster.push(
        <Message showIcon type="success">
          Đã xóa
        </Message>,
        {
          duration: 1500,
        }
      );
      dispatch(DeleteHistoryAction(h._id));
    } catch (error) {
      console.log(error);
    }
    closeRemove();
  };

  return (
    <div className="history-item">
      <div className="history-header">
        <div className="date-title" title="Chỉnh sửa" onClick={handleOpen}>
          <ArrowRightLineIcon />
          <span>{moment(h?.date).format("DD/MM/yyyy")}</span>
        </div>
        <div className="setting">
          {/* <FontAwesomeIcon icon={faPencil} onClick={handleOpen} /> */}
          <FontAwesomeIcon
            icon={faSquareMinus}
            onClick={openRemove}
            className="remove-history"
          />
          <Modal open={remove} onClose={closeRemove}>
            <Modal.Body>
              Xác nhận xóa lịch sử ngày{" "}
              <b>{moment(h?.date).format("DD/MM/yyyy")}</b>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={closeRemove}>Hủy</Button>
              <Button onClick={handleDelete} appearance="primary">
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {open && <HistoryEdit onClose={handleClose} open={open} data={h} />}
      </div>
      <div className="clothes-list">
        {h.clothes.map((c) => (
          <ClothesItem key={h.date + c._id} image={c.image} liked={c.liked} />
        ))}
      </div>
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
    <div className="history-page custom-scrollbar">
      <div className="histories-list">
        {histories.map((h, index) => (
          <HistoryItem key={index} {...h} />
        ))}
      </div>
      <div className="add-btn" onClick={handleOpen}>
        <FontAwesomeIcon icon={faShirt} />
      </div>

      {open && <HistoryModal open={open} onClose={handleClose}></HistoryModal>}
    </div>
  );
};

export default HistoryPage;
