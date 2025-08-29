import React from "react";
//Takes a message string to display.
function Toast({ message }) {
  return (
    <div style={styles.toast}>
      {message}
    </div>
  );
}

const styles = {
  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#4BB543",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 999 //Ensures the toast is above other elements.
  }
};

export default Toast;
