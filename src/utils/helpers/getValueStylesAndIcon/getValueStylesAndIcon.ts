const getValueStylesAndIcon = (
  value: string | number,
  isLast: boolean,
  styles: CSSModuleClasses
) => {
  const numericValue = +value;
  if (!isLast || numericValue === 0)
    return { className: styles.value, icon: null };

  const className = `${styles.value} ${numericValue < 0 ? styles.negative : styles.positive}`;
  const icon = numericValue > 0 ? "▲" : "▼";

  return { className, icon };
};

export default getValueStylesAndIcon;
