const Button = ({ text, onClick, variant, backgroundColor, textColor, borderColor }) => {
  const buttonStyles = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    color: textColor || '#000000',
    cursor: 'pointer',
    border: `1px solid ${borderColor || '#000000'}`,
    backgroundColor: backgroundColor || (variant === 'outline' ? 'transparent' : '#ffffff'),
  };

  if (variant === 'outline') {
    buttonStyles.border = `2px solid ${borderColor || '#ffffff'}`;
  }

  return (
    <button
      type="button"
      style={buttonStyles}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;


