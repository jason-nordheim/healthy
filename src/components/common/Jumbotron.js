export const Jumbotron = ({ text, addOnClasses = [] }) => {
  const classes = ["jumbotron"];
  if (addOnClasses?.length > 1) {
    classes = [...classes, ...addOnClasses];
  }
  return (
    <div className={classes.join(" ")}>
      <h1>{text}</h1>
    </div>
  );
};
