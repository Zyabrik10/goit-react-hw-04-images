import PropsType from 'props-type';

export const Button = ({ increasePage }) => {
  const addMoreHandler = () => {
    increasePage();
  };

  return (
    <button className="Button" onClick={addMoreHandler}>
      Load More
    </button>
  );
};

Button.propsType = {
  addImage: PropsType.func,
};
