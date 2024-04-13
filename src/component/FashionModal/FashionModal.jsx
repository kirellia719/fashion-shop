import "./FashionModal.scss";

import { useState } from "react";
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
} from "rsuite";

import { useDispatch } from "react-redux";

import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

import api from "../../service/api";
import { AddFasionAction } from "../../redux/FashionReducer";

function toThousands(value) {
  return (
    (value
      ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
      : value) + " VNĐ"
  );
}

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
  category: null,
  name: "",
  color: "",
  date: null,
  price: null,
  image: null,
};

const warning = (value) => (
  <Message type="warning">
    Thiếu <strong>{value}</strong>
  </Message>
);
const FashionModal = ({ onClose, open, categoryList, setFashions }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState(defaultForm);
  const toaster = useToaster();

  const handleChange = (name, value) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!loading) {
        const { category, name, color, date, price, image } = formValue;
        if (!category) {
          toaster.push(warning("Danh mục"), {
            placement: "topCenter",
            duration: 2000,
          });
        } else if (!name) {
          toaster.push(warning("Tên"), {
            placement: "topCenter",
            duration: 2000,
          });
        } else {
          const formRequest = new FormData();
          for (let key in formValue) {
            if (!formValue[key]) {
              setLoading(false);

              return;
            }
            formRequest.append(key, formValue[key]);
          }

          const { data } = await api.post("/fashion", formRequest);
          dispatch(AddFasionAction(data));
          onClose();
          setFormValue(defaultForm);
          toaster.push(
            <Message showIcon type="success">
              Đã thêm
            </Message>,
            { duration: 2000 }
          );
        }
      }
    } catch (error) {}
    setLoading(false);
  };
  const data = categoryList.map((c) => ({ label: c, value: c }));

  return (
    <Modal
      size="calc(100% - 2rem)"
      open={open}
      onClose={onClose}
      className={loading ? "no-events" : ""}
    >
      <Modal.Header>
        <Modal.Title>Trang phục mới</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "unset" }}>
        <ControlRow
          label="Danh mục"
          control={
            <InputPicker
              creatable
              style={{ width: 150 }}
              placeholder="Chọn"
              onChange={(value) => handleChange("category", value)}
              value={formValue.category}
              data={data}
              onCreate={(value) => {
                categoryList.push(value);
              }}
            />
          }
        />
        <ControlRow
          label="Tên"
          control={
            <Input
              style={{ width: 150 }}
              placeholder="..."
              onChange={(value) => handleChange("name", value)}
              value={formValue.name}
            />
          }
        />
        <ControlRow
          label="Màu"
          control={
            <Input
              style={{ width: 150 }}
              placeholder="..."
              onChange={(value) => handleChange("color", value)}
              value={formValue.color}
            />
          }
        />
        <ControlRow
          label="Thời điểm mua"
          control={
            <DatePicker
              style={{ width: 150 }}
              oneTap
              format="MM-yyyy"
              placement="auto"
              placeholder="Tháng / Năm"
              onChange={(value) => handleChange("date", value)}
              value={formValue.date}
            />
          }
        />
        <ControlRow
          label="Giá tiền"
          control={
            <InputNumber
              formatter={toThousands}
              placeholder="VNĐ"
              min={0}
              step={1000}
              style={{ width: 150 }}
              onChange={(value) => handleChange("price", value)}
              value={formValue.price}
            />
          }
        />
        <ControlRow
          label="Hình Ảnh"
          control={
            <Uploader
              fileListVisible={false}
              listType="picture-text"
              onUpload={(file) => {
                handleChange("image", file.blobFile);
              }}
              action=""
            >
              <button>
                {formValue.image ? (
                  <img
                    src={URL.createObjectURL(formValue.image)}
                    width="100%"
                    height="100%"
                    style={{ borderRadius: 10 }}
                  />
                ) : (
                  <CameraRetroIcon style={{ fontSize: "2rem" }} />
                )}
              </button>
            </Uploader>
          }
        />
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

export default FashionModal;
