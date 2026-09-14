export default function Content(props) {
  return (
    <p>
      {props.parts.name}: {props.parts.exercises}
    </p>
  );
}
