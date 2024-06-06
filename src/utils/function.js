export const toThousands = (value) => {
  return (
    (value
      ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
      : value) + " VNĐ"
  );
};
