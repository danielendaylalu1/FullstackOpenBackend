/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
