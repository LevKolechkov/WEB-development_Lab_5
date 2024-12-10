import copyImage from "../../assets/images/share/copy.svg";
import vkImage from "../../assets/images/share/vk.svg";
import tgImage from "../../assets/images/share/telegram.svg";
import waImage from "../../assets/images/share/whatsapp.svg";
import faImage from "../../assets/images/share/facebook.svg";

import "./Share.scss";

interface ShareProps {
  show: boolean;
  onCancel: () => void;
}

const images = [copyImage, vkImage, tgImage, waImage, faImage];

const Share: React.FC<ShareProps> = ({ show, onCancel }) => {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="share">
        {images.map((image, index) => (
          <button key={index}>
            <img src={image} alt="Share option" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Share;
