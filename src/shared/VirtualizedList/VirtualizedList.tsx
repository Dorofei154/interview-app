import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VirtualizedListProps } from "./VirtualizedListProps.interface";
import { EVENT_NAMES } from "../../constants/eventNames";
import styles from "./VirtualizedList.module.css";
import { getRouteCurrencyDetails } from "../../providers/AppRouter/router";
import { getRateRelatedToCurrency } from "../../utils";

const VirtualizedList = <T extends Record<string, { rate: number }>>({
  items,
  itemHeight,
}: VirtualizedListProps<T>): React.ReactElement => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const bufferSize = 4;
  const windowHeight = window.innerHeight;
  const totalHeight = items.length * itemHeight;

  let lastScrollPosition = 0;
  const scrollThreshold = windowHeight / 3;

  const calculateVisibleIndices = () => {
    const scrollTop = window.scrollY;
    const visibleStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
    const visibleEndIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + windowHeight) / itemHeight)
    );

    const startBufferIndex = Math.max(0, visibleStartIndex - bufferSize);
    const endBufferIndex = Math.min(
      items.length - 1,
      visibleEndIndex + bufferSize
    );
    setStartIndex(startBufferIndex);
    setEndIndex(endBufferIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (Math.abs(scrollTop - lastScrollPosition) >= scrollThreshold) {
        lastScrollPosition = scrollTop;
        calculateVisibleIndices();
      }
    };

    window.addEventListener(EVENT_NAMES.SCROLL, handleScroll);
    calculateVisibleIndices();

    return () => {
      window.removeEventListener(EVENT_NAMES.SCROLL, handleScroll);
    };
  }, [items, itemHeight, windowHeight]);

  return (
    <div className={styles.container} style={{ height: totalHeight }}>
      {items.slice(startIndex, endIndex + 1).map(([key, value], index) => (
        <Link
          key={key}
          to={getRouteCurrencyDetails(key)}
          className={styles.link}
        >
          <div
            className={styles.item}
            style={{
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
            }}
          >
            <span className={styles.title}>{key.toUpperCase()}</span>
            <div className={styles.details}>
              <p className={styles.rate}>{getRateRelatedToCurrency(value)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default memo(VirtualizedList);
