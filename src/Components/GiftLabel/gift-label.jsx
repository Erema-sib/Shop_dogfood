import z from "./index.module.css";
import { ReactComponent as GiftIcon } from "./gift.svg";

function GiftLabel({ title, text }) {
  return (
    <div className={z.giftLabel}>
      <GiftIcon className={z.giftIcon} />
      <div className={z.giftTitle}>{title}</div>
      <div className={z.giftText}>{text}</div>
    </div>
  );
}

export default GiftLabel;
