import css from './Button.module.css';

const Button = ({ styles, children, onClick, text }) => {
  return (
    <button className={[css.buttonSearch, styles].join(' ')} 
      type='button' 
      onClick={onClick}
    >
      {children}
      {text}
    </button>
  );
}

export default Button;