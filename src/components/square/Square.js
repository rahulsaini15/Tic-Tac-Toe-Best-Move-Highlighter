import styles from "./square.module.css";
const Square = (props) => {
  const style = {
    fontWeight: props.winner || props.lastMove ? "bold" : "normal",
    color: props.hintMove
      ? props.hintMoveStatus === "winning"
        ? "green"
        : props.hintMoveStatus === "draw"
        ? "blue"
        : "red"
      : "black",
  };
  return (
    <button className={styles.square} onClick={props.onClick} style={style}>
      {props.value ? props.value : props.hintMove ? "*" : null}
    </button>
  );
};

export default Square;
