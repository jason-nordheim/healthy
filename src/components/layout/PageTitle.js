export const PageTitle = ({ text, addOnClasses = [] }) => {
  let classes = ["jumbotron"];
  if (addOnClasses?.length > 1) {
    classes = [...classes, ...addOnClasses];
  }
  return (
    <div className={classes.join(" ")}>
      <h1 className="display-2 mt-3">{text}</h1>
      <hr className="my-4" />
    </div>
  );
};
