### Currency Info Application

Welcome to the **Currency Info Application** – a performant and feature-rich web application designed to provide users with real-time currency information. Explore the live demo here:  
👉 [Currency Info Application](https://willowy-sprite-825b3f.netlify.app)

---

### Features

1. **Real-Time Data Updates**:
   - Utilized **polling** to fetch the latest currency data at regular intervals.

2. **Performance Optimizations**:
   - Applied typical React optimizations:
     - **`React.memo`**: To prevent unnecessary re-renders of components.
     - **`useMemo`** and **`useCallback`**: For memoization of expensive computations and stable functions.
     - **`React.Suspense`** and **lazy loading**: For dynamic component loading, reducing initial bundle size.

3. **Virtualized List**:
   - Implemented virtualized rendering for long lists, ensuring smooth scrolling and reduced DOM size, even with large datasets.

4. **Web Workers**:
   - Offloaded heavy computations like sorting and filtering to a **Web Worker** to keep the UI responsive and improve overall user experience.

5. **Error Boundaries**:
   - Enhanced application resilience by handling runtime errors gracefully, ensuring the rest of the app remains functional.

---

### Technologies Used

- **React**: Frontend framework for building the UI.
- **Web Workers**: For performing resource-intensive tasks in the background.
- **React Virtualized**: For efficient rendering of long lists.
- **React Error Boundaries**: To catch and recover from errors.
- **React Suspense**: For lazy loading components and improving perceived performance.
- **React.memo / useMemo / useCallback**: For optimizing rendering and computation.

---

Feel free to explore and experience the application yourself:  
👉 [Currency Info Application](https://willowy-sprite-825b3f.netlify.app)
