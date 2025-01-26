import { useCallback, useState } from "react";
import { BottomToast, Button } from "../../shared";
import styles from "./CurrencyInfoCard.module.css";
import { CurrencyInfoCardProps } from "./CurrencyInfoCardProps.interface";
import { getValueStylesAndIcon } from "../../utils";

const CurrencyInfoCard: React.FC<CurrencyInfoCardProps> = ({ data }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <div className={styles.card}>
      {data.map((field, index) => {
        const isLast = index === data.length - 1;
        const { className, icon } = getValueStylesAndIcon(
          field.value,
          isLast,
          styles
        );

        return (
          <div className={styles.field} key={index}>
            <span className={styles.label}>{field.label}:</span>
            <div className={styles.valueContainer}>
              <span className={className}>
                {icon && <span className={styles.icon}>{icon}</span>}
                {field.value}
              </span>
              <div>
                <Button
                  onClick={() => {
                    handleCopy(field.value.toString());
                  }}
                >
                  Copy
                </Button>
                {isModalVisible && (
                  <BottomToast
                    message="Text copied to clipboard"
                    onClose={closeModal}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyInfoCard;
