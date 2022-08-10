export const NodeBox = (positionRef, visible) => {
  return {
    position: 'absolute',
    top: positionRef?.y + 10,
    left: positionRef?.x,
    display: visible ? 'block' : 'none',
  };
};