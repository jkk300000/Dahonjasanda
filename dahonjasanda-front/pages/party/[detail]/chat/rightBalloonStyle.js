const rightBalloonStyle = {
  position: 'relative',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  marginBottom: '16px',
};

const rightBalloonBeforeStyle = {
  content: '',
  position: 'absolute',
  bottom: 'calc(-0.75em - 1px)',
  left: '50%',
  transform: 'translateX(-50%)',
  border: '8px solid transparent',
  borderTopColor: '#ffffff',
};

const RightBalloon = ({ children }) => {
  return (
    <div style={rightBalloonStyle}>
      {children}
      <div style={rightBalloonBeforeStyle}></div>
    </div>
  );
};

export default RightBalloon;