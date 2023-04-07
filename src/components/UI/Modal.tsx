import "./Modal.css";

interface setups {
  message: string;
}

const Modal = (props: setups) => {
  return (
    <div className="box">
      <p className="message">{props.message}</p>
    </div>
  );
};
export default Modal;
