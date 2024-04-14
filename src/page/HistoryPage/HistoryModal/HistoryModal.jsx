import "./HistoryModal.scss";

import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Modal,
  DatePicker,
  Uploader,
  FlexboxGrid,
  InputPicker,
  InputNumber,
  Loader,
  useToaster,
  Message,
  TagPicker,
} from "rsuite";

import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "../../../component/ImagePicker/ImagePicker";

const ControlRow = ({ label, control, ...rest }) => (
  <FlexboxGrid {...rest} style={{ marginBottom: 10 }} align="middle">
    <FlexboxGrid.Item colspan={10}>{label}: </FlexboxGrid.Item>
    <FlexboxGrid.Item
      colspan={14}
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      {control}
    </FlexboxGrid.Item>
  </FlexboxGrid>
);

const defaultForm = {
  date: new Date(),
  clothes: [],
};

const HistoryModal = ({ onClose, open }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState(defaultForm);
  const fashions = useSelector((state) => state.Fashions);
  const toaster = useToaster();

  const selectClothes = (v) =>
    setFormValue((prev) => ({ ...prev, clothes: v }));

  const changeDate = (v) => setFormValue((prev) => ({ ...prev, date: v }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!loading) {
        const { data } = await api.post("/history", formValue);
        console.log(data);
      }
    } catch (error) {}
    setLoading(false);
  };

  const fashionsOption = fashions.map((f) => ({
    image: f.image,
    value: f._id,
    category: f.category,
  }));

  return (
    <Modal
      size="calc(100% - 2rem)"
      open={open}
      onClose={onClose}
      className={loading ? "no-events" : ""}
    >
      <Modal.Header>
        <Modal.Title>Lịch sử mặc</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "unset", overflow: "unset" }}>
        <ControlRow
          label="Ngày"
          control={
            <DatePicker
              oneTap
              placement="bottomEnd"
              format="dd/MM/yyyy"
              value={formValue.date}
              onChange={changeDate}
            />
          }
        />
        <FlexboxGrid style={{ alignItems: "center" }}>
          <FlexboxGrid.Item colspan={18} style={{ marginBottom: 10 }}>
            Trang phục:
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ textAlign: "end" }}>
            <Button appearance="link" onClick={() => selectClothes([])}>
              Clear
            </Button>
          </FlexboxGrid.Item>
          <br />
          <FlexboxGrid.Item colspan={24}>
            <ImagePicker
              data={fashionsOption}
              onChange={selectClothes}
              value={formValue.clothes}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Modal.Body>
      <Modal.Footer>
        {loading ? (
          <Loader />
        ) : (
          <Button onClick={handleSubmit} appearance="primary">
            Thêm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryModal;
